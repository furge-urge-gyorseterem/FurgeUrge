<?php

namespace App\Http\Controllers;
use App\Models\Szallitas;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserByToken(Request $request)
    {
        // Feltételezzük, hogy a token a query stringben érkezik 'api_token' néven
        $apiToken = $request->query('api_token');
        $user = User::where('api_token', $apiToken)->first();

        if ($user) {
            return response()->json(['user_id' => $user->id]);
        } else {
            return response()->json(['error' => 'Invalid token provided'], 401);
        }
    }
    public function getOrderedFoods($id)
{

    $deliveries = Szallitas::with('megrendeltEtelek.etel')
                           ->where('Megrendelő_id', $id)
                           ->where('Státusz', 'Kiszállítva')
                           ->get();

    // Itt a szállításokhoz hozzárendeljük a megrendelt ételek adatait
    $result = $deliveries->map(function ($delivery) {
        return [
            'Rendeles_Azon' => $delivery->Rendeles_Azon,
            'Szallitas_Vege' => $delivery->Szállítás_Vége,
            'Etelek' => $delivery->megrendeltEtelek->map(function ($megrendelt) {
                return [
                    'Etel_Azon' => $megrendelt->etel->Etel_Azon,
                    'Elnevezes' => $megrendelt->etel->Elnevezes,
                    'Mennyiseg' => $megrendelt->mennyiseg,
                    // További mezők...
                ];
            }),
        ];
    });

    return response()->json($result);
}

}
