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
        Schema::create('munkaidos', function (Blueprint $table) {
            $table->foreignId('Dolgozó_id')->references('Dolgozó_id')->on('dolgozok');
            $table->date('Dátum'); 
            $table->time('Becsekk'); 
            $table->time('Kicsekk')->nullable();
            $table->timestamps();
        });
        DB::table('munkaidos')->insert([
            [
                'Dolgozó_id' => 2,
                'Dátum' => '2024-02-28',
                'Becsekk' => '08:00:00',
                'Kicsekk' => '16:00:00',
            ],
            [
                'Dolgozó_id' => 4,
                'Dátum' => '2024-02-28',
                'Becsekk' => '09:00:00',
                'Kicsekk' => '17:00:00',
            ],
            [
                'Dolgozó_id' => 2,
                'Dátum' => '2024-02-29',
                'Becsekk' => '08:00:00',
                'Kicsekk' => '16:00:00',
            ]
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('munkaidos');
    }
};
