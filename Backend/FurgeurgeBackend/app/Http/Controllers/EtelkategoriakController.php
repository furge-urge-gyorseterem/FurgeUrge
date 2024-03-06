<?php

namespace App\Http\Controllers;
use App\Models\Etelkategoriak; 
use Illuminate\Http\Request;

class EtelkategoriakController extends Controller
{
    public function kategoria()
    {
        $Kategoriak = Etelkategoriak::all(); // Retrieve all records
        return response()->json($Kategoriak); // Return the records as JSON
    }
}
