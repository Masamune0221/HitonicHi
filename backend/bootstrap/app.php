<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Sanctumのステートフル認証（Cookie用）を有効化
        $middleware->statefulApi();

        // XSRF-TOKENをJSから読み取り可能にするため、暗号化から除外する
        $middleware->encryptCookies(except: [
            'XSRF-TOKEN',
        ]);

        // Cloud Run（プロキシ）配下でHTTPSを正しく認識させる
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    })->create();
