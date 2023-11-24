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

class SendMsg implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private string $channelName;
    private Message $message;

    /**
     * Create a new event instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
        if ($message->receiver_id) $this->channelName = "User.{$message->receiver_id}";
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel|array
     */
    public function broadcastOn(): PrivateChannel|array
    {
        return new PrivateChannel($this->channelName);
    }

    public function broadcastAs(): string
    {
        return 'ON-CHAT';
    }

    public function broadcastWith(): array
    {
        return [
            'room_id' => $this->message->room_id,
            'message' => new MessageResource($this->message)
        ];
    }
}
