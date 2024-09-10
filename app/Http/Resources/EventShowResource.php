<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use Carbon\Carbon;

class EventShowResource extends JsonResource
{

    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            "id"                =>  $this->id,
            "user_id1"          =>  $this->user_id1,
            "user_id2"          =>  $this->user_id2,
            "type"              =>  $this->type,
            "title"             =>  $this->title,
            "description"       =>  $this->description,
            "invite_count"      =>  $this->invites_count,
            "location"          =>  $this->location,
            "street_address1"   =>  $this->street_address1,
            "street_address2"   =>  $this->street_address2,
            "city"              =>  $this->city,
            "state"             =>  $this->state,
            "zip_code"          =>  $this->zip_code,
            "start_time"        =>  (new Carbon($this->start_time))->format('h:i A'),
            "end_time"          =>  (new Carbon($this->end_time))->format('h:i A'),
            "date"              =>  (new Carbon($this->date))->format('M d, Y'),
            'createdBy'         =>  new UserResource($this->createdBy),
            'updatedBy'         =>  new UserResource($this->updatedBy),
            "created_at"        =>  (new Carbon($this->created_at))->format('M d Y, h:i A'),
            "updated_at"        =>  (new Carbon($this->updated_at))->format('M d Y, h:i A'),
        ];

        if ($this->relationLoaded('foodOptions')) {
            $data['foodOptions'] = FoodOptionsResource::collection($this->foodOptions);
        }
        
        return $data;
    }
}