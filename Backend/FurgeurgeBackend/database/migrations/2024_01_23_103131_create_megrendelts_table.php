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
            //$table->foreignId('Rendelés_id')->constrained()->onDelete('cascade');
           // $table->foreignId('Felhasználó_id')->constrained()->onDelete('cascade');
            $table->string('Kaja');
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
