<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('Felhasználó_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('Telefonszám')->nullable();
            $table->text('Lakcím')->nullable();
            $table->string('Státusz')->default('vendég');
            $table->foreign('Státusz')->references('FelhasználóStátusz')->on('felhasznalostatuszs'); 
            $table->timestamps();
            $table->softDeletes(); 
        });
        DB::table('users')->insert([
            'email' => 'Pelda@email',
            'password' => Hash::make('ASD123'),
            'Telefonszám' => '41423412',
            'Lakcím' => 'Pest',
            'name' => 'PéldaGéza',
            'Státusz' => 'vásárló',
        ]);
        DB::table('users')->insert([
            'email' => 'Akosbátya',
            'password' => Hash::make('akimbo'),
            'Telefonszám' => '40324321421', 
            'Lakcím' => 'Érd',
            'name' => 'KOSZTI',
            'Státusz' => 'Futár'
        ]);
        DB::table('users')->insert([
            'email' => 'vali',
            'password' => Hash::make('valika'),
            'Telefonszám' => '542143',
            'Lakcím' => 'Eger',
            'name' => 'Vali',
            'Státusz' => 'dolgozó'
        ]);
        DB::table('users')->insert([
            
            
            'email' => 'rixi',
            'password' => Hash::make('a235111'),
            'Telefonszám' => '4541332334',
            'Lakcím' => 'Pest',
            'name' => 'Rixi',
            'Státusz' => 'Admin'
        ]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
