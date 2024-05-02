<?php

namespace App\Http\Controllers;
use App\Models\Szallitas;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUserByToken(Request $request)
    {

        $apiToken = $request->query('api_token');
        $user = User::where('api_token', $apiToken)->first();

        if ($user) {
            return response()->json(['user_id' => $user->id]);
        } else {
            return response()->json(['error' => 'Invalid token provided'], 401);
        }
    }
    public function getOrderedFoods($id)
{

    $deliveries = Szallitas::with('megrendeltEtelek.etel')
        ->where('Megrendelő_id', $id)
        ->where('Státusz', 'Kiszállítva')
        ->get();


    $result = $deliveries->map(function ($delivery) {
        return [
            'Rendeles_Azon' => $delivery->Rendeles_Azon,
            'Szallitas_Vege' => $delivery->Szállítás_Vége,
            'Etelek' => $delivery->megrendeltEtelek->map(function ($megrendelt) {
                return [
                    'Etel_Azon' => $megrendelt->etel->Etel_Azon,
                    'Elnevezes' => $megrendelt->etel->Elnevezes,
                    'Mennyiseg' => $megrendelt->mennyiseg,

                ];
            }),
        ];
    });

    return response()->json($result);
}
public function getUserById($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    return response()->json([
        'name' => $user->name,
        'email' => $user->email,
        'status' => $user->Státusz
    ]);
}
public function store(Request $request): JsonResponse
{
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],

    ]);
    
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'phone'=>$request->phone,
        'address'=>$request->address,
        'password' => Hash::make($request->password),
    ]);




    $token=$user->createToken('api-token');

    return response()->json([
        'user' => $user,   
    ]);
}

}
