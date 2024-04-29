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
        $eteleinks = Eteleink::all(); 
        return response()->json($eteleinks); 
    }
    public function delete($index)
    {

        $item = Eteleink::find($index);
    

        if ($item) {
            $item->delete();
            return response()->json(['success' => 'Elem sikeresen törölve.'], 200);
        }
    

        return response()->json(['error' => 'Elem nem található.'], 404);
    }
    public function eteleKategoria()
    {
        $kategoriaiEtelek = Etelkategoriak::with(['etelek' => function($query) {
            $query->select('Etelkategoria', 'Elnevezes', 'Ar', 'Etel_Azon','Leírás');
        }])->orderBy('Azon') 
        ->get();


        $eredmeny = $kategoriaiEtelek->map(function($kategoria) {
            return [
                'Kategoria' => $kategoria->Kategoria,
                'Etelek' => $kategoria->etelek->map(function($etel) {
                    return [
                        'Elnevezes' => $etel->Elnevezes,
                        'Ar' => $etel->Ar,
                        'Etel_Azon' =>$etel -> Etel_Azon,
                        'Leírás' =>$etel->Leírás,
                    ];
                }),
            ];
        });

        return response()->json($eredmeny);
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

    $item = Eteleink::find($index);


    if ($item) {
        $item->Elnevezes = $request->Elnevezes ?? $item->Elnevezes;
        $item->Etelkategoria = $request->Etelkategoria ?? $item->Etelkategoria;
        $item->Ar = $request->Ar ?? $item->Ar;
        $item->Leírás = $request->Leírás ?? $item->Leírás;
        $item->save();

        return response()->json(['success' => 'Elem sikeresen frissítve.'], 200);
    }


    return response()->json(['error' => 'Elem nem található.'], 404);
}

    }

