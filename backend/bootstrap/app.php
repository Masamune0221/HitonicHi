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

        // Cookie属性を強制上書きするミドルウェア
        $middleware->append(function (Request $request, $next) {
            $response = $next($request);
            
            // レスポンスが正しい型（ヘッダー操作可能）か確認
            if (method_exists($response, 'header')) {
                $cookies = $response->headers->getCookies();
                foreach ($cookies as $cookie) {
                    $response->headers->setCookie(
                        new Cookie(
                            $cookie->getName(),
                            $cookie->getValue(),
                            $cookie->getExpiresTime(),
                            $cookie->getPath(),
                            $cookie->getDomain(),
                            true, // secure
                            $cookie->isHttpOnly(),
                            $cookie->isRaw(),
                            'none', // samesite
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
