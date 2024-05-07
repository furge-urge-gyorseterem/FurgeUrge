<?php

namespace App\Http\Controllers;
use App\Models\Etelkategoriak; 
use Illuminate\Http\Request;

class EtelkategoriakController extends Controller
{
    public function kategoria()
{
    $Kategoriak = Etelkategoriak::where('Kategoria', '!=', 'Törölt')
        ->orderBy('Azon', 'desc')
        ->get();

    return response()->json($Kategoriak);
}
}
