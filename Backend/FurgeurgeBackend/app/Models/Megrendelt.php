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
            // Ellenőrizzük, hogy már létezik-e szállítás az adott Azon számhoz
            $szallitasExists = Szallitas::where('Rendeles_Azon', $megrendelt->Azon)->exists();

            if (!$szallitasExists) {
                // Ha nem létezik, akkor létrehozunk egy új szállítást
                Szallitas::create([
                    'Rendeles_Azon' => $megrendelt->Azon,
                    'Szállítás_Kezdete' => now(),
                    'Státusz' => 'Folyamatban',
                    // Itt meg kell adnod az Ügyfél és Futár mezőket is, például:
                    'Ügyfél' => $megrendelt->Felhasználó_id,
                    // A Futár mező értékét az alkalmazás logikájának megfelelően kell kitölteni
                    'Futár' => 1, // Ez egy placeholder, valós alkalmazásban dinamikusan kell meghatározni
                ]);
            }
        });
    }
}
