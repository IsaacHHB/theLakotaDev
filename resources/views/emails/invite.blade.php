<x-mail::message>
# You're Invited!

Hello {{ $invite['name'] }},

You are invited to the following event:

**Event:** {{ $event->title }}  
**Date:** {{ \Carbon\Carbon::parse($event->date)->toFormattedDateString() }}  
**Start Time:** {{ \Carbon\Carbon::parse($event->start_time)->format('g:i A') }}  
**Location:** {{ $event->location }}


Please make sure to respond ASAP, because invites expire September 3rd, 2024.

Please use the link below to confirm your attendance and view more details:

<x-mail::button :url="$inviteLink">
View Invite
</x-mail::button>

We look forward to seeing you!

Thanks,<br>
Isaac & Savannah
</x-mail::message>