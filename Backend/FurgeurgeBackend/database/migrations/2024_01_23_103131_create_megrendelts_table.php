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
        Schema::create('megrendelt', function (Blueprint $table) {
            $table->id();
            $table->foreignId('Felhasználó_id')->references('Felhasználó_id')->on('users')->onDelete('cascade');
            $table->string('etel');
            $table->string('mennyiseg');
            $table->timestamps();
        
            
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('megrendelts');
    }
};
