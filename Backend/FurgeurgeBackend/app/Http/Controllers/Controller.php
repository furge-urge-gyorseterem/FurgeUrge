<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function getDeliveriesWithTotalItems() {
        $deliveriesWithTotalItems = DB::table('szallitas as s')
            ->join('users as megrendelo_user', 's.Megrendelő_id', '=', 'megrendelo_user.id')
            ->join('users as futar_user', 's.Futár_id', '=', 'futar_user.id')
            ->leftJoin(DB::raw('(
                SELECT 
                    m.Rendeles_Azon,
                    SUM(e.Ar * m.mennyiseg) as Vegosszeg,
                    GROUP_CONCAT(CONCAT(\'{"Etel_Azon":"\', m.Etel_Azon, \'", "Elnevezes":"\', e.Elnevezes, \'", "Ar":\', e.Ar, \', "mennyiseg":\', m.mennyiseg, \'}\') SEPARATOR \',\') as RendeltTetelek
                FROM megrendelts m
                JOIN eteleink e ON m.Etel_Azon = e.Etel_Azon
                GROUP BY m.Rendeles_Azon
            ) as items'), 's.Rendeles_Azon', '=', 'items.Rendeles_Azon')
            ->select(
                's.*',
                'megrendelo_user.name as MegrendelőNév', 
                'futar_user.name as FutárNév',
                'items.Vegosszeg',
                'items.RendeltTetelek'
            )
            ->get();
    
        return $deliveriesWithTotalItems;
    }
    
}
