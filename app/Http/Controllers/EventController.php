<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Http\Resources\EventResource;
use App\Http\Resources\InviteResource;
use App\Http\Resources\EventShowResource;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use Illuminate\Support\Facades\Auth;
use App\Mail\EventEmail;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Mail\InviteEmail;

use App\Models\EventInvites;
use App\Models\Event;
use App\Models\FoodOptions;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
    
        $query = Event::withCount('invites');

        $query->where(function ($q) use ($userId) {
            $q->where('user_id1', $userId)
              ->orWhere('user_id2', $userId);
        });
    
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
    
        if (request('title')) {
            $query->where('title', 'LIKE', '%' . request('title') . '%');
        }
    
        $events = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
    
        return inertia('Event/Index', [
            'events' => EventResource::collection($events),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Event/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Create the event
        $event = Event::create($data);

        // Store food options if provided
        if (!empty($data['food_options'])) {
            foreach ($data['food_options'] as $foodOption) {
                FoodOptions::create([
                    'event_id' => $event->id,
                    'main_course' => $foodOption,
                ]);
            }
        }

        return to_route('event.index')
            ->with('success', 'Event was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        $invitesQuery = $event->invites();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request('name')) {
            $invitesQuery->where('name', 'LIKE', '%' . request('name') . '%');
        }

        $invites = $invitesQuery->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        $event->load('foodOptions');

        return inertia('Event/Show', [
            'event' => new EventShowResource($event),
            'invites' => InviteResource::collection($invites),
            'queryParams' => request()->query() ?: null
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        $event->load('foodOptions');

        $foodOptions = $event->foodOptions ?? collect();
        $foodOptions = $foodOptions->pluck('main_course')->toArray();

        return inertia('Event/Edit', [
            'event' => new EventResource($event),
            'foodOptions' => $foodOptions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $eventTitle = $event->title;
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        // Update the event details
        $event->update($data);

        // Get new food options from the request
        $newFoodOptions = $data['food_options'] ?? [];

        // Get existing food options from the database
        $existingFoodOptions = $event->foodOptions()->pluck('main_course', 'id')->toArray();

        // Create arrays for easier processing
        $existingFoodOptionsById = array_keys($existingFoodOptions);

        // Track IDs of options to delete
        $foodOptionsToDelete = [];

        // Track which existing options are updated
        $existingOptionsUpdated = [];

        // Update existing options or create new ones
        foreach ($newFoodOptions as $newOption) {
            if (in_array($newOption, $existingFoodOptions)) {
                // Get the ID of the existing option
                $existingOptionId = array_search($newOption, $existingFoodOptions);
                $existingOptionsUpdated[] = $existingOptionId;
                // Update existing food option if necessary
                FoodOptions::where('id', $existingOptionId)->update(['main_course' => $newOption]);
            } else {
                // Create new food option
                FoodOptions::create([
                    'event_id' => $event->id,
                    'main_course' => $newOption,
                ]);
            }
        }

        // Determine options to delete
        $foodOptionsToDelete = array_diff($existingFoodOptionsById, $existingOptionsUpdated);

        // Delete removed food options
        FoodOptions::whereIn('id', $foodOptionsToDelete)->delete();

        return to_route('event.index')
            ->with('success', "$eventTitle was updated");
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $title = $event->title;

        $event->delete();

        return to_route('event.index')
            ->with('success', "Event $title was deleted");
    }

    public function sendAllInviteEmails(Event $event)
    {
        $eventInvites = $event->invites;
    
        foreach ($eventInvites as $invite) {
            $encryptedCode = Crypt::encryptString($invite->invite_code);
    
            // Mail::to($invite->email)->queue(new InviteEmail($invite, $event, $encryptedCode));
            Mail::to($invite->email)->send(new InviteEmail($invite, $event, $encryptedCode));
        }
    
        return redirect()->route('event.index')
            ->with('success', 'All invite emails were sent.');
    }
}
