<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DairyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the API',
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/dairy/create', [DairyController::class, 'create']);
    Route::get('/dairy/today', [DairyController::class, 'today']);
    Route::get('/dairies', [DairyController::class, 'index']);
});
