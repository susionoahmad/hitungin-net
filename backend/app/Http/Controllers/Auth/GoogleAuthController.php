<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        $next = (string) $request->query('next', '/');
        $request->session()->put('social_auth_next', str_starts_with($next, '/') ? $next : '/');

        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable $exception) {
            report($exception);
            return $this->redirectToFrontend(error: 'Google login failed to process: ' . $exception->getMessage());
        }

        $email = $googleUser->getEmail();

        if (! $email) {
            return $this->redirectToFrontend(error: 'Google account did not return an email address.');
        }

        $user = User::query()
            ->where('google_id', $googleUser->getId())
            ->orWhere('email', $email)
            ->first();

        if ($user) {
            $user->update([
                'google_id' => $googleUser->getId(),
                'name' => $googleUser->getName() ?: $user->name,
                'email' => $email,
                'email_verified_at' => $user->email_verified_at ?? now(),
            ]);
        } else {
            $user = User::query()->create([
                'name' => $googleUser->getName() ?: 'Google User',
                'email' => $email,
                'google_id' => $googleUser->getId(),
                'plan' => 'free',
                'email_verified_at' => now(),
            ]);
        }

        $plainToken = Str::random(64);

        $user->apiTokens()->create([
            'name' => 'google-web',
            'token' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(30),
        ]);

        $next = $request->session()->pull('social_auth_next', '/');

        return $this->redirectToFrontend(
            token: $plainToken, 
            next: str_starts_with((string) $next, '/') ? (string) $next : '/'
        );
    }

    private function redirectToFrontend(?string $token = null, ?string $next = null, ?string $error = null): RedirectResponse
    {
        $frontendUrl = rtrim((string) env('FRONTEND_APP_URL', 'http://localhost:5173'), '/');
        
        $query = array_filter([
            'token' => $token,
            'next' => $next,
            'error' => $error,
        ], static fn ($value) => $value !== null && $value !== '');

        $url = $frontendUrl . '/auth/callback' . ($query ? '?' . http_build_query($query) : '');
        
        return redirect()->away($url);
    }
}
