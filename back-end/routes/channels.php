<?php

use App\Http\Resources\MemberResource;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

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

Broadcast::channel('conversation.{id}', function ($user, $id) {
    return $user->canJoinRoom($id) && auth()->check();
});

Broadcast::channel('chat', function ($user) {
    return auth()->check();
});

Broadcast::channel('user.{id}', function ($user, $id) {
    $receiver = User::find($id);
    return $receiver ? true : false;
});
