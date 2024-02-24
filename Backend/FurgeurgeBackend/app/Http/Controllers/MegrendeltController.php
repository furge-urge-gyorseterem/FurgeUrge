<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Megrendelt;
class MegrendeltController extends Controller
{
    public function createOrder(Request $request)
    {
        $maxAzon = Megrendelt::max('Azon');

    // If there are no orders yet, start with 1; otherwise, increment the max Azon by 1
    $newAzon = $maxAzon ? $maxAzon + 1 : 1;

    $order = Megrendelt::create([
        'Azon' => $newAzon,
        'Felhasználó_id' => 1, // Assuming you have user authentication
        'etel' => $request->etel,
        'mennyiseg' => $request->mennyiseg, // Use the provided quantity
    ]);

        return response()->json($order, 201); // Return the created order as JSON
    }

}
