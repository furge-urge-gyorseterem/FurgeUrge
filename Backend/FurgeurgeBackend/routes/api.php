<?php
use App\Http\Controllers\EteleinkController;
use App\Http\Controllers\EtelkategoriakController;
use App\Http\Controllers\MegrendeltController;
use App\Http\Controllers\SzallitasController;
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
Route::get('/etelek', [EteleinkController::class, 'eteleKategoria'])->name('etelek.eteleKategoria');
Route::get('/eteleink', [EteleinkController::class, 'index']);
Route::get('/kategoria', [EtelkategoriakController::class, 'kategoria']);
Route::delete('/eteleink/{elnevezes}', [EteleinkController::class, 'delete']);
Route::post('/szallitas/add', [SzallitasController::class, 'addDelivery']);
Route::get('/szallitas/maxazon', [SzallitasController::class, 'getHighestOrderId']);
Route::post('/megrendeltek', [MegrendeltController::class, 'store']);
