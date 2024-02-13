<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtelKategoriaSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
$kategoriaNevek = [
'Desszert',
'Főétel',
'Leves',
'Üdítő'
];

foreach ($kategoriaNevek as $kategoria) {
DB::table('etelkategoriaks')->insert([
'Kategoria' => $kategoria
]);
}
}
}