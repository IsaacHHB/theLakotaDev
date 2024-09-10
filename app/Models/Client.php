<?php

namespace App\Models;

use Laravel\Passport\Client as PassportClient;

class Client extends PassportClient
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}