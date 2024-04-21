<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MegrendeleskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('megrendelt')->insert([
            'Felhasználó_id' => 1, 
            'etel' => 'ASD leves',
            'mennyiseg' => '2 db',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('megrendelt')->insert([
            'Felhasználó_id' => 1, 
            'etel' => 'Csoki torta',
            'mennyiseg' => '3 db',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
