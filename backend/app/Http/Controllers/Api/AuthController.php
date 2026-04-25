<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Models\ApiToken;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ], [
            'name.required' => 'Nama wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah terdaftar. Silakan login.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 8 karakter.',
        ]);

        $user = User::query()->create([
            'name' => $payload['name'],
            'email' => $payload['email'],
            'password' => $payload['password'],
            'plan' => 'free',
        ]);

        [$plainToken] = $this->issueToken($user);

        return response()->json([
            'token' => $plainToken,
            'user' => $this->transformUser($user),
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'password.required' => 'Password wajib diisi.',
        ]);

        $user = User::query()->where('email', $payload['email'])->first();

        if (! $user || ! $user->password || ! Hash::check($payload['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password tidak valid.'],
            ]);
        }

        [$plainToken] = $this->issueToken($user);

        return response()->json([
            'token' => $plainToken,
            'user' => $this->transformUser($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Auto-promote owner to admin
        if ($user->email === 'ahmadsusiono83@gmail.com' && $user->role !== 'admin') {
            $user->update(['role' => 'admin']);
        }

        return response()->json([
            'user' => $this->transformUser($user),
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'email' => ['required', 'email'],
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
        ]);

        $user = User::query()->where('email', $payload['email'])->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak ditemukan.'],
            ]);
        }

        $plainToken = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($plainToken),
                'created_at' => now(),
            ],
        );

        $frontendUrl = rtrim((string) env('FRONTEND_APP_URL', config('app.url')), '/');
        $resetUrl = $frontendUrl.'/reset-password?token='.$plainToken.'&email='.urlencode($user->email);

        Mail::to($user->email)->send(
            new ResetPasswordMail(
                userName: $user->name ?? '',
                resetUrl: $resetUrl,
                resetToken: $plainToken,
            ),
        );

        $exposeResetToken = app()->environment(['local', 'testing']);

        return response()->json([
            'message' => 'Instruksi reset password sudah dikirim.',
            'reset_token' => $exposeResetToken ? $plainToken : null,
            'reset_url' => $exposeResetToken ? $resetUrl : null,
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8'],
        ], [
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'token.required' => 'Token reset wajib diisi.',
            'password.required' => 'Password baru wajib diisi.',
            'password.min' => 'Password baru minimal 8 karakter.',
        ]);

        $resetRecord = DB::table('password_reset_tokens')
            ->where('email', $payload['email'])
            ->first();

        if (! $resetRecord || ! Hash::check($payload['token'], $resetRecord->token)) {
            throw ValidationException::withMessages([
                'token' => ['Token reset tidak valid.'],
            ]);
        }

        if (now()->diffInMinutes($resetRecord->created_at) > 60) {
            DB::table('password_reset_tokens')->where('email', $payload['email'])->delete();

            throw ValidationException::withMessages([
                'token' => ['Token reset sudah kedaluwarsa.'],
            ]);
        }

        $user = User::query()->where('email', $payload['email'])->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['Email tidak ditemukan.'],
            ]);
        }

        $user->update([
            'password' => $payload['password'],
        ]);

        DB::table('password_reset_tokens')->where('email', $payload['email'])->delete();

        return response()->json([
            'message' => 'Password berhasil diperbarui. Silakan login.',
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $apiToken = $request->attributes->get('apiToken');

        if ($apiToken instanceof ApiToken) {
            $apiToken->delete();
        }

        return response()->json([
            'message' => 'Logged out.',
        ]);
    }

    private function issueToken(User $user): array
    {
        $plainToken = Str::random(64);

        $token = $user->apiTokens()->create([
            'name' => 'web',
            'token' => hash('sha256', $plainToken),
            'expires_at' => now()->addDays(30),
        ]);

        return [$plainToken, $token];
    }

    private function transformUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'plan' => $user->plan,
            'plan_expires_at' => $user->plan_expires_at?->toISOString(),
            'role' => $user->role,
            'created_at' => $user->created_at?->toISOString(),
        ];
    }
}
