<?php

namespace Tests\Feature\Web;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Mockery;
use Tests\TestCase;

class GoogleAuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        putenv('FRONTEND_APP_URL=http://localhost:5173');
        $_ENV['FRONTEND_APP_URL'] = 'http://localhost:5173';
        $_SERVER['FRONTEND_APP_URL'] = 'http://localhost:5173';
    }

    public function test_google_redirect_stores_next_path_and_redirects_to_google(): void
    {
        $provider = Mockery::mock();

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
        $provider->shouldReceive('scopes')->with(['openid', 'profile', 'email'])->andReturnSelf();
        $provider->shouldReceive('redirect')->andReturn(redirect('https://accounts.google.com/o/oauth2/auth'));

        $response = $this->get('/auth/google/redirect?next=%2Finvoice-generator');

        $response->assertRedirect('https://accounts.google.com/o/oauth2/auth');
        $this->assertSame('/invoice-generator', session('social_auth_next'));
    }

    public function test_google_callback_creates_user_and_redirects_back_to_frontend(): void
    {
        $socialUser = Mockery::mock(SocialiteUser::class);
        $socialUser->shouldReceive('getId')->andReturn('google-user-123');
        $socialUser->shouldReceive('getEmail')->andReturn('google@example.com');
        $socialUser->shouldReceive('getName')->andReturn('Google User');

        $provider = Mockery::mock();

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
        $provider->shouldReceive('user')->andReturn($socialUser);

        $response = $this->withSession([
            'social_auth_next' => '/invoice-generator',
        ])->get('/auth/google/callback');

        $response->assertRedirect();

        $location = $response->headers->get('Location');

        $this->assertStringStartsWith('http://localhost:5173/auth/callback?', $location);
        $this->assertStringContainsString('next=%2Finvoice-generator', $location);
        $this->assertStringContainsString('token=', $location);

        $this->assertDatabaseHas('users', [
            'email' => 'google@example.com',
            'google_id' => 'google-user-123',
        ]);

        $user = User::query()->where('email', 'google@example.com')->firstOrFail();
        $this->assertDatabaseCount('api_tokens', 1);
        $this->assertNotNull($user->email_verified_at);
    }
}
