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
        Schema::create('megrendelt', function (Blueprint $table) {
            $table->integer('Azon');
            $table->foreignId('Felhasználó_id')->references('Felhasználó_id')->on('users')->onDelete('cascade');
            $table->string('etel');
            $table->integer('mennyiseg');
            $table->timestamps();
            $table->primary(['Azon', 'etel']);
        });
        DB::table('megrendelt')->insert([
            'Azon' => 1,
            'Felhasználó_id' => 1, 
            'etel' => 'ASD leves',
            'mennyiseg' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('megrendelt')->insert([
            'Azon' => 2,
            'Felhasználó_id' => 2, 
            'etel' => 'Csoki torta',
            'mennyiseg' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('megrendelt')->insert([
            'Azon' => 3,
            'Felhasználó_id' => 1, 
            'etel' => 'Csoki torta',
            'mennyiseg' => 3,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('megrendelt')->insert([
            'Azon' => 3,
            'Felhasználó_id' => 1, 
            'etel' => 'ASD leves',
            'mennyiseg' => 3,
            'created_at' => now(),
            'updated_at' => now(),
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