<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMusicRequest;
use App\Http\Requests\UpdateMusicRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

use App\Models\EventInvites;
use App\Models\MusicSuggestion;

class MusicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $invite = $request->get('invite');
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
    
        // Assuming $invite->musicSuggestions returns a collection
        $musicSuggestions = $invite->musicSuggestions()
                                    ->orderBy($sortField, $sortDirection)
                                    ->get();
    
        return inertia('Music/Index', [
            'invite' => $invite,
            'encrypted' => $request->encrypted,
            'musicSuggestions' => $musicSuggestions,
            "success" => session('success')
        ]);
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
    public function store(StoreMusicRequest $request)
    {
        $data = $request->validated();

        $music = MusicSuggestion::create($data);

        return redirect()->back()->with('success', 'Music suggestion created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(MusicSuggestion $music)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MusicSuggestion $music)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMusicRequest $request, MusicSuggestion $music)
    {
        $music->update($request->validated());
        return redirect()->back()->with('success', 'Music suggestion updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MusicSuggestion $music)
    {
        $music->delete();

        return redirect()->back()->with('success', 'Music suggestion deleted successfully');
    }
}
