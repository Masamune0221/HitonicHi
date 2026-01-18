#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# キャッシュクリア
php artisan config:clear
php artisan route:clear
php artisan view:clear

# マイグレーション（失敗しても起動は続ける）
php artisan migrate --force || echo "⚠️ Migration skipped"

# php-fpm をバックグラウンドで起動
php-fpm -D

# nginx をフォアグラウンドで起動（←これが超重要）
nginx -g "daemon off;"
