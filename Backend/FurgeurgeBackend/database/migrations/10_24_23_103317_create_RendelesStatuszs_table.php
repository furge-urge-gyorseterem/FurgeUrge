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
        Schema::create('RendelesStatusz', function (Blueprint $table) {
            $table->string('RendelésStátusz')->primary();
        });

        DB::table('RendelesStatusz')->insert([
            'RendelésStátusz' => 'Készítés folyamatban', 

        ]);
        DB::table('RendelesStatusz')->insert([
            'RendelésStátusz' => 'Elkészült', 

        ]);
        DB::table('RendelesStatusz')->insert([
            'RendelésStátusz' => 'Futárnál', 

        ]);
        DB::table('RendelesStatusz')->insert([
            'RendelésStátusz' => 'Kiszállítva', 

        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etelstatuszs');
    }
};
