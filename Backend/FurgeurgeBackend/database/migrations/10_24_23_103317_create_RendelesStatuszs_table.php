<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rendeles_statuszs', function (Blueprint $table) {
            $table->string('RendelésStátusz')->primary();
        });

        DB::table('rendeles_statuszs')->insert([
            'RendelésStátusz' => 'Készítés folyamatban', 

        ]);
        DB::table('rendeles_statuszs')->insert([
            'RendelésStátusz' => 'Elkeszult', 

        ]);
        DB::table('rendeles_statuszs')->insert([
            'RendelésStátusz' => 'Futárnál', 

        ]);
        DB::table('rendeles_statuszs')->insert([
            'RendelésStátusz' => 'Kiszállítva', 

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendeles_statuszs');
    }
};
