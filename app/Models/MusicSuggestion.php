<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MusicSuggestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'event_invite_id',
        'artist',
        'title',
    ];

    public function eventInvite()
    {
        return $this->belongsTo(EventInvites::class, 'event_invite_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
