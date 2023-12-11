<?php

namespace App\Http\Controllers\Api;

use App\Events\NotifyAcceptedContact;
use App\Events\NotifyNewContact;
use App\Events\NotifyRevokeInvitation;
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
    public function store(Request $request): ContactResource
    {
        $request->validate([
            'contacted_id' => 'required',
        ]);

        $userAuth = auth()->user();
        $contacted_id = (int)$request->input('contacted_id');

        $user = User::find($contacted_id);
        if (!$user) throw  ValidationException::withMessages(['error' => "User not found."]);
        $isExist = Contact::where('user_id', auth()->id())->where('contacted_id', $contacted_id)->first();
        if ($isExist) throw  ValidationException::withMessages(['error' => "Contact isExist in Database."]);
        $contact = $userAuth->contacts()->create([
            'contacted_id' => $contacted_id
        ]);
        broadcast(new NotifyNewContact($contact))->toOthers();
        return new ContactResource($contact);
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
    public function update(Request $request, Contact $contact): JsonResponse
    {
        $request->validate([
            'status' => 'required'
        ]);
        $contact->update($request->all());
        broadcast(new NotifyAcceptedContact($contact->first()))->toOthers();
        return response()->json([
            'message' => 'Update contact successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @throws ValidationException
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $contact = $contact->first();
        if ($contact->user_id != auth()->id()) throw ValidationException::withMessages(['error' => 'Delete contact failed']);
        broadcast(new NotifyRevokeInvitation($contact))->toOthers();
        $contact->delete();
        return response()->json([
            'message' => 'delete contact successfully'
        ]);
    }
}
