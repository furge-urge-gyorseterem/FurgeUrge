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
    public function updateFutar($rendelesAzon, $futarazon)
    {
      
    
        $szallitas = Szallitas::findOrFail($rendelesAzon);
    
        $szallitas->Futár_id = $futarazon;
        $szallitas->save();
    

        return response()->json([
            'message' => 'Delivery person updated successfully.',
            'szallitas' => $szallitas,
        ]);
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
