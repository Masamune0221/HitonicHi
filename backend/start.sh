#!/bin/sh
set -e

echo "🚀 Starting Laravel app..."

# . envが存在しない場合は作成
if [ ! -f . env ]; then
    echo "📝 Creating .env file from . env.example..."
    cp .env.example . env
fi

# APP_KEYが空または未設定の場合は生成
if !  grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
    echo "🔑 Generating APP_KEY..."
    php artisan key:generate --force --no-interaction
fi

# 権限確認（念のため）
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache || true

# キャッシュクリア
echo "🧹 Clearing caches..."
php artisan config:clear --no-interaction || true
php artisan route:clear --no-interaction || true
php artisan view:clear --no-interaction || true
php artisan cache:clear --no-interaction || true

# 本番用キャッシュ生成
echo "⚡ Building caches..."
php artisan config:cache --no-interaction || true
php artisan route:cache --no-interaction || true
php artisan view:cache --no-interaction || true

# マイグレーション（データベース接続がある場合のみ）
echo "🗄️ Running migrations..."
php artisan migrate --force --no-interaction || echo "⚠️ Migration skipped (DB not configured)"

echo "✅ Laravel setup complete"
echo "🌐 Starting PHP-FPM and Nginx..."

# PHP-FPM をバックグラウンドで起動
php-fpm -D

# Nginx の設定テスト
nginx -t

# Nginx をフォアグラウンドで起動（これによりコンテナが終了しない）
exec nginx -g "daemon off;"
