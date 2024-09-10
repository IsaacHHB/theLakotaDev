<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $inviteData;
    public $encryptedUrl;

    /**
     * Create a new message instance.
     */
    public function __construct($inviteData, $encryptedUrl)
    {
        $this->inviteData = $inviteData;
        $this->encryptedUrl = $encryptedUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'You have RSVP\'d to our wedding! 🎉 - ' . now()->format('Y-m-d H:i:s'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.attending',
            with: [
                'inviteData' => $this->inviteData,
                'encryptedUrl' => $this->encryptedUrl,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
