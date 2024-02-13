<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
$users = [
[

'email' => 'Pelda@email',
'password' => Hash::make('ASD123'),
'Telefonszám' => '41423412',
'Lakcím' => 'Pest',
'name' => 'PéldaGéza',
'Státusz' => 'vásárló'
],
[


'email' => 'rixi',
'password' => Hash::make('a235111'),
'Telefonszám' => '4541332334',
'Lakcím' => 'Pest',
'name' => 'Rixi',
'Státusz' => 'Admin'
],
[

    
'email' => 'vali',
'password' => Hash::make('valika'),
'Telefonszám' => '542143',
'Lakcím' => 'Eger',
'name' => 'Vali',
'Státusz' => 'dolgozó'
],
[

    
'email' => 'Akosbátya',
'password' => Hash::make('akimbo'),
'Telefonszám' => '40324321421', 
'Lakcím' => 'Érd',
'name' => 'KOSZTI',
'Státusz' => 'Futár'
],
];

foreach ($users as $user) {
DB::table('users')->insert($user);
}
}
}