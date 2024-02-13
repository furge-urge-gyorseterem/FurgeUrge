<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Felhasznalostatusz;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       


        $this->call([
           EtelStatuszSeeder::class,
           FelhasznaloStatuszSeeder::class,
            UsersTableSeeder::class,
            DolgozoSeeder::class,
            EtelKategoriaSeeder::class,
            EteleinkSeeder::class,
            MegrendeleskSeeder::class,
            SzallitasSeeder::class,

          
            
        ]);



    }
}
