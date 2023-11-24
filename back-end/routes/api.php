<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::prefix('/v1')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::apiResources([
            'chats' => ChatController::class,
            'users' => UserController::class
        ]);

        Route::prefix('/chats')->group(function () {
            Route::controller(ChatController::class)->group(function () {
                Route::post('/sendChat', 'sendChat');
                Route::post('/readMsg', 'readMsg');
            });
        });

        Route::prefix('/users')->group(function () {
            Route::controller(UserController::class)->group(function () {
                Route::get('/like/{email}', 'findByEmail');
            });
        });
    });
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
