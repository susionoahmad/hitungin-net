# Tools Bisnis & Keuangan Indonesia

Proyek monorepo yang menggabungkan frontend Vue 3 dan backend Laravel.

## Struktur Project

```
ToolKeuangan/
├── frontend/  # Vue 3 + TypeScript + TailwindCSS (Deploy ke Vercel)
└── backend/   # Laravel (Deploy ke GCP)
```

## Frontend

Pindah ke folder frontend:
```bash
cd frontend
npm install
npm run dev
```

### Build & Deploy (Vercel)
1. Di Vercel Dashboard, buka **Project Settings**.
2. Set **Root Directory** ke `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`

## Backend

Pindah ke folder backend:
```bash
cd backend
composer install
php artisan serve
```

### Deploy (GCP Debian)
1. Clone repositori di server.
2. Navigasi ke `cd backend`.
3. Jalankan setup Laravel (env, migrations, storage links).

## Catatan Tambahan
- `frontend/supabase/` berisi schema SQL untuk database.
- Pastikan `VITE_API_BASE_URL` di environment variable frontend mengarah ke URL backend yang ada di GCP.
