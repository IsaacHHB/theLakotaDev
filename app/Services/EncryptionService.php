<?php

namespace App\Services;

class EncryptionService
{
    public function getStoredEncryptedValue()
    {
        return config('wedding.invite_encrypted_key');
    }
}