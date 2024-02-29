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
        Schema::create('megrendelts', function (Blueprint $table) {
            $table->unsignedBigInteger('Rendeles_Azon');
            $table->foreign('Rendeles_Azon')->references('Rendeles_Azon')->on('szallitas');
            $table->unsignedBigInteger('Etel_Azon'); // Consider changing this to match the type in 'eteleink' if necessary
            $table->foreign('Etel_Azon')->references('Etel_Azon')->on('eteleink');
            $table->integer('mennyiseg');
            $table->timestamps();
            $table->primary(['Rendeles_Azon', 'Etel_Azon']);
        });
        DB::table('megrendelts')->insert([
            ['Rendeles_Azon' => 1, 'Etel_Azon' => 1, 'mennyiseg' => 2],
            ['Rendeles_Azon' => 1, 'Etel_Azon' => 2, 'mennyiseg' => 1],
            ['Rendeles_Azon' => 2, 'Etel_Azon' => 4, 'mennyiseg' => 3],
            ['Rendeles_Azon' => 3, 'Etel_Azon' => 5, 'mennyiseg' => 2],
        ]);

       
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('megrendelts');
    }
};