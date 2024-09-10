<x-mail::message>
# Wedding Invitation Update

Dear {{ $inviteData['name'] }},

Your RSVP has been updated. Thank you!

Here are your updated details:

<x-mail::table>
| **Field**                    | **Value**                      |
|------------------------------|--------------------------------|
| **Email**                    | {{ $inviteData['email'] }}     |
| **Is Attending**             | {{ $inviteData['is_attending'] ? 'Yes' : 'No' }} |
| **Plus One**                 | {{ $inviteData['plus_one'] ? 'Yes' : 'No' }}      |
@if ($inviteData['plus_one'])
| **Plus One Name**            | {{ $inviteData['plus_one_name'] }} |
@endif
| **Food Preference**          | {{ $inviteData['food_preference'] }} |
@if ($inviteData['plus_one'])
| **Plus One Food Preference** | {{ $inviteData['plus_one_food_preference'] }} |
@endif
| **Dietary Restrictions**     | {{ $inviteData['dietary_restrictions'] }} |
@if ($inviteData['plus_one'])
| **Plus One Dietary Restrictions** | {{ $inviteData['plus_one_dietary_restrictions'] }} |
@endif
| **Message**                  | {{ $inviteData['message'] }}   |
</x-mail::table>

You can view your updated invitation details by clicking the link below:

<x-mail::button :url="route('invite.index', ['encrypted' => $encryptedUrl])" color="primary">
Edit Invitation
</x-mail::button>

@if ($inviteData['is_attending'])
<x-mail::button :url="route('music.index', ['encrypted' => $encryptedUrl])" color="success">
Music Suggestions
</x-mail::button>

<x-mail::button :url="route('invite.wedding', ['encrypted' => $encryptedUrl])">
Wedding Website
</x-mail::button>
@endif

Thanks,<br>
Isaac & Savannah
</x-mail::message>