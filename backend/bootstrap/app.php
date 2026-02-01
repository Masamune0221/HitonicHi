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
        // CORSを最優先で適用
        $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);

        // Sanctumのステートフル認証（Cookie用）を有効化
        $middleware->statefulApi();

        // Cloud Run（プロキシ）配下でHTTPSを正しく認識させる
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // APIリクエストの場合は、何があってもリダイレクトせず、必ずJSON形式でエラーを返すよう強制
        // これにより「Route [login] not defined」エラーを防ぎ、正しいCORSヘッダーを保証する
        $exceptions->shouldRenderJsonWhen(function (Request $request, Throwable $e) {
            if ($request->is('api/*')) {
                return true;
            }

            return $request->expectsJson();
        });
    })->create();
