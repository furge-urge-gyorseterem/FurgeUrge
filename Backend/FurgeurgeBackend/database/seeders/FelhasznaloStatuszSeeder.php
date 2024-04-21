<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FelhasznaloStatuszSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
$statuszok = [
'Vásárló',
'Admin',
'dolgozó',
'futár'
];

foreach ($statuszok as $statusz) {
DB::table('felhasznalostatuszs')->insert([
'FelhasználóStátusz' => $statusz
]);
}
}
}