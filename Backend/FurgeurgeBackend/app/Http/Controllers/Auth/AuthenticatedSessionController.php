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
            
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}