<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Munkaido extends Model
{
    use HasFactory;
    protected $fillable = [
        'Dolgozó_id',
        'Dátum',
        'Becsekk',
        'Kicsekk',
    ];
}
