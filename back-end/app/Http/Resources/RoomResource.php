<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'room_id' => $this->id,
            'room_name' => $this->name,
            'room_type' => $this->type,
            'creator_id' => $this->creator_id,
            'members' => MemberResource::collection($this->members),
            'messages' => MessageResource::collection($this->messages)
        ];
    }
}
