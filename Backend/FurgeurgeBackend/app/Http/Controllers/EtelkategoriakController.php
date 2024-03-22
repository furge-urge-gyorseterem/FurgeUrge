<?php

namespace App\Http\Controllers;
use App\Models\Etelkategoriak; 
use Illuminate\Http\Request;

class EtelkategoriakController extends Controller
{
    public function kategoria()
    {
        $Kategoriak = Etelkategoriak::orderBy('Azon', 'desc')->get(); // Retrieve all records ordered by 'Azon' in descending order
        return response()->json($Kategoriak); // Return the records as JSON
    }
}
