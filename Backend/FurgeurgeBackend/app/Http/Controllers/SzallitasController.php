<?php

namespace App\Http\Controllers;

use App\Models\Megrendelt;
use App\Models\Szallitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SzallitasController extends Controller
{
    public function addDelivery(Request $request)
    {
        // Create and save the Szallitas instance
        $szallitas = new Szallitas([
            'Megrendelő_id' => $request->Megrendelő_id,
            'Futár_id' => $request->Futár_id,
            'Státusz' => 'Készítés Folyamatban', // Default value
            'Szállítás_Kezdete' => now(),
            'Szállítás_költség' => $request->Szállítás_költség,
        ]);
        $szallitas->save();
        error_log('Generated Szallitas ID: '.$szallitas->Rendeles_Azon);

       

        // Return a response including information about both Szallitas and Megrendelt operations
        return response()->json([
            'message' => 'Delivery and order added successfully!',
            'szallitasData' => $szallitas,
        ], 201);
    }
    
    public function getHighestOrderId()
    {
        $maxRendelesAzon = Szallitas::max('Rendeles_Azon');

        // Válasz visszaküldése az azonosítóval
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
    $eteleinks = Szallitas::all(); // Retrieve all records
    return response()->json($eteleinks); // Return the records as JSON
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
            'megrendelo_user.id as MegrendelőID', // Megrendelő azonosítója
            'megrendelo_user.name as MegrendelőNév', // Megrendelő neve
            'futar_user.id as FutárID', // Futár azonosítója
            'futar_user.name as FutárNév' // Futár neve
        )
        ->get();

    return response()->json($eredmeny);
}

    public function updateStatus($id, $statusz)
    {
        // Ellenőrizzük, hogy a megadott státusz létezik-e a rendeles_statuszs táblában
        $statusExists = DB::table('rendeles_statuszs')->where('RendelésStátusz', $statusz)->exists();

        if (!$statusExists) {
            return response()->json(['error' => 'Érvénytelen státusz.'], 404);
        }

        // Keresés az adott ID-jú szállításra
        $szallitas = Szallitas::findOrFail($id);
        $szallitas->Státusz = $statusz;
        $szallitas->save();

        return response()->json(['message' => 'Szállítási státusz sikeresen frissítve.']);
    }
}
