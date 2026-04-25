<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();

        if (! $bearerToken) {
            return new JsonResponse([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $hashedToken = hash('sha256', $bearerToken);

        $apiToken = ApiToken::query()
            ->with('user')
            ->where('token', $hashedToken)
            ->first();

        if (! $apiToken || ($apiToken->expires_at && $apiToken->expires_at->isPast())) {
            return new JsonResponse([
                'message' => 'Invalid or expired token.',
            ], 401);
        }

        $apiToken->forceFill([
            'last_used_at' => now(),
        ])->save();

        $request->setUserResolver(fn () => $apiToken->user);
        $request->attributes->set('apiToken', $apiToken);

        return $next($request);
    }
}
