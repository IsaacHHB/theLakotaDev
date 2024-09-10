<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id1',
        'user_id2',
        'type',
        'title',
        'description',
        'location',
        'street_address1',
        'street_address2',
        'city',
        'state',
        'zip_code',
        'start_time',
        'end_time',
        'date',
        'invite_cutoff',
        'created_by',
        'updated_by',
    ];
    public function user1()
    {
        return $this->belongsTo(User::class, 'user_id1');
    }

    public function user2()
    {
        return $this->belongsTo(User::class, 'user_id2');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function foodOptions()
    {
        return $this->hasMany(FoodOptions::class, 'event_id');
    }

    public function invites()
    {
        return $this->hasMany(EventInvites::class, 'event_id');
    }

    public function musicSuggestions()
    {
        return $this->hasMany(MusicSuggestion::class, 'event_id');
    }
}
