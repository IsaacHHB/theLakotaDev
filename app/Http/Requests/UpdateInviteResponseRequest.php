<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInviteResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'is_attending' => ['required', 'boolean'],
            'plus_one_attending' => ['required', 'boolean'],
            'plus_one_name' => ['nullable', 'string', 'max:255'],
            'food_preference' => ['required', 'string', 'max:255'],
            'plus_one_food_preference' => ['nullable', 'string', 'max:255'],
            'dietary_restrictions' => ['nullable', 'string', 'max:255'],
            'plus_one_dietary_restrictions' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string']
        ];
    }
}