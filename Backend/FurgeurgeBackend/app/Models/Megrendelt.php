<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Szallitas;

class Megrendelt extends Model
{
    use HasFactory;

    protected $fillable = [
        'Azon',
        'Felhasználó_id',
        'etel', // Javítva a mezőnév "Kaja"-ról "etel"-re
        'mennyiseg', // Hozzáadva, hogy egyezzen a migrációs fájl mezőivel
    ];
    protected static function booted()
    {
        static::created(function ($megrendelt) {
            // Assuming 'Azon' is the order ID you want to use for 'Megrendelés_Azon'
            Szallitas::create([
                'Rendeles_Azon' => $megrendelt->Azon,
                'Szállítás_Kezdete' => now(),
                 'Szállítás_Vége' => null,
                'Szállítás_költség' => 0, // Set your default or calculate based on order
                'Státusz' => 'Készítés folyamatban', // Example status, set according to your application logic
                'Megrendelő_id' => 1,
                 'Futár_id' => 2
            ]);
        });
    }

}
