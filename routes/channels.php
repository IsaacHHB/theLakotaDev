<?php

use Illuminate\Support\Facades\Broadcast;

use App\Http\Resources\UserResource;

Broadcast::channel('online', function ($user) {
    return $user ? new UserResource($user) : null;
});