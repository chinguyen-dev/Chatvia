<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChatService
{

    public function __construct()
    {
    }

    public function getConversations()
    {
        return auth()->user()->conversations;
    }

    public function createConversation(array $attributes)
    {
        try {
            DB::beginTransaction();
            $type = $attributes['type'];
            $receiverId = (int) $attributes['to'];
            $authenticatedUserId = auth()->id();
            $conversation = null;

            if ($type == 'people') {
                $conversationsOfAuthUser = auth()->user()->conversations;
                if ($conversationsOfAuthUser->isNotEmpty()) {
                    foreach ($conversationsOfAuthUser as $conversationOfAuthUser) {
                        if ($conversationOfAuthUser->type == $type && $conversationOfAuthUser->members->contains('id', $receiverId)) {
                            $conversation = $conversationOfAuthUser;
                        }
                    }
                }
            } else {
                // group conversation
            }

            if (!$conversation) {
                $conversation = Conversation::create([
                    'creator_id' =>  $authenticatedUserId, 'type' => $type
                ]);

                $conversation->members()->attach([
                    ['user_id' => $authenticatedUserId],
                    ['user_id' => $receiverId],
                ]);
            }
            DB::commit();

            return $conversation;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('message: ' . $e->getMessage() . ' Line: ' . $e->getLine());
        }
    }

    public function sendMessage(array $attributes)
    {
        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => (int) $attributes['receiver_id'],
            'conversation_id' => (int) $attributes['conversation_id'],
            'content' => $attributes['body'],
        ]);
        dd($message);
    }
}
