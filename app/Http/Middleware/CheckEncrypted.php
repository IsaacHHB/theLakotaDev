<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Symfony\Component\HttpFoundation\Response;

class CheckEncrypted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $entityClass  The model class to check.
     * @param  string  $field  The field to search by.
     * @param  string  $attributeName  The name of the request attribute to store the found entity.
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, string $entityClass, string $field, string $attributeName): Response
    {
        // Assuming 'encrypted' is the parameter name in the route
        $encryptedCode = $request->encrypted;

        if (!$encryptedCode) {
            return abort(403, 'Unauthorized access.');
        }

        try {
            $decryptedCode = Crypt::decryptString($encryptedCode);
            $entity = $entityClass::where($field, $decryptedCode)->first();

            if (!$entity) {
                return abort(403, 'Unauthorized access.');
            }

            // Add the entity to the request attributes
            $request->attributes->add([$attributeName => $entity]);

        } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
            return abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}