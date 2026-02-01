<?php

use Laravel\Sanctum\Sanctum;

return [

    'stateful' => [
        'hitonichi-97c4a.web.app',
        'hitonichi-97c4a.firebaseapp.com',
        'hitonichi-715553736851.us-central1.run.app',
    ],

    'guard' => ['web'],

    'expiration' => null,

    'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),

    'middleware' => [
        'authenticate_session' => Laravel\Sanctum\Http\Middleware\AuthenticateSession::class,
        'encrypt_cookies' => Illuminate\Cookie\Middleware\EncryptCookies::class,
        'validate_csrf_token' => Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    ],

];
