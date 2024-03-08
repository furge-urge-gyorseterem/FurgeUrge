<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DolgozoController extends Controller
{
    public function index(){


       return DB::table('dolgozok')
      ->join('users as u','dolgozok.Dolgozó_id','=','u.Felhasználó_id')
       ->get();
        
    }
}
