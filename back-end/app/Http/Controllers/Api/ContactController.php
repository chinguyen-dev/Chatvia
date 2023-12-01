<?php

namespace App\Http\Controllers\Api;

use App\Events\NotifyNewContact;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        return ContactResource::collection(auth()->user()->contacts);
    }

    /**
     * Store a newly created resource in storage.
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'contacted_id' => 'required',
        ]);
        $userAuth = auth()->user();
        $contacted_id = (int)$request->input('contacted_id');
        $user = User::find($contacted_id);
        if (!$user) throw  ValidationException::withMessages(['error' => "User not found."]);
        $contact = $userAuth->contacts()->create([
            'contacted_id' => $contacted_id
        ]);
        broadcast(new NotifyNewContact($contact))->toOthers();
        return response()->json([
            'message' => 'sent a friend request.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
