<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;

use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = User::query();

        $sortField      = request('sort_field', 'created_at');
        $sortDirection  = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'LIKE', '%' . request('name') . '%');
        }

        if (request('email')) {
            $query->where('email', 'LIKE', '%' . request('email') . '%');
        }

        $users = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia('User/Index', [
            "users" => UserCrudResource::collection($users),
            "queryParams" => request()->query() ?: null,
            "success" => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);

        // Create the new user
        $user = User::create($data);

        // return to_route('user.index')
        //     ->with('success', 'User was created');

        // Check if the creator of the new account has a verified email
        if ($request->user()->hasVerifiedEmail()) {
            // Send an email verification notification to the new user
            $user->sendEmailVerificationNotification();

            return to_route('user.index')
                ->with('success', 'User was created and verification email sent');
        } else {
            return to_route('user.index')
                ->with('error', 'You must have a verified email to create new users');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $data = $request->validated();
        $name = $user->name;
        $password = $user['password'] ?? null;

        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return to_route('user.index')
            ->with('success', "User $name was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;

        $user->delete();

        return to_route('user.index')
            ->with('success', "User $name was deleted");
    }
}
