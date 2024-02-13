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
        Schema::create('szallitas', function (Blueprint $table) {
            $table->foreignId('Megrendelés_id')->references('id')->on('megrendelt');
            $table->dateTime('Szállítás_Kezdete');
            $table->dateTime('Szállítás_Vége')->nullable();
            $table->integer('Szállítás_költség');
            $table->string('Státusz');
            $table->foreignId('Ügyfél')->references('Felhasználó_id')->on('users');
            $table->foreignId('Futár')->references('Felhasználó_id')->on('users');
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
