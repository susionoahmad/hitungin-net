#!/bin/bash

echo "🚀 Starting Deployment Process..."

# 1. Pull latest changes (optional if already on server)
# git pull origin main

# 2. Build and Start Containers
docker-compose up -d --build

# 3. Install Composer Dependencies
docker-compose exec app composer install --no-dev --optimize-autoloader

# 4. Generate Key if not exists
docker-compose exec app php artisan key:generate --force

# 5. Run Migrations
docker-compose exec app php artisan migrate --force

# 6. Clear Caches
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache

echo "✅ Deployment Finished Successfully!"
echo "🔗 App is running on http://your-gcp-ip"
