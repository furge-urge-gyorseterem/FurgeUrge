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
        Schema::create('kedvenceks', function (Blueprint $table) {
           
            $table->foreignId('Felhasznáó')->references('Felhasználó_id')->on('users');
            $table->string('Kedvenc');
            $table->foreign('Kedvenc')->references('Elnevezes')->on('eteleink');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kedvenceks');
    }
};
