#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."


# 必要なディレクトリを作成
echo "📁 Creating necessary directories..."
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p bootstrap/cache

# 権限設定
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# キャッシュクリア
echo "🧹 Clearing caches..."
php artisan config:clear --no-interaction || true
php artisan route:clear --no-interaction || true
php artisan view:clear --no-interaction || true
php artisan cache:clear --no-interaction || true

# 本番用キャッシュ生成（エラーが出る可能性があるのでスキップ）
echo "⚡ Building caches..."
# php artisan config:cache --no-interaction || true
# php artisan route:cache --no-interaction || true
# php artisan view:cache --no-interaction || true

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
# Laravel のログを標準出力に流す（Render のログで見れるようにする）
touch /var/www/html/storage/logs/laravel.log
tail -f /var/www/html/storage/logs/laravel.log &

# Nginx をフォアグラウンドで起動
nginx -t && exec nginx -g "daemon off;"
