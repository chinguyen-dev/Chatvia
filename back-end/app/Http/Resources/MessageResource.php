<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sender' => new MemberResource(User::find($this->sender_id)),
            'receiver' => new MemberResource(User::find($this->receiver_id)),
            'body' => $this->content,
            'unread' => !!$this->seen,
            'created_at' => $this->created_at->format('g:i A'),
        ];
    }
}
