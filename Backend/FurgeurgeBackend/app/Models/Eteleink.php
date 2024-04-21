<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eteleink extends Model
{
    use HasFactory;
    protected $table = 'eteleink';
    protected $primaryKey = 'Etel_Azon';
   
    protected $fillable = [
        'Elnevezes',
        'Etel_Azon',
        'Ételkategória',
        'Ár',
        'Elérhető',
        'Leírás'
    ];
    public function kategoria()
{
    return $this->belongsTo(Etelkategoriak::class, 'Etelkategoria', 'Kategoria');
}
}
