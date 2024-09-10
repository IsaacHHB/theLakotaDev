<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventInvites extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'invite_code',
        'name',
        'email',
        'is_attending',
        'plus_one_attending',
        'plus_one',
        'lock_plus_one',
        'plus_one_name',
        'food_preference',
        'plus_one_food_preference',
        'dietary_restrictions',
        'plus_one_dietary_restrictions',
        'message',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function foodOptions()
    {
        return $this->hasMany(FoodOptions::class, 'event_id', 'event_id');
    }

    public function musicSuggestions()
    {
        return $this->hasMany(MusicSuggestion::class, 'event_invite_id');
    }
}
