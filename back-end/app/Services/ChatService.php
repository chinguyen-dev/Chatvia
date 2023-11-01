<?php

namespace App\Services;

use App\Events\SendMessage;
use App\Exceptions\NotFoundException;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Stmt\TryCatch;

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



    public function getConversationById(int $id)
    {
        try {
            $conversation = Conversation::find($id);
            if (!$conversation) throw new NotFoundException('Conversation not found');
            return $conversation;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('message: ' . $e->getMessage() . ' Line: ' . $e->getLine());
        }
    }
}
