#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# キャッシュ系（安全）
php artisan config:clear
php artisan route:clear
php artisan view:clear

# マイグレーション（productionでも止まらない）
php artisan migrate --force || echo "⚠️ Migration skipped"

# nginx & php-fpm 起動
php-fpm -D
nginx -g "daemon off;"
