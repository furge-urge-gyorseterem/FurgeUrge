<?php

namespace App\Http\Controllers;

use App\Models\RendelesStatusz as ModelsRendelesStatusz;
use Illuminate\Http\Request;

class RendelesStatuszController extends Controller
{
    public function index()
    {
        $eteleinks = ModelsRendelesStatusz::all(); 
        return response()->json($eteleinks); 
    }
}