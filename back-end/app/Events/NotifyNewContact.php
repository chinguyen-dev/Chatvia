<?php

namespace App\Events;

use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotifyNewContact implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Contact $contact)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel|array
     */
    public function broadcastOn(): PrivateChannel|array
    {
        return new PrivateChannel("User.{$this->contact->contacted_id}");
    }

    public function broadcastAs(): string
    {
        return 'NEW-CONTACT';
    }

    public function broadcastWith(): ContactResource
    {
        return new ContactResource($this->contact);
    }
}
