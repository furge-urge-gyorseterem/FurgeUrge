<?php

namespace App\Http\Controllers;

use App\Models\Kedvencek;
use Illuminate\Http\Request;

class KedvencekController extends Controller
{
    public function store(Request $request)
    {


        $kedvencek = Kedvencek::create([
            'Felhasznalo_Azon' => $request->Felhasznalo_Azon,
            'Etel_Azon' => $request->Etel_Azon,
        ]);

        return response()->json($kedvencek, 201); 
    }
    public function destroy($felhasznaloAzon, $etelAzon)
    {
        $result = Kedvencek::where('Felhasznalo_Azon', $felhasznaloAzon)
            ->where('Etel_Azon', $etelAzon)
            ->delete();

        if ($result) {
            return response()->json(['message' => 'Kedvenc törölve.'], 200);
        } else {
            return response()->json(['message' => 'Kedvenc nem található.'], 404);
        }
    }
    public function showFavorites($felhasznaloAzon)
    {
        $favorites = Kedvencek::where('Felhasznalo_Azon', $felhasznaloAzon)
            ->with('etel') 
            ->get();

        if ($favorites->isEmpty()) {
            return response()->json(['message' => 'Nincsenek kedvenc ételek.'], 404);
        }

        return response()->json($favorites);
    }
}
