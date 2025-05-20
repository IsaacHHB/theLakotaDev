<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\InviteResponseController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\MusicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Portfolio');
});

Route::get('env-check', function () {
    dd(app()->environment(), env('APP_DEBUG'), env('DB_DATABASE'));
});

Route::get('/health-check', function () {
    return response()->json(['status' => 'healthy'], 200);
});

Route::get('/invite/confirmation', [InviteResponseController::class, 'confirmation'])->name('invite.confirmation');
Route::post('/invite/send-invite', [InviteResponseController::class, 'sendInvite'])->name('invite.sendInvite');
Route::post('/verify-code', [InviteResponseController::class, 'verifyCode'])->name('invite.verifyCode');

Route::resource('invite', InviteResponseController::class)->middleware('check.encrypted:App\Models\EventInvites,invite_code,invite');
Route::resource('music', MusicController::class)->middleware('check.encrypted:App\Models\EventInvites,invite_code,invite');

Route::get('/wedding', [InviteResponseController::class, 'weddingWebsite'])
    ->name('invite.wedding')
    ->middleware('check.encrypted:App\Models\EventInvites,invite_code,invite');

Route::get('/expired', [InviteResponseController::class, 'expired'])
    ->name('invite.expired')
    ->middleware('check.encrypted:App\Models\EventInvites,invite_code,invite');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('event', EventController::class);

    Route::get('/event/{event}/send-invite-emails', [EventController::class, 'sendAllInviteEmails'])
        ->name('events.sendInviteEmails');

    Route::get('/invite/{invite}/send-invite-email', [InviteController::class, 'sendIndividualInviteEmail'])
        ->name('invite.sendInviteEmail');

    

    Route::resource('event-invite', InviteController::class);
    Route::resource('project', ProjectController::class);
    Route::get('/task/my-tasks', [TaskController::class, 'myTasks'])->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class)->middleware('admin');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';