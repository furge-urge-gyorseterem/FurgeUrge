<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;



    public function getDeliveryWithTotal() {
        $deliveriesWithTotalItems = DB::table('szallitas as s')
        ->leftJoin(DB::raw('(
            SELECT 
                m.Rendeles_Azon,
                SUM(e.Ar * m.mennyiseg) as Vegosszeg,
                GROUP_CONCAT(CONCAT(\'{"Etel_Azon":"\', m.Etel_Azon, \'", "Elnevezes":"\', e.Elnevezes, \'", "Ar":\', e.Ar, \', "mennyiseg":\', m.mennyiseg, \'}\') SEPARATOR \',\') as RendeltTetelek
            FROM megrendelts m
            JOIN eteleink e ON m.Etel_Azon = e.Etel_Azon
            GROUP BY m.Rendeles_Azon
        ) as items'), function ($join) {
            $join->on('s.Rendeles_Azon', '=', 'items.Rendeles_Azon');
        })
        ->select(
            's.Rendeles_Azon',
            's.Megrendelő_id',
            's.Futár_id',
            's.Státusz',
            's.Szállítás_Kezdete',
            's.Szállítás_Vége',
            's.Szállítás_költség',
            'items.Vegosszeg',
            'items.RendeltTetelek'
        )
        ->get();


    return $deliveriesWithTotalItems;

    }
}
