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
        Schema::create('dolgozok', function (Blueprint $table) {
            $table->foreignId('Dolgozó_id')->references('felhasználó_id')->on('users');
            $table->dateTime('Belepes');
            $table->dateTime('Kilepes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dolgozos');
    }
};
