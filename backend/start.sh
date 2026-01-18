#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# 権限確認（念のため）
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true

# キャッシュクリア
php artisan config:clear
php artisan route:clear
php artisan view:clear

# 本番用キャッシュ生成
php artisan config:cache
php artisan route:cache
php artisan view:cache

# マイグレーション
php artisan migrate --force || echo "⚠️ Migration skipped"

echo "✅ Laravel setup complete"
echo "🌐 Starting PHP-FPM and Nginx..."

# PHP-FPM をバックグラウンドで起動
php-fpm -D

# Nginx をフォアグラウンドで起動（これによりコンテナが終了しない）
exec nginx -g "daemon off;"
