<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('Telefonszám')->nullable();
            $table->text('Lakcím')->nullable();
            $table->string('Státusz')->default('vendég');
            $table->foreign('Státusz')->references('FelhasználóStátusz')->on('felhasznalostatuszs'); 
            $table->string('api_token', 60)->nullable(); // specify the length also
            $table->rememberToken();
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
            'api_token' => Str::random(60),
        ]);
        
        DB::table('users')->insert([
            'email' => 'Akosbátya',
            'password' => Hash::make('akimbo'),
            'Telefonszám' => '40324321421',
            'Lakcím' => 'Érd',
            'name' => 'KOSZTI',
            'Státusz' => 'Futár',
            'api_token' => Str::random(60), 
        ]);
        
        DB::table('users')->insert([
            'email' => 'vali',
            'password' => Hash::make('valika'),
            'Telefonszám' => '542143',
            'Lakcím' => 'Eger',
            'name' => 'Vali',
            'Státusz' => 'dolgozó',
            'api_token' => Str::random(60), 
        ]);
        
        DB::table('users')->insert([
            'email' => 'rixi@email.com',
            'password' => Hash::make('asd123'),
            'Telefonszám' => '4541332334',
            'Lakcím' => 'Pest',
            'name' => 'Rixi',
            'Státusz' => 'Admin',
            'api_token' => Str::random(60), 
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
