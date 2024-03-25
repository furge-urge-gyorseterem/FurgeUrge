<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kedvencek extends Model
{
    use HasFactory;
    protected $fillable = [
        'Felhasznalo_Azon',
        'Etel_Azon',
    ];
    public function user()
{
    return $this->belongsTo(User::class, 'Felhasznalo_Azon', 'id');
}

public function etel()
{
    return $this->belongsTo(Eteleink::class, 'Etel_Azon', 'Etel_Azon');
}
}
