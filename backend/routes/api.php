<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\UsageController;
use App\Http\Controllers\Api\AdminUserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::prefix('/auth')->group(function (): void {
    Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:auth-register');
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:auth-login');
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:auth-forgot');
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:auth-reset');

    Route::middleware('auth.token')->group(function (): void {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth.token')->group(function (): void {
    Route::get('/me', [ProfileController::class, 'show']);

    Route::get('/invoices', [InvoiceController::class, 'index']);
    Route::post('/invoices', [InvoiceController::class, 'store']);
    Route::put('/invoices/{invoice}', [InvoiceController::class, 'update']);

    Route::get('/usage-summary', [UsageController::class, 'summary']);
    Route::post('/usage-logs', [UsageController::class, 'store']);

    Route::get('/subscriptions/active', [SubscriptionController::class, 'active']);

    Route::prefix('/admin')->group(function (): void {
        Route::get('/users', [AdminUserController::class, 'index']);
        Route::put('/users/{user}/plan', [AdminUserController::class, 'updatePlan']);
    });
});
