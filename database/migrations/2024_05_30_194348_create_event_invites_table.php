<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_invites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->string('invite_code')->unique();
            $table->string('name');
            $table->string('email')->nullable();
            $table->boolean('is_attending')->default(false);
            $table->boolean('plus_one')->default(false);
            $table->string('plus_one_name')->nullable();
            $table->string('food_preference')->nullable();
            $table->string('plus_one_food_preference')->nullable();
            $table->string('dietary_restrictions')->nullable();
            $table->string('plus_one_dietary_restrictions')->nullable();
            $table->string('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_invites');
    }
};
