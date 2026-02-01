<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Cookie;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        $middleware->encryptCookies(except: [
            'XSRF-TOKEN',
        ]);

        $middleware->trustProxies(at: '*');

        // 【究極の対策】全てのレスポンスヘッダーのCookieを強制的にSameSite=Noneに書き換える
        $middleware->append(function (Request $request, $next) {
            $response = $next($request);
            if (method_exists($response, 'header')) {
                foreach ($response->headers->getCookies() as $cookie) {
                    $response->headers->setCookie(
                        Cookie::create(
                            $cookie->getName(),
                            $cookie->getValue(),
                            $cookie->getExpiresTime(),
                            $cookie->getPath(),
                            $cookie->getDomain(),
                            true, // secure
                            $cookie->isHttpOnly(),
                            $cookie->isRaw(),
                            'none', // samesite を強制上書き
                            $cookie->isPartitioned()
                        )
                    );
                }
            }
            return $response;
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
