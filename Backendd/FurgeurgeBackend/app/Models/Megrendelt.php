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
        'Etel_Azon',
        'mennyiseg',
    ];
    public function etel()
    {
        return $this->belongsTo(Eteleink::class, 'Etel_Azon', 'Etel_Azon');
    }
    public function eteleink() {
        return $this->belongsTo(Eteleink::class, 'Etel_Azon');
    }

}
