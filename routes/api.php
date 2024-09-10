<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIAuthController;
use App\Http\Controllers\Api\V1\TaskController;

Route::middleware('api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:api');

    Route::apiResource('/v1/tasks', TaskController::class)->middleware('auth:api');

    Route::post('/login', [APIAuthController::class, 'login']);
});