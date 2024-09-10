<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class APIAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $tokenResult = $user->createToken('YourAppName');
            $token = $tokenResult->accessToken;
            $expiration = $tokenResult->token->expires_at;

            // Ensure Carbon instance for current time
            $now = Carbon::now();
            // Ensure expiration is a Carbon instance
            $expiresAt = Carbon::parse($expiration);

            // Calculate expires_in (in seconds) correctly
            // Ensure that we are measuring the interval from now to the expiration
            $expiresIn = $now->diffInSeconds($expiresAt);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => $expiresIn
            ], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}