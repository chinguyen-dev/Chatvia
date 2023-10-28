<?php

namespace App\Events;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
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
        return new PresenceChannel('chat.' . $this->message->conversation_id);
    }

    public function broadcastAs(): string
    {
        return 'SEND-CHAT';
    }


    public function broadcastWith(): array
    {
        return [
            'user' => $this->user,
            'message' => new MessageResource($this->message)
        ];
    }
}
