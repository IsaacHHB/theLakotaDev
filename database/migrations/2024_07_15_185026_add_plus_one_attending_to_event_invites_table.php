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
            $table->boolean('plus_one_attending')->default(false)->after('is_attending');
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
            $table->dropColumn('plus_one_attending');
        });
    }
};
