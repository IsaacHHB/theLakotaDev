<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

use App\Mail\InviteEmail;

use App\Http\Requests\UpdateInviteResponseRequest;
use App\Models\EventInvites;
use App\Mail\EventEmail;


class InviteResponseController extends Controller
{

    public function confirmation()
    {
        return inertia('Invite/Confirmation', [
            "success" => session('success'),
            "error" => session('error')
        ]);
    }

    public function index(Request $request)
    {
        $invite = $request->get('invite');
        $foodOptions = $invite->foodOptions;
        $encrypted = $request->encrypted;
    
        $event = $invite->event;
    
        if ($event->invite_cutoff && now()->greaterThan($event->invite_cutoff)) {
            return to_route('invite.expired', ['encrypted' => $encrypted]);
        }
    
        return inertia('InviteResponse/Index', [
            'invite' => [
                'id' => $invite->id,
                'name' => $invite->name,
                'email' => $invite->email,
                'is_attending' => $invite->is_attending,
                'plus_one' => $invite->plus_one,
                'plus_one_attending' => $invite->plus_one_attending,
                'lock_plus_one' => $invite->lock_plus_one,
                'plus_one_name' => $invite->plus_one_name,
                'food_preference' => $invite->food_preference,
                'plus_one_food_preference' => $invite->plus_one_food_preference,
                'dietary_restrictions' => $invite->dietary_restrictions,
                'plus_one_dietary_restrictions' => $invite->plus_one_dietary_restrictions,
                'message' => $invite->message,
                'foodOptions' => $foodOptions,
                'encrypted' => $encrypted
            ]
        ]);
    }

    public function update(UpdateInviteResponseRequest $request, EventInvites $invite)
    {
        $data = $request->validated();

        $invite->update($data);

        $updatedInvite = EventInvites::find($invite->id);

        $inviteCode = $updatedInvite->invite_code;

        $encrypted = Crypt::encryptString($inviteCode);

        Mail::to($updatedInvite->email)->send(new EventEmail($updatedInvite, $encrypted));

        return to_route('invite.wedding', ['encrypted' => $encrypted]);
    }

    public function weddingWebsite()
    {
        return inertia('Website/Index');
    }

    public function expired()
    {
        return inertia('InviteResponse/Expired');
    }

    public function sendInvite(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $invite = EventInvites::where('email', $request->input('email'))->first();

        if ($invite) {
            $encryptedCode = Crypt::encryptString($invite->invite_code);

            try {
                Mail::to($invite->email)->send(new InviteEmail($invite, $invite->event, $encryptedCode));
                return redirect()->route('invite.confirmation')->with('success', 'Invite email was sent successfully.');
            } catch (\Exception $e) {
                Log::error('Failed to send invite email:', ['error' => $e->getMessage()]);
                return redirect()->route('invite.confirmation')->with('error', 'Failed to send invite email. Please try again.');
            }
        } else {
            return redirect()->route('invite.confirmation')->with('error', 'Email not found in the invite list.');
        }
    }
}
