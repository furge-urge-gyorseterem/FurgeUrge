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
        Schema::create('eteleink', function (Blueprint $table) {
            $table->id('Etel_Azon');
            $table->string('Elnevezes'); 
            $table->string('Etelkategoria');
            $table->foreign('Etelkategoria')->references('Kategoria')->on('etelkategoriaks');
            $table->integer('Ar');
            $table->boolean('Elérhető')->default(true);
            $table->string('Leírás');
            $table->timestamps();
        });
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Szalámis Pizza',
            'Etelkategoria' => 'Pizza',
            'Ar' => 1000,
            'Leírás' =>"Nagyon finom",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Sajtburger',
            'Etelkategoria' => 'Hamburger',
            'Ar' => 1000,
            'Leírás' =>"mekis am",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'pizza tekercs',
            'Etelkategoria' => 'Főétel',
            'Ar' => 1000,
            'Leírás' =>"nem",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Rántott sajt',
            'Etelkategoria' => 'Főétel',
            'Ar' => 1000,
            'Leírás' =>"Igen",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Cigánypecsenye',
            'Etelkategoria' => 'Főétel',
            'Ar' => 1000,
            'Leírás' =>"Igen",
            'created_at' => now(),
            'updated_at' => now(),
        ]);

      
        DB::table('eteleink')->insert([
            'Elnevezes' => 'ASD Leves',
            'Etelkategoria' => 'Leves', 
            'Ar' => 500,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Vörheny Leves',
            'Etelkategoria' => 'Leves', 
            'Ar' => 4500,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('eteleink')->insert([
            'Elnevezes' => 'Csoki torta',
            'Etelkategoria' => 'Desszert', 
            'Ar' => 700,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('eteleink')->insert([
            'Elnevezes' => 'Medo burger',
            'Etelkategoria' => 'Hamburger', 
            'Ar' => 1900,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('eteleink')->insert([
            'Elnevezes' => 'Medoxid pizza',
            'Etelkategoria' => 'Pizza', 
            'Ar' => 2700,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Ricsi pizza',
            'Etelkategoria' => 'Pizza', 
            'Ar' => 1700,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Suli pizza',
            'Etelkategoria' => 'Pizza', 
            'Ar' => 2700,
            'Leírás' =>"Igen", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('eteleink')->insert([
            'Elnevezes' => 'Tyúkhúsleves',
            'Etelkategoria' => 'Leves', 
            'Ar' => 950,
            'Leírás' =>"Ez az étel nemcsak ízletes és tápláló, hanem az otthon melegét is az étterem asztalára varázsolja.", 
            'created_at' => now(),
            'updated_at' => now(),
        ]);
       

        $this->generateRandomData();
    }
    function generateRandomData() {
        $categories = [
            'Leves',
            'Főétel',
            'Hamburger',
            'Pizza',
            'Desszert'
        ];
    
        $foods = [
            'Leves' => [
                ['Név' => 'Gombaleves', 'Ár' => 850],
                ['Név' => 'Zöldségleves', 'Ár' => 750],
                ['Név' => 'Bableves', 'Ár' => 950],
                ['Név' => 'Halászlé', 'Ár' => 1200]
            ],
            'Főétel' => [
                ['Név' => 'Rántott csirke', 'Ár' => 1250],
                ['Név' => 'Lasagne', 'Ár' => 1350],
                ['Név' => 'Gulyás', 'Ár' => 1150],
                ['Név' => 'Sertéssült', 'Ár' => 1450],
                ['Név' => 'Töltött káposzta', 'Ár' => 1100]
            ],
            'Hamburger' => [
                ['Név' => 'Classic Burger', 'Ár' => 1100],
                ['Név' => 'Cheese Burger', 'Ár' => 1200],
                ['Név' => 'Bacon Burger', 'Ár' => 1300],
                ['Név' => 'BBQ Burger', 'Ár' => 1400],
                ['Név' => 'Veggie Burger', 'Ár' => 1150]
            ],
            'Pizza' => [
                ['Név' => 'Margherita', 'Ár' => 900],
                ['Név' => 'Pepperoni', 'Ár' => 1000],
                ['Név' => 'Hawaii', 'Ár' => 1050],
                ['Név' => 'Quattro Stagioni', 'Ár' => 1100],
                ['Név' => 'Veggie', 'Ár' => 950]
            ],
            'Desszert' => [
                ['Név' => 'Cheesecake', 'Ár' => 700],
                ['Név' => 'Brownie', 'Ár' => 650],
                ['Név' => 'Tiramisu', 'Ár' => 750],
                ['Név' => 'Gundel palacsinta', 'Ár' => 800],
                ['Név' => 'Somlói galuska', 'Ár' => 850]
            ]
        ];
    
        foreach ($categories as $category) {
            foreach ($foods[$category] as $food) {
                DB::table('eteleink')->insert([
                    'Elnevezes' => $food['Név'],
                    'Etelkategoria' => $category,
                    'Ar' => $food['Ár'],
                    'Leírás' => 'Igen',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eteleinks');
    }
};
