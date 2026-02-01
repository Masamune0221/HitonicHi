<?php

use Illuminate\Support\Str;

return [
    'driver' => env('SESSION_DRIVER', 'database'),
    'lifetime' => (int) env('SESSION_LIFETIME', 120),
    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),
    'encrypt' => env('SESSION_ENCRYPT', false),
    'files' => storage_path('framework/sessions'),
    'connection' => env('SESSION_CONNECTION'),
    'table' => env('SESSION_TABLE', 'sessions'),
    'store' => env('SESSION_STORE'),
    'lottery' => [2, 100],
    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug((string) env('APP_NAME', 'laravel')).'-session'
    ),
    'path' => env('SESSION_PATH', '/'),

    // ここを強制的に null にする（環境変数を無視）
    'domain' => null,

    // ここを強制的に true にする（SameSite=None の必須条件）
    'secure' => true,

    'http_only' => env('SESSION_HTTP_ONLY', true),

    // ここを強制的に 'none' にする（環境変数を無視）
    'same_site' => 'none',

    'partitioned' => true,
];
