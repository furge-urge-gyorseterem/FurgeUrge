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
        Schema::create('kosars', function (Blueprint $table) {
           
            $table->String('Elnevezes')->references('Elnevezes')->on('eteleink');         
            $table->foreignId('felhasználó_id')->references('felhasználó_id')->on('users');
            $table->integer('Mennyiség');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('kosar', function (Blueprint $table) {
         
        });
    }
};
