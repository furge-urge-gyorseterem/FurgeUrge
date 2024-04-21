<?php

namespace App\Http\Controllers;

use App\Models\RendelesStatusz as ModelsRendelesStatusz;
use Illuminate\Http\Request;

class RendelesStatuszController extends Controller
{
    public function index()
    {
        $eteleinks = ModelsRendelesStatusz::all(); // Retrieve all records
        return response()->json($eteleinks); // Return the records as JSON
    }
}