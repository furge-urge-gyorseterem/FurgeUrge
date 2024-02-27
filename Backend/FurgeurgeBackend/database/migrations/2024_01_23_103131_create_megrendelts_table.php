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
        

       
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('megrendelts');
    }
};