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
        // ステートフル認証（Session/Cookie）を有効化
        $middleware->statefulApi();

        // XSRF-TOKENを暗号化から外す（これがエンコード問題の解決策！）
        $middleware->encryptCookies(except: [
            'XSRF-TOKEN',
        ]);

        // Cloud Runなどのプロキシ環境でのHTTPS認識を確実に
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
    })->create();
