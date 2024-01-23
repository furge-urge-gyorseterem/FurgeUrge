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
        Schema::create('eteleink', function (Blueprint $table) {
            $table->string('Elnevezes')->primary(); 
            $table->string('Etelkategoria');
            $table->foreign('Etelkategoria')->references('Kategoria')->on('etelkategoriaks'); // Idegen kulcsként használjuk
           
            $table->integer('Ar');
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eteleinks');
    }
};
