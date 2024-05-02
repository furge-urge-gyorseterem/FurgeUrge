<?php

namespace App\Http\Controllers;

use App\Models\Megrendelt;


use App\Models\Szallitas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SzallitasController extends Controller
{
    public function addDelivery(Request $request)
    {

        $szallitas = new Szallitas([
            'Megrendelő_id' => $request->Megrendelő_id,
            'Futár_id' => $request->Futár_id,
            'Státusz' => 'Készítés Folyamatban', 
            'Szállítás_Kezdete' => now(),
            'Szállítás_költség' => $request->Szállítás_költség,
        ]);
        $szallitas->save();
        error_log('Generated Szallitas ID: ' . $szallitas->Rendeles_Azon);

        return response()->json([
            'message' => 'Delivery and order added successfully!',
            'szallitasData' => $szallitas,
        ], 201);
    }

    public function getHighestOrderId()
    {
        $maxRendelesAzon = Szallitas::max('Rendeles_Azon');

        return response()->json([
            'Rendeles_Azon' => $maxRendelesAzon
        ]);
    }
    public function showOrderStatus($id)
    {
        $orders = Szallitas::where('Megrendelő_id', $id)
            ->where('Státusz', '!=', 'Kiszállítva')
            ->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'Nincsenek nyitott rendelések.'], 404);
        }

        return response()->json($orders);
    }
    public function index()
    {
        $eteleinks = Szallitas::all(); 
        return response()->json($eteleinks);
    }
    public function AdminAdat()
    {
        $eredmeny = DB::table('szallitas')
            ->join('rendeles_statuszs', 'szallitas.Státusz', '=', 'rendeles_statuszs.RendelésStátusz')
            ->join('users as megrendelo_user', 'szallitas.Megrendelő_id', '=', 'megrendelo_user.id')
            ->join('users as futar_user', 'szallitas.Futár_id', '=', 'futar_user.id')
            ->select(
                'szallitas.Rendeles_Azon',
                'szallitas.Státusz',
                'szallitas.Szállítás_Kezdete',
                'szallitas.Szállítás_Vége',
                'szallitas.Szállítás_költség',
                'rendeles_statuszs.RendelésStátusz',
                'megrendelo_user.id as MegrendelőID', 
                'megrendelo_user.name as MegrendelőNév', 
                'futar_user.id as FutárID', 
                'futar_user.name as FutárNév' 
            )
            ->get();

        return response()->json($eredmeny);
    }

    public function updateStatus($id, $statusz)
    {

        $statusExists = DB::table('rendeles_statuszs')->where('RendelésStátusz', $statusz)->exists();

        if (!$statusExists) {
            return response()->json(['error' => 'Érvénytelen státusz.'], 404);
        }

        $szallitas = Szallitas::findOrFail($id);
        $szallitas->Státusz = $statusz;
        $szallitas->save();

        return response()->json(['message' => 'Szállítási státusz sikeresen frissítve.']);
    }
    public function showUndeliveredOrderItems($id)
    {
        $orders = Szallitas::where('Megrendelő_id', $id)
            ->where('Státusz', '!=', 'Kiszállítva')
            ->with('megrendeltEtelek.etel')
            ->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'Nincsenek nyitott rendelések.'], 404);
        }
        $orderDetails = $orders->map(function ($order) {

            return [
                'Rendelés Azon' => $order->Rendeles_Azon,
                'Ételek' => $order->megrendeltEtelek->map(function ($item) {

                    return [
                        'Étel Neve' => $item->etel->Elnevezes, 
                        'Mennyiség' => $item->mennyiseg
                    ];
                })
            ];
        });
    
        return response()->json($orderDetails);
    }
}
