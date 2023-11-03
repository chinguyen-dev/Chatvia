<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'chat_id' => $this->id,
            'name' => $this->name,
            'creator_id' => $this->creator_id,
            'type' => $this->type,
            'members' => MemberResource::collection($this->members),
            'messages' => MessageResource::collection($this->messages)
        ];
    }
}
