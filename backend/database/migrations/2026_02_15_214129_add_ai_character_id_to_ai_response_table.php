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
        Schema::table('ai_response', function (Blueprint $table) {
            //
            $table->foreignId('ai_character_id')->nullable()->constrained('ai_charachers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ai_response', function (Blueprint $table) {
            //
            $table->dropForeign(['ai_character_id']);
            $table->dropColumn('ai_character_id');
        });
    }
};
