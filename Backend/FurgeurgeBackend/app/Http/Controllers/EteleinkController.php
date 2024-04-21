<?php

namespace App\Http\Controllers;
use App\Models\Eteleink; 
use App\Models\eteleKategoriak;
use App\Models\Etelkategoriak;
use Illuminate\Http\Request;

class EteleinkController extends Controller
{
    public function index()
    {
        $eteleinks = Eteleink::all(); // Retrieve all records
        return response()->json($eteleinks); // Return the records as JSON
    }
    public function delete($index)
    {
        // Keressük meg a megfelelő modellt az adott ID alapján.
        $item = Eteleink::find($index);
    
        // Ha a modell létezik, töröljük és térjünk vissza valamilyen válasszal.
        if ($item) {
            $item->delete();
            return response()->json(['success' => 'Elem sikeresen törölve.'], 200);
        }
    
        // Ha a modell nem található, térjünk vissza hibaüzenettel.
        return response()->json(['error' => 'Elem nem található.'], 404);
    }
    public function eteleKategoria()
    {
        $kategoriaiEtelek = Etelkategoriak::with(['etelek' => function($query) {
            $query->select('Etelkategoria', 'Elnevezes', 'Ar', 'Etel_Azon');
        }])->orderBy('Azon') // Rendezés az id alapján
        ->get();

        // Az adatok átalakítása, hogy csak a szükséges információt tartalmazzák
        $eredmeny = $kategoriaiEtelek->map(function($kategoria) {
            return [
                'Kategoria' => $kategoria->Kategoria,
                'Etelek' => $kategoria->etelek->map(function($etel) {
                    return [
                        'Elnevezes' => $etel->Elnevezes,
                        'Ar' => $etel->Ar,
                        'Etel_Azon' =>$etel -> Etel_Azon,
                    ];
                }),
            ];
        });

        return response()->json($eredmeny); // Visszatérés a feldolgozott adatokkal
    }
    public function store(Request $request)
{

    $request->validate([
        'Elnevezes' => 'required|string|max:255',
        'Etelkategoria' => 'required|string|max:255',
        'Ar' => 'required|integer',
        'Leírás' => 'required|string|max:255',
    ]);

    $etel = new Eteleink();
    $etel->Elnevezes = $request->Elnevezes;
    $etel->Etelkategoria = $request->Etelkategoria;
    $etel->Ar = $request->Ar;
    $etel->Leírás = $request->Leírás;
    $etel->save();


    return response()->json(['success' => 'Elem sikeresen létrehozva.'], 201);
}

public function update(Request $request, $index)
{
    // Keressük meg a modellt az adott ID alapján.
    $item = Eteleink::find($index);

    // Ha a modell létezik, frissítsük és térjünk vissza valamilyen válasszal.
    if ($item) {
        $item->Elnevezes = $request->Elnevezes ?? $item->Elnevezes;
        $item->Etelkategoria = $request->Etelkategoria ?? $item->Etelkategoria;
        $item->Ar = $request->Ar ?? $item->Ar;
        $item->Leírás = $request->Leírás ?? $item->Leírás;
        $item->save();

        return response()->json(['success' => 'Elem sikeresen frissítve.'], 200);
    }

    // Ha a modell nem található, térjünk vissza hibaüzenettel.
    return response()->json(['error' => 'Elem nem található.'], 404);
}

    }

