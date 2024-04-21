<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('szallitas', function (Blueprint $table) {
            $table->id("Rendeles_Azon");
            $table->foreignId('Megrendelő_id')->references('id')->on('users');
            $table->foreignId('Futár_id')->references('id')->on('users');
            $table->string('Státusz')->default('Készítés Folyamatban');
            $table->foreign('Státusz')->references('RendelésStátusz')->on('rendeles_statuszs'); 
            $table->dateTime('Szállítás_Kezdete');
            $table->dateTime('Szállítás_Vége')->nullable();
            $table->integer('Szállítás_költség');
            
            $table->timestamps();
        });
        DB::table('szallitas')->insert([
            [
                'Megrendelő_id' => 1, 
                'Futár_id' => 3, 
                'Státusz' => 'Kiszállítva',
                'Szállítás_Kezdete' => Carbon::parse('2024-02-05 17:00'),
                'Szállítás_Vége' => Carbon::parse('2024-02-05 17:30'),
                'Szállítás_költség' => 500, 
            ],
            [
                'Megrendelő_id' => 1, 
                'Futár_id' => 3, 
                'Státusz' => 'Kiszállítva', 
                'Szállítás_Kezdete' => Carbon::parse('2024-02-05 15:00'),
                'Szállítás_Vége' => Carbon::parse('2024-02-05 16:30'),
                'Szállítás_költség' => 700, 
            ],
            [
                'Megrendelő_id' => 4, 
                'Futár_id' => 3, 
                'Státusz' => 'Kiszállítva',
                'Szállítás_Kezdete' => Carbon::parse('2024-02-06 17:00'),
                'Szállítás_Vége' => Carbon::parse('2024-02-06 19:00'),
                'Szállítás_költség' => 500, 
            ],
            [
                'Megrendelő_id' => 4, 
                'Futár_id' => 3, 
                'Státusz' => 'Kiszállítva',
                'Szállítás_Kezdete' => Carbon::parse('2024-02-05 17:00'),
                'Szállítás_Vége' => Carbon::parse('2024-02-05 17:30'),
                'Szállítás_költség' => 500, 
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szallitas');
    }
};