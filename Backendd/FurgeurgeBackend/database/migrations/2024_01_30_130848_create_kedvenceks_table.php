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
        Schema::create('kedvenceks', function (Blueprint $table) {
           
            $table->foreignId('Felhasznalo_Azon')->references('id')->on('users');
         
            $table->foreignId('Etel_Azon')->references('Etel_Azon')->on('eteleink');
            
            $table->timestamps();
        });
        DB::table('kedvenceks')->insert([
            'Felhasznalo_Azon' => 1,
            'Etel_Azon' => 1
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kedvenceks');
    }
};
