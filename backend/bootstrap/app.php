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
        // CORSを最優先で適用する
        $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);

        // Sanctumのステートフル認証（Cookie用）を有効にする
        $middleware->statefulApi();

        // Cloud Run（プロキシ）配下でHTTPSを正しく認識し、セキュアCookieを発行させるために必須
        $middleware->trustProxies(at: '*');

        // 未認証時にHTML（ログイン画面）に飛ばそうとするのを防ぎ、必ずJSON（401エラー等）を返すように強制する
        $middleware->alias([
            'json.request' => \Illuminate\Http\Middleware\HandleCors::class, // ダミー。実際には下で無名ミドルウェアを使う
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
