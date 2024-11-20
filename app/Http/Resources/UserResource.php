<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            'avatar_url' => $this->avatar_url ? Storage::url($this->avatar_url) : null,
            "name" => $this->name,
            "email" => $this->email,
            "is_admin" => (bool) $this->is_admin,
            "last_message" => $this->last_message,
            // append the los angeles timezone
            'last_message_date' => $this->last_message_date 
                ? Carbon::parse($this->last_message_date)->setTimezone('America/Los_Angeles')->toDateTimeString() 
                : null,
        ];
    }
}
