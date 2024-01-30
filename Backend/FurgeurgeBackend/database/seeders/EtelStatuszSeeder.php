<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtelStatuszSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
$statuszok = [
'készítés folyamatban',
'elkészült',
'futárnál',
'kiszállítva'
];

foreach ($statuszok as $statusz) {
DB::table('etelstatuszs')->insert([
'EtelStatusz' => $statusz
]);
}
}
}