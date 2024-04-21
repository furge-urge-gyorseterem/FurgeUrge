<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SzallitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('szallitas')->insert([
            'Megrendelés_id' => 1, 
            'Szállítás_Kezdete' => now(),
            'Szállítás_Vége' => null,
            'Szállítás_költség' => 2000,
            'Státusz' => 'Folyamatban',
            'Ügyfél' => 1,
            'Futár' => 4, 
        ]);

        DB::table('szallitas')->insert([
            'Megrendelés_id' => 2, 
            'Szállítás_Kezdete' => now(),
            'Szállítás_Vége' => now(),
            'Szállítás_költség' => 1500,
            'Státusz' => 'Teljesítve',
            'Ügyfél' => 1, 
            'Futár' => 4, 
        ]);
    }
}
