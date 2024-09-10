<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('event_invites', function (Blueprint $table) {
            $table->boolean('lock_plus_one')->default(false)->after('plus_one');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('event_invites', function (Blueprint $table) {
            $table->dropColumn('lock_plus_one');
        });
    }
};
