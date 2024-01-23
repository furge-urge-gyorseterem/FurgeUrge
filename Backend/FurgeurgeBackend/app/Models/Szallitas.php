<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Szallitas extends Model
{
    use HasFactory;
    protected $fillable = [
        'Megrendelés_id',
        'Szállítás_Kezdete',
        'Szállítás_Vége',
        'Szállítás_költség',
        'Státusz',
        'Megrendelő_id',
        'Futár_id',
    ];
}
