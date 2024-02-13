<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eteleink extends Model
{
    use HasFactory;
    protected $table = 'eteleink';
    protected $primaryKey = 'Elnevezés';
    protected $fillable = [
        'Elnevezés',
        'Ételkategória',
        'Ár',
    ];
}
