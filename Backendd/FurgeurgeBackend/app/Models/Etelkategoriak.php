<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etelkategoriak extends Model
{
    use HasFactory;
    protected $primaryKey = 'Azon';
    protected $fillable = [
        'Azon',
        'Etelkategoriak',
    ];
    public function etelek()
{
    return $this->hasMany(Eteleink::class, 'Etelkategoria', 'Kategoria');
}
}
