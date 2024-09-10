<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InviteResource extends JsonResource
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
            "name" => $this->name,
            "email" => $this->email,
            "is_attending" => $this->is_attending,
            "plus_one" => $this->plus_one,
            "lock_plus_one" => $this->lock_plus_one,
            "plus_one_name" => $this->plus_one_name,
            "food_preference" => $this->food_preference,
            "plus_one_food_preference" => $this->plus_one_food_preference,
            "dietary_restrictions" => $this->dietary_restrictions,
            "plus_one_dietary_restrictions" => $this->plus_one_dietary_restrictions,
            "message" => $this->message,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
