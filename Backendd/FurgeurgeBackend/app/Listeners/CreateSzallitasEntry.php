<?php

namespace App\Listeners;

use App\Models\Szallitas;
use App\Events\OrderCreated; // Assuming you have this event

class CreateSzallitasEntry
{   
    
    public function handle(OrderCreated $event)
{
    \Log::info("CreateSzallitasEntry listener handled for Megrendelt: {$event->megrendelt->Azon}");

    // Check if there's already a Szallitas entry for this Azon
    $existingSzallitas = Szallitas::where('Megrendelés_Azon', $event->megrendelt->Azon)->first();

    if (!$existingSzallitas) {
        // Create Szallitas entry
        Szallitas::create([
            'Megrendelés_Azon' => $event->megrendelt->Azon,
            // set other fields as necessary, e.g., 'Szállítás_Kezdete'
        ]);
    }
}
}
