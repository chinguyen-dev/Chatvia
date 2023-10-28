<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Services\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    private ChatService $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChatResource::collection($this->chatService->getConversations());
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
    public function store(Request $request)
    {
        $conversation = $this->chatService->createConversation($request->all());
        return new ChatResource($conversation);
    }

    public function sendChat(Request $request)
    {
        return new MessageResource($this->chatService->sendMessage($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return new ChatResource($this->chatService->getConversationById($id));
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
