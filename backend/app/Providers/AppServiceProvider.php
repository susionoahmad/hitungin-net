<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('auth-login', function (Request $request): Limit {
            $email = (string) $request->input('email', '');

            return Limit::perMinute(5)
                ->by(strtolower($email).'|'.$request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Terlalu banyak percobaan login. Coba lagi dalam 1 menit.',
                    ], 429);
                });
        });

        RateLimiter::for('auth-register', function (Request $request): Limit {
            $email = (string) $request->input('email', '');

            return Limit::perMinute(3)
                ->by(strtolower($email).'|'.$request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Terlalu banyak percobaan pendaftaran. Coba lagi dalam 1 menit.',
                    ], 429);
                });
        });

        RateLimiter::for('auth-forgot', function (Request $request): Limit {
            $email = (string) $request->input('email', '');

            return Limit::perMinute(3)
                ->by(strtolower($email).'|'.$request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Terlalu banyak permintaan reset password. Coba lagi dalam 1 menit.',
                    ], 429);
                });
        });

        RateLimiter::for('auth-reset', function (Request $request): Limit {
            $email = (string) $request->input('email', '');

            return Limit::perMinute(5)
                ->by(strtolower($email).'|'.$request->ip())
                ->response(function () {
                    return response()->json([
                        'message' => 'Terlalu banyak percobaan reset password. Coba lagi dalam 1 menit.',
                    ], 429);
                });
        });
    }
}
