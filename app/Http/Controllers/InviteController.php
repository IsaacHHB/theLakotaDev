<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;

use App\Http\Resources\FoodOptionsResource;

use App\Http\Requests\UpdateInviteRequest;
use App\Http\Requests\StoreInviteRequest;

use App\Mail\EventEmail;
use App\Mail\InviteEmail;

use App\Models\Event;
use App\Models\EventInvites;
use App\Models\FoodOptions;

class InviteController extends Controller
{
    public function index(Request $request)
    {

    }

    public function edit(Event $event_invite)
    {
        $userId = Auth::id();

        $invites = $event_invite->load('invites');

        $events = Event::where(function ($query) use ($userId) {
                    $query->where('user_id1', $userId)
                        ->orWhere('user_id2', $userId);
                })
                ->where('date', '>=', now()->toDateString())
                ->get(['id', 'title', 'date']);

        return inertia('Invite/Edit', [
            'invites' => $invites,
            'events' => $events,
            'event_id' => $event_invite->id,
        ]);
    }

    public function update(UpdateInviteRequest $request, Event $event_invite)
    {

        $validated = $request->validated();
        $existingInviteIds = $event_invite->invites->pluck('id')->toArray();
        $processedInviteIds = [];

        foreach ($validated['invites'] as $inviteData) {
            if (isset($inviteData['id'])) {
                $invite = EventInvites::findOrFail($inviteData['id']);
                $invite->update($inviteData);
                $processedInviteIds[] = $invite->id;
            } else {
                $inviteCode = $this->generateUniqueInviteCode();

                $inviteData['invite_code'] = $inviteCode;

                $invite = $event_invite->invites()->create($inviteData);
                $processedInviteIds[] = $invite->id;
            }
        }

        $invitesToDelete = array_diff($existingInviteIds, $processedInviteIds);
        EventInvites::destroy($invitesToDelete);

        return redirect()->route('event.index')
            ->with('success', 'Invites updated successfully.');
    }
    public function create()
    {
        $userId = Auth::id();
    
        $events = Event::where(function ($query) use ($userId) {
                    $query->where('user_id1', $userId)
                        ->orWhere('user_id2', $userId);
                })
                ->where('date', '>=', now()->toDateString())
                ->get(['id', 'title', 'date']);
    

        return inertia('Invite/Create', [
            'events' => $events,
        ]);
    }

    public function store(StoreInviteRequest $request)
    {
        $data = $request->validated();
        $event = Event::findOrFail($data['event_id']);
    
        foreach ($data['invites'] as $inviteData) {

            $inviteCode = $this->generateUniqueInviteCode();
    
            // Store each invite in the database
            $invite = EventInvites::create([
                'event_id' => $event->id,
                'invite_code' => $inviteCode,
                'name' => $inviteData['name'],
                'email' => $inviteData['email'],
                'plus_one_name' => $inviteData['plus_one_name'],
                'plus_one' => $inviteData['plus_one'],
            ]);
        }
    
        return redirect()->route('event.index')
            ->with('success', 'Invites were successfully created and emails were sent.');
    }

    public function sendIndividualInviteEmail(EventInvites $invite)
    {
        $encryptedCode = Crypt::encryptString($invite->invite_code);
    
        try {
            Mail::to($invite->email)->send(new InviteEmail($invite, $invite->event, $encryptedCode));
            return redirect()->route('event.index')
                ->with('success', 'Invite email was sent successfully.');
        } catch (\Exception $e) {
            // Log the error
            Log::error('Failed to send invite email:', ['error' => $e->getMessage()]);
            return redirect()->route('event.index')
                ->with('error', 'Failed to send invite email. Please try again.');
        }
    }

    private function generateUniqueInviteCode()
    {
        do {
            $inviteCode = Str::random(10);
        } while (EventInvites::where('invite_code', $inviteCode)->exists());

        return $inviteCode;
    }
}
