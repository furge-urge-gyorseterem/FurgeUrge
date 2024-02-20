<?php

use Carbon\Carbon;
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
        Schema::create('dolgozok', function (Blueprint $table) {
            $table->foreignId('Dolgozó_id')->references('felhasználó_id')->on('users');
            $table->dateTime('Belepes');
            $table->dateTime('Kilepes')->nullable();
            $table->timestamps();
        });
        DB::table('dolgozok')->insert([
            'Dolgozó_id' => 2,
            'Belepes' => Carbon::parse('2010-01-05'),
            // 'Kilepes' mezőt nullával hagyjuk, mert még a cégnél dolgoznak
            ]);
            
            DB::table('dolgozok')->insert([
            'Dolgozó_id' => 4,
            'Belepes' => Carbon::now(),
            // 'Kilepes' mezőt nullával hagyjuk, mert még a cégnél dolgoznak
            ]);
            
            
            DB::table('dolgozok')->insert([
            'Dolgozó_id' => 3,
            'Belepes' => Carbon::parse('2015-02-15'),
            'Kilepes' => Carbon::parse('2018-10-18'), 
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dolgozos');
    }
};
