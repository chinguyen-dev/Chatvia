<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
Broadcast::channel('User.{id}', fn(User $user, int $id) => auth()->id() === $id);
Broadcast::channel('Typing', fn() => auth()->check());
Broadcast::channel('Room.{id}', fn(User $user, int $id) => $user->canJoinRoom($id) && ['a']);


