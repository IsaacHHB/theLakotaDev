<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodOptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'main_course',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    public function eventInvite()
    {
        return $this->belongsTo(EventInvites::class, 'event_id', 'event_id');
    }
}