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
        Schema::create('szallitas', function (Blueprint $table) {
            $table->id("Rendeles_Azon");
            $table->foreignId('Megrendelő_id')->references('Felhasználó_id')->on('users');
            $table->foreignId('Futár_id')->references('Felhasználó_id')->on('users');
            $table->string('Státusz')->default('Készítés Folyamatban');
            $table->foreign('Státusz')->references('RendelésStátusz')->on('RendelesStatusz'); 
            $table->dateTime('Szállítás_Kezdete');
            $table->dateTime('Szállítás_Vége')->nullable();
            $table->integer('Szállítás_költség');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szallitas');
    }
};