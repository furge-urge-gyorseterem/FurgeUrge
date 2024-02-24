<?php
use App\Http\Controllers\EteleinkController;
use App\Http\Controllers\MegrendeltController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/eteleink', [EteleinkController::class, 'index']);
Route::post('/order/create', [MegrendeltController::class, 'createOrder']);
