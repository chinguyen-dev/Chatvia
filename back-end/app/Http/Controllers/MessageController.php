<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Exceptions\NotFoundException;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): MessageResource
    {
        $receiver = User::find((int) $request->input('receiver_id'));
        if (!$receiver) throw new NotFoundException('Receiver not found');

        $message = Message::create(
            array_merge($request->all(), ['sender_id' => auth()->id(),])
        );
        broadcast(new NewMessage($receiver, $message))->toOthers();
        return new MessageResource($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    }

    public function updateSeen(Request $request)
    {
        $conversation = Conversation::find($request->input('conversation_id'));
        if (!$conversation) throw new NotFoundException('Conversation not found.');
        try {
            DB::beginTransaction();
            Message::where('conversation_id', $request->input('conversation_id'))
                ->where('sender_id', $request->input('sender_id'))
                ->update($request->all());
            DB::commit();
            return new ChatResource($conversation);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('message: ' . $e->getMessage() . ' Line: ' . $e->getLine());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
