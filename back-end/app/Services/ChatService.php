<?php

namespace App\Services;

use App\Events\SendMsg;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ChatService
{
    /**
     * @throws ValidationException
     */
    public function sendChatOneToOne(array $attributes)
    {
        $receiverId = (int)$attributes['to'];
        $room_type = $attributes['type'];
        $msg = $attributes['msg'];
        if (auth()->id() == $receiverId) throw ValidationException::withMessages(['to' => 'receiver to incorrect']);
        try {
            DB::beginTransaction();
            $room = auth()->user()->checkRoomExist(room_type: $room_type, receiverId: $receiverId);
            if (!$room) {
                $room = Room::create([
                    'type' => $room_type,
                    'creator_id' => auth()->id()
                ]);
                $room->members()->attach([
                    ['user_id' => auth()->id()],
                    ['user_id' => $receiverId]
                ]);
            }
            $msg = $this->saveMsg([
                'room_id' => $room->id,
                'sender_id' => auth()->id(),
                'receiver_id' => $receiverId,
                'body' => $msg
            ]);
            DB::commit();
            return $msg;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Message: {$e->getMessage()} Line: {$e->getLine()}");
        }
    }

    /**
     * @throws ValidationException
     */
    public function sendChatGroup(array $attributes)
    {
        $roomId = (int)$attributes['to'];
        $msg = $attributes['msg'];
        $room = Room::find($roomId);
        if (!$room) throw ValidationException::withMessages([
            'error' => 'Group not found.'
        ]);
        try {
            DB::beginTransaction();


            DB::commit();
            return $room;
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error("Message: {$exception->getMessage()} Line: {$exception->getLine()}");
        }
    }


    /**
     * @throws ValidationException
     */
    public function saveMsg(array $attributes, bool $type = false)
    {
        if (!$type) {
            $receiver = User::find((int)$attributes['receiver_id']);
            if (!$receiver) throw ValidationException::withMessages([
                'error' => "Receiver not found with ID: {$attributes['receiver_id']}"
            ]);
            $msg = Message::create($attributes);
            broadcast(new SendMsg($msg))->toOthers();
            return $msg;
        } else {
            // send chat group
        }
    }

    public function createGroupChat(array $attributes, array $arrIdMember)
    {
        try {
            DB::beginTransaction();
            $room = Room::create($attributes);
            $members = collect($arrIdMember)->map(fn(int $id) => ['user_id' => $id])->all();
            $room->members()->attach($members);
            DB::commit();
            return $room;
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error("Message: {$exception->getMessage()} Line: {$exception->getLine()}");
        }
    }
}
