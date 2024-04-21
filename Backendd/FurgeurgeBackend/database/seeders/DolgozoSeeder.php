<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DolgozoSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
DB::table('dolgozok')->insert([
'Dolgozó_id' => 2,
'Belepes' => Carbon::parse('2010-01-05'),
// 'Kilepes' mezőt nullával hagyjuk, mert még a cégnél dolgoznak
]);

DB::table('dolgozok')->insert([
'Dolgozó_id' => 4,
'Belepes' => Carbon::now(),
// 'Kilepes' mezőt nullával hagyjuk, mert még a cégnél dolgoznak
]);


DB::table('dolgozok')->insert([
'Dolgozó_id' => 3,
'Belepes' => Carbon::parse('2015-02-15'),
'Kilepes' => Carbon::parse('2018-10-18'), 
]);
}
}