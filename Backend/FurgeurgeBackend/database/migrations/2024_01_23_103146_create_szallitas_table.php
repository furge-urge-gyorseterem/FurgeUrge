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
            $table->integer("Rendeles_Azon")->primary();
            $table->foreign('Rendeles_Azon')->references('Azon')->on('megrendelts');
            $table->dateTime('Szállítás_Kezdete');
            $table->dateTime('Szállítás_Vége')->nullable();
            $table->integer('Szállítás_költség');
            $table->string('Státusz');
            $table->foreignId('Megrendelő_id')->references('Felhasználó_id')->on('users');
            $table->foreignId('Futár_id')->references('Felhasználó_id')->on('users');
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