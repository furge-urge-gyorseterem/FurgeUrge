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
        Schema::create('etelkategoriaks', function (Blueprint $table) {
            $table->string('Kategoria')->primary(); // Elsődleges kulcsként használjuk
            $table->timestamps(); // Ha szükséges
        });
        DB::table('EtelKategoriaks')->insert([
            'Kategoria' => 'Desszert', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('EtelKategoriaks')->insert([
            'Kategoria' => 'Leves', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('EtelKategoriaks')->insert([
            'Kategoria' => 'Főétel', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('EtelKategoriaks')->insert([
            'Kategoria' => 'Üditő', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etelkategoriaks');
    }
};
