#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# キャッシュクリア
php artisan config:clear
php artisan route:clear
php artisan view:clear

# マイグレーション（失敗しても起動は続ける）
php artisan migrate --force || echo "⚠️ Migration skipped"

# 起動
exec php artisan serve --host=0.0.0.0 --port=10000
