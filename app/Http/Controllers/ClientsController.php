<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Http\Resources\ClientResource;
use Laravel\Passport\ClientRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // Authenticated user
        $clients = $user->clients; // Assuming there's a relationship defined in the User model

        // Assuming you have a resource class named ClientResource, if not, comment out the resource part
        $clientsResource = ClientResource::collection($clients);

        return Inertia::render('Clients/Index', [
            "clients" => $clientsResource,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();  // Ensure the user is authenticated
        $clientRepository = new ClientRepository();

        $client = $clientRepository->create(
            $user->id,
            $request->name,
            $request->redirect,
            false
        );

        return response()->json($client, 201);
    }
}