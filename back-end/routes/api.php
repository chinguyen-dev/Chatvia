<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

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
        Route::get('/user', function (Request $request) {
            return response()->json([
                'data' => $request->user()
            ]);
        });

        Route::resource('/chat', ChatController::class)->except(['create']);
        Route::resource('/message', MessageController::class)->only(['store']);
        Route::put('/message/seen', [MessageController::class, 'updateSeen']);

        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });

    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
});
