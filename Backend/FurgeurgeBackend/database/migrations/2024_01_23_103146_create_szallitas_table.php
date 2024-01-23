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
           // $table->foreignId('Megrendelés_id')->constrained()->onDelete('cascade');
            $table->dateTime('Szállítás_Kezdete');
            $table->dateTime('Szállítás_Vége')->nullable();
            $table->decimal('Szállítás_költség', 8, 2);
            $table->string('Státusz');
         //   $table->foreignId('Megrendelő_id')->constrained('users')->onDelete('cascade'); // Feltételezve, hogy van 'users' táblád
           // $table->foreignId('Futár_id')->constrained('futarok')->onDelete('cascade'); // Feltételezve, hogy van 'futarok' táblád
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
