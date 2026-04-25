<?php

namespace Tests\Feature\Api;

use App\Mail\ResetPasswordMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class AuthAndInvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_fetch_profile(): void
    {
        $registerResponse = $this->postJson('/api/auth/register', [
            'name' => 'ToolKeuangan User',
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $registerResponse
            ->assertCreated()
            ->assertJsonStructure([
                'token',
                'user' => ['id', 'name', 'email', 'plan', 'created_at'],
            ]);

        $token = $registerResponse->json('token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'user@example.com')
            ->assertJsonPath('user.plan', 'free');
    }

    public function test_user_can_create_and_list_invoices(): void
    {
        $registerResponse = $this->postJson('/api/auth/register', [
            'name' => 'Invoice User',
            'email' => 'invoice@example.com',
            'password' => 'password123',
        ]);

        $token = $registerResponse->json('token');

        $payload = [
            'client_name' => 'PT Maju Lancar',
            'invoice_number' => 'INV-20260424-1001',
            'tax_rate' => 11,
            'business_name' => 'ToolKeuangan Studio',
            'business_email' => 'billing@toolkeuangan.com',
            'business_phone' => '+62 812 3456 7890',
            'business_address' => 'Jakarta, Indonesia',
            'due_date' => '2026-05-08',
            'payment_terms' => 'Net 14 hari',
            'accent_color' => '#2563eb',
            'items' => [
                [
                    'name' => 'Jasa Konsultasi',
                    'qty' => 2,
                    'price' => 150000,
                ],
            ],
            'subtotal' => 300000,
            'total' => 333000,
            'logo_data_url' => null,
        ];

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/invoices', $payload)
            ->assertCreated()
            ->assertJsonPath('data.invoice_number', 'INV-20260424-1001')
            ->assertJsonPath('data.total', 333000);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/invoices')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.client_name', 'PT Maju Lancar');
    }

    public function test_login_is_rate_limited_after_five_attempts(): void
    {
        User::query()->create([
            'name' => 'Rate Limit User',
            'email' => 'limit@example.com',
            'password' => 'password123',
            'plan' => 'free',
        ]);

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->postJson('/api/auth/login', [
                'email' => 'limit@example.com',
                'password' => 'wrong-password',
            ])->assertStatus(422);
        }

        $this->postJson('/api/auth/login', [
            'email' => 'limit@example.com',
            'password' => 'wrong-password',
        ])
            ->assertStatus(429)
            ->assertJsonPath('message', 'Terlalu banyak percobaan login. Coba lagi dalam 1 menit.');
    }

    public function test_user_can_request_reset_and_update_password(): void
    {
        Mail::fake();

        User::query()->create([
            'name' => 'Reset User',
            'email' => 'reset@example.com',
            'password' => 'password123',
            'plan' => 'free',
        ]);

        $forgotResponse = $this->postJson('/api/auth/forgot-password', [
            'email' => 'reset@example.com',
        ]);

        $forgotResponse
            ->assertOk()
            ->assertJsonPath('message', 'Instruksi reset password sudah dikirim.');

        $token = $forgotResponse->json('reset_token');
        $resetUrl = $forgotResponse->json('reset_url');

        Mail::assertSent(ResetPasswordMail::class, function (ResetPasswordMail $mail) use ($token, $resetUrl) {
            return $mail->hasTo('reset@example.com')
                && $mail->resetToken === $token
                && $mail->resetUrl === $resetUrl;
        });

        $this->postJson('/api/auth/reset-password', [
            'email' => 'reset@example.com',
            'token' => $token,
            'password' => 'newpassword123',
        ])->assertOk()
            ->assertJsonPath('message', 'Password berhasil diperbarui. Silakan login.');

        $this->postJson('/api/auth/login', [
            'email' => 'reset@example.com',
            'password' => 'newpassword123',
        ])->assertOk();
    }
}
