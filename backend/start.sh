#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# キャッシュクリア
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan route:clear 
php artisan view:clear
php artisan cache:clear

php artisan session:table || true 

# マイグレーション
echo "🗄️ Running migrations..."
php artisan migrate --force --no-interaction || echo "⚠️ Migration skipped (DB not configured)"




echo "✅ Laravel setup complete"

echo "📋 Environment check..."
php artisan --version
php -v

# 🌐 PHP-FPM と Nginx の起動
echo "🌐 Starting PHP-FPM..."
php-fpm -D

echo "🌐 Starting Nginx..."
# Nginx をフォアグラウンドで起動
nginx -t && exec nginx -g "daemon off;"
