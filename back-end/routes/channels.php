<?php

use App\Http\Resources\MemberResource;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/


Broadcast::channel('room.{roomId}', function ($user, $roomId) {
    return $user->canJoinRoom($roomId) && auth()->check();
});

Broadcast::channel('user.{id}', function ($user, $id) {
    return auth()->check();
});
