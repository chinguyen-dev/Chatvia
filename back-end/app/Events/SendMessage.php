<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendMessage implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Message $message;
    public User $user;

    /**
     * Create a new event instance.
     */
    public function __construct(User $user, Message $message)
    {
        $this->message = $message;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }

    public function broadcastAs(): string
    {
        return 'SEND-CHAT';
    }


    public function broadcastWith(): array
    {
        return [
            'conversation_id' => $this->message->conversation_id,
            'message' => new MessageResource($this->message)
        ];
    }

    public function broadcastWhen(): bool
    {
        return $this->user->canJoinRoom($this->message->conversation_id);
    }
}
