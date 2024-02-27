<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Megrendelt;
use App\Models\Szallitas;
use Illuminate\Support\Facades\DB;

class MegrendeltController extends Controller
{
    public function store(Request $request)
    {
        $megrendelt = new Megrendelt();
        $megrendelt->Rendeles_Azon = $request->input('Rendeles_Azon'); // Győződj meg róla, hogy ez az érték létezik a kérésben
        $megrendelt->Etel_Azon = $request->input('Etel_Azon');
        $megrendelt->mennyiseg = $request->input('mennyiseg');
        $megrendelt->save();
    
        return response()->json($megrendelt, 201);
    }
    
}
