<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'contact_id' => $this->id,
            'sender' => new MemberResource($this->sender),
            'receiver' => new MemberResource($this->receiver),
            'status' => $this->status,
            'created_at' => $this->created_at
        ];
    }
}
