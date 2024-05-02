<?php

namespace App\Http\Controllers;
use App\Models\Etelkategoriak; 
use Illuminate\Http\Request;

class EtelkategoriakController extends Controller
{
    public function kategoria()
    {
        $Kategoriak = Etelkategoriak::orderBy('Azon', 'desc')->get(); 
        return response()->json($Kategoriak); 
    }
}
