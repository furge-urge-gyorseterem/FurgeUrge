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
        Schema::create('felhasznalostatuszs', function (Blueprint $table) {
            $table->string('FelhasználóStátusz')->primary();
        });
        DB::table('felhasznalostatuszs')->insert([
            'FelhasználóStátusz' => 'Vásárló', 
        ]);
        DB::table('felhasznalostatuszs')->insert([
            'FelhasználóStátusz' => 'Admin',
        ]);
        DB::table('felhasznalostatuszs')->insert([
            'FelhasználóStátusz' => 'dolgozó', 
        ]);
        DB::table('felhasznalostatuszs')->insert([
            'FelhasználóStátusz' => 'futár',
        ]);
        



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalostatuszs');
    }
};
