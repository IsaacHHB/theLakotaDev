<x-mail::message>
# You're Attending!

Hello {{ $invite['name'] }},

This is a reminder that you have been invited to the following event:

**Event:** {{ $event->title }}  
**Date:** {{ \Carbon\Carbon::parse($event->date)->toFormattedDateString() }}  
**Start Time:** {{ \Carbon\Carbon::parse($event->start_time)->format('g:i A') }}  
**Location:** RedSmith Ranch,  
**Address:** 19292 Atkins Rd, Lodi, CA 95240  

<x-mail::button :url="'https://www.google.com/maps/dir/?api=1&destination=19292+Atkins+Rd,+Lodi,+CA+95240'">
Get Directions
</x-mail::button>

The ceremony starts at {{ \Carbon\Carbon::parse($event->start_time)->format('g:i A') }}
and we ask that you do not arrive before 1:30 PM, unless you have been told otherwise.
The dress code is semi-formal.
We request for our guests to wear Converse Chuck Taylor All Star, preferably high tops, in any color or pattern you like. However, it is not required.
For more information about the event, please visit the website:

<x-mail::button :url="$inviteLink">
View Website
</x-mail::button>

We look forward to seeing you!

Thanks,<br>
Isaac & Savannah
</x-mail::message>