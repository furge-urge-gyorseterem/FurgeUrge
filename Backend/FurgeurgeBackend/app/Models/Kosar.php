<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kosar extends Model
{
    use HasFactory;
    protected $fillable = [
        'Étel',
        'felhasználó_id',
        'Mennyiség',
    ];
}
