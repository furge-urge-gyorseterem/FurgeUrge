
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
        Schema::create('etelkategoriaks', function (Blueprint $table) {
            $table->increments('Azon'); // Azon lesz az elsődleges kulcs és auto-incrementing
            $table->string('Kategoria')->unique(); // Elsődleges kulcsként használjuk
            $table->timestamps(); // Ha szükséges
        });
        
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Leves', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Főétel', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Hamburger', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Pizza', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Desszert', 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('etelkategoriaks')->insert([
            'Kategoria' => 'Törölt', 
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
