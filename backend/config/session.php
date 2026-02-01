<?php

use Illuminate\Support\Str;

return [
    'driver' => 'database', 
    'lifetime' => 120,
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/sessions'),
    'connection' => null,
    'table' => 'sessions',
    'store' => null,
    'lottery' => [2, 100],
    'cookie' => 'hitonichi_session',
    'path' => '/',

    // 絶対に null （環境変数を使わない）
    'domain' => null,

    // 絶対に true （HTTPS必須）
    'secure' => true,

    'http_only' => true,

    // 絶対に 'none' （クロスドメイン必須）
    'same_site' => 'none',

    'partitioned' => true,
];
