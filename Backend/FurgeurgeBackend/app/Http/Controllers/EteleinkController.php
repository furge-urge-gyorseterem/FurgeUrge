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

}
