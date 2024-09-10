<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInviteRequest extends FormRequest
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
            'event_id' => ['required', 'integer', 'exists:events,id'],
            'invites' => ['required', 'array', 'min:1'],
            'invites.*.id' => ['nullable', 'integer', 'exists:event_invites,id'],
            'invites.*.name' => ['required', 'string', 'max:255'],
            'invites.*.email' => ['required', 'email', 'max:255'],
            'invites.*.plus_one_name' => ['nullable', 'string', 'max:255'],
            'invites.*.plus_one' => ['required', 'boolean'],
            'invites.*.lock_plus_one' => ['required', 'boolean'],
        ];
    }
}
