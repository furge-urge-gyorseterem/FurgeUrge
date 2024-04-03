<?php

namespace App\Http\Controllers;

use App\Models\Megrendelt;
use App\Models\Szallitas;
use Illuminate\Http\Request;

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
}
