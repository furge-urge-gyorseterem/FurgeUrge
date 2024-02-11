<?php

namespace App\Http\Controllers;
use App\Models\Eteleink; 
use Illuminate\Http\Request;

class EteleinkController extends Controller
{
    public function index()
    {
        $eteleinks = Eteleink::all(); // Retrieve all records
        return response()->json($eteleinks); // Return the records as JSON
    }
}
