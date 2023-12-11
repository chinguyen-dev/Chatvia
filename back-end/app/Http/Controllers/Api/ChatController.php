<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Services\ChatService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
    public function index(): AnonymousResourceCollection
    {
        return RoomResource::collection(auth()->user()->rooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
//        $request->validate([
//            'name' => 'required',
//            'members' => 'required'
//        ]);
//        $room = $this->chatService->createGroupChat([
//            'name' => $request->input('name'),
//            'type' => 'room',
//            'room_img' => $request->input('room_img'),
//            'creator_id' => auth()->id()
//        ], $request->input('members'));
//        return new RoomResource($room);
    }


    /**
     * Display the specified resource.
     */
    public function show(Room $room): RoomResource
    {
        return new RoomResource($room->first());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room): JsonResponse
    {
        $room->first()->delete();
        return response()->json([
            'message' => "Deleted successfully"
        ]);
    }


    /**
     * @throws ValidationException
     */
    public function sendChat(Request $request): MessageResource
    {
        $request->validate([
            'type' => 'required',
            'to' => 'required',
            'msg' => 'required',
        ]);
        if ($request->input('type') == 'people') {
            $msg = $this->chatService->sendChatOneToOne($request->all());
            return new MessageResource($msg);
        }
        return $this->chatService->sendChatGroup($request->all());
    }

    /**
     * @throws ValidationException
     */
    public function readMsg(Request $request)
    {
        $request->validate([
            'room_id' => 'required',
            'seen' => 'required',
        ]);
        $roomId = (int)$request->input('room_id');
        $room = Room::find($roomId);
        if (!$room) throw ValidationException::withMessages(['error' => 'Room not found']);
        try {
            DB::beginTransaction();
            $room->messages()
                ->where('room_id', $roomId)
                ->where('sender_id', '<>', auth()->id())
                ->update([
                    'seen' => $request->input('seen')
                ]);
            DB::commit();
            return new RoomResource($room);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error("Message: {$exception->getMessage()} Line: {$exception->getLine()}");
        }
    }
}
