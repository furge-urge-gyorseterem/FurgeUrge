<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etelkategoriak extends Model
{
    use HasFactory;
    protected $primaryKey = 'Etelkategoriak';
    protected $fillable = [
        'Etelkategoriak',
    ];
}
