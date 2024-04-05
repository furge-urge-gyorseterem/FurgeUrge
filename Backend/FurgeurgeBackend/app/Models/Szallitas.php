<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Szallitas extends Model
{
    use HasFactory;
    protected $primaryKey = 'Rendeles_Azon';
    protected $fillable = [
        'Rendeles_Azon',
        'Megrendelő_id',
        'Futár_id',
        'Státusz',
        'Szállítás_Kezdete',
        'Szállítás_Vége',
        'Szállítás_költség',
       
        
    ];
    public function megrendeltEtelek()
    {
        return $this->hasMany(Megrendelt::class, 'Rendeles_Azon', 'Rendeles_Azon');
    }
  
        
    }
