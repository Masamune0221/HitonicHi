#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# キャッシュクリア
echo "🧹 Clearing caches..."
php artisan package:discover --ansi
php artisan config:clear --no-interaction || true
php artisan route:clear --no-interaction || true
php artisan view:clear --no-interaction || true
php artisan cache:clear --no-interaction || true


# マイグレーション
echo "🗄️ Running migrations..."
php artisan migrate --force --no-interaction || echo "⚠️ Migration skipped (DB not configured)"

echo "✅ Laravel setup complete"

# Seeder実行
echo "🌱 Running seeders..."
php artisan db:seed --class=DatabaseSeeder --force --no-interaction || echo "⚠️ Seeder skipped (DB not configured)"

echo "📋 Environment check..."
php artisan --version
php -v

# 🌐 PHP-FPM と Nginx の起動
echo "🌐 Starting PHP-FPM..."
php-fpm -D

echo "🌐 Starting Nginx..."
# Nginx をフォアグラウンドで起動
nginx -t && exec nginx -g "daemon off;"

