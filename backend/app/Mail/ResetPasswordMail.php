<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $userName,
        public string $resetUrl,
        public string $resetToken,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password ToolKeuangan',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reset-password',
            with: [
                'userName' => $this->userName,
                'resetUrl' => $this->resetUrl,
                'resetToken' => $this->resetToken,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
