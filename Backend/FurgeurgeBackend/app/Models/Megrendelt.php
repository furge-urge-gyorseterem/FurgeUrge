<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Megrendelt extends Model
{
    use HasFactory;
    protected $fillable = [
        'Rendelés_id',
        'Felhasználó_id',
        'Kaja',
    ];
}
