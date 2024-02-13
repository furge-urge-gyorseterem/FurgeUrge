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
        Schema::create('eteleink', function (Blueprint $table) {
            $table->string('Elnevezes')->primary(); 
            $table->string('Etelkategoria');
            
            $table->foreign('Etelkategoria')->references('Kategoria')->on('etelkategoriaks');
           
            $table->integer('Ar');
            $table->boolean('Elérhető')->default(true);
            $table->timestamps();
        });
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Bolognai Spagetti',
            'Etelkategoria' => 'Főétel',
            'Ar' => 1000,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

      
        DB::table('eteleink')->insert([
            'Elnevezes' => 'ASD Leves',
            'Etelkategoria' => 'Leves', 
            'Ar' => 500, 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('eteleink')->insert([
            'Elnevezes' => 'Csoki torta',
            'Etelkategoria' => 'Desszert', 
            'Ar' => 700, 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eteleinks');
    }
};
