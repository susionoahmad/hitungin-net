# ToolKeuangan Laravel API

Backend ini adalah target migrasi dari integrasi Supabase lama ke `Laravel + MySQL`.

## Stack

- Laravel 12
- MySQL
- Token auth sederhana berbasis tabel `api_tokens`
- Endpoint JSON untuk profile, invoice, usage, dan subscription

## Setup cepat

1. Copy `.env.example` menjadi `.env`
2. Isi koneksi MySQL
3. Isi `FRONTEND_URLS` dengan origin frontend yang boleh mengakses API
4. Isi `FRONTEND_APP_URL` dengan URL frontend untuk link reset password
5. Jalankan:

```bash
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

Contoh local:

```env
FRONTEND_URLS=http://localhost:5173,http://127.0.0.1:5173
FRONTEND_APP_URL=http://localhost:5173
```

## SMTP production

Saat production, gunakan `MAIL_MAILER=smtp` dan isi kredensial SMTP asli. Contoh lengkap tersedia di `backend/.env.production.example`.

Field utama:

- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_FROM_ADDRESS`
- `MAIL_FROM_NAME`

## Google login

Google login memakai Laravel Socialite.

Env yang perlu diisi:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`

Untuk local:

```env
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/auth/google/callback
```

Untuk production, arahkan ke domain backend API Anda.

## Tabel utama

- `users`
- `invoices`
- `usage_logs`
- `subscriptions`
- `api_tokens`

Semua ID utama memakai UUID agar lebih dekat dengan struktur data Supabase lama.

## Endpoint API

Public:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

Protected dengan `Authorization: Bearer <token>`:

- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/me`
- `GET /api/invoices`
- `POST /api/invoices`
- `PUT /api/invoices/{id}`
- `GET /api/usage-summary`
- `POST /api/usage-logs`
- `GET /api/subscriptions/active`

## Catatan migrasi

- `jsonb` Supabase dipindah ke kolom `json` MySQL pada `invoices.items`
- RLS Supabase diganti proteksi middleware token di Laravel
- `plan` user tetap dipertahankan agar frontend lama mudah disambungkan
- Login Google belum dipasang di backend ini; langkah berikutnya paling natural adalah tambah `Socialite` atau `Sanctum`
- `POST /api/auth/login` dibatasi `5` request per menit per kombinasi email dan IP
- `POST /api/auth/register` dibatasi `3` request per menit per kombinasi email dan IP
- `POST /api/auth/forgot-password` dibatasi `3` request per menit per kombinasi email dan IP
- `POST /api/auth/reset-password` dibatasi `5` request per menit per kombinasi email dan IP
- Saat `APP_ENV=local`, endpoint forgot password juga mengembalikan `reset_token` dan `reset_url` agar flow lokal mudah dites
