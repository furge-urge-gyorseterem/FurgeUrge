<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Exception;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $user = $request->user();
        $valid=true;
    
        if (!$user) {
            return response()->json(['error' => 'A felhasználó nem található vagy nem hitelesített.'], 401);
            $valid=false;
        }
    
        
        $user->tokens()->delete();
        $token = $user->createToken('api-token')->plainTextToken;
    
        return response()->json([
            'user_id' => $user->id,
            'user' => $user,
            'token'=>$token,
            'success'=>$valid,
            'Státusz' => $user->Státusz,
            'name' => $user->name,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
{
    // Assuming you are using Sanctum or similar:
    $request->user()->tokens()->delete(); // This revokes the token

    // For traditional session based auth:
    // Auth::guard('web')->logout();

    return response()->json(['message' => 'Successfully logged out']);
}
}