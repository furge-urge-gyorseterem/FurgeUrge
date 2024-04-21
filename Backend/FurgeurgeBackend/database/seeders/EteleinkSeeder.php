<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EteleinkSeeder extends Seeder
{
    
    public function run(): void
    {
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
    }

