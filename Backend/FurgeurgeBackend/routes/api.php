<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DolgozoController;
use App\Http\Controllers\EteleinkController;
use App\Http\Controllers\EtelkategoriakController;
use App\Http\Controllers\KedvencekController;
use App\Http\Controllers\MegrendeltController;

use App\Http\Controllers\RendelesStatuszController;
use App\Http\Controllers\SzallitasController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/registr', [RegisteredUserController::class, 'store'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth', 'throttle:6,1'])
    ->name('verification.send');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');
Route::get('/get-user-by-token/{token}', [UserController::class, 'getUserByToken']);
Route::get('/etelek', [EteleinkController::class, 'eteleKategoria'])->name('etelek.eteleKategoria');
Route::get('/eteleink', [EteleinkController::class, 'index']);
Route::get('/kategoria', [EtelkategoriakController::class, 'kategoria']);
Route::delete('/eteleink/{elnevezes}', [EteleinkController::class, 'delete']);
Route::post('/szallitas/add', [SzallitasController::class, 'addDelivery']);
Route::get('/szallitas/maxazon', [SzallitasController::class, 'getHighestOrderId']);
Route::post('/megrendeltek', [MegrendeltController::class, 'store']);
Route::post('/kedvencek', [KedvencekController::class, 'store']);
Route::delete('/kedvencek/{felhasznaloAzon}/{etelAzon}', [KedvencekController::class, 'destroy']);
Route::get('/kedvencek/{felhasznaloAzon}', [KedvencekController::class, 'showFavorites']);
Route::get('/ordered-foods/{id}', [UserController::class, 'getOrderedFoods']);
Route::get('/orders/status/{userId}', [SzallitasController::class, 'showOrderStatus']);
Route::get('/Workers', [DolgozoController::class, 'index']);

Route::get('undelivered-orders/{id}', [SzallitasController::class, 'showUndeliveredOrderItems']);

Route::patch('/Epatch/{id}',[EteleinkController::class,'update']);
Route::post('/Epost', [EteleinkController::class, 'store']);

Route::get('/rendstats', [RendelesStatuszController::class, 'index']);
Route::get('/szallitas', [SzallitasController::class, 'index']);

Route::patch('/RendelesstatuszModosit/{id}/{statusz}', [SzallitasController::class, 'updateStatus']);
Route::post('/Epost/{etel}', [EteleinkController::class, 'store']);
Route::post('/reg', [UserController::class, 'store']);
Route::get('/SzAdat', [Controller::class, 'getDeliveriesWithTotalItems']);

Route::get('/user/{id}', [UserController::class, 'getUserById']);
Route::get('/COST', [UserController::class, 'getCustomers']);
Route::put('/updateFutar/{rendelesAzon}/{futarazon}', [SzallitasController::class, 'updateFutar']);

Route::put('/usersM/{id}', [UserController::class, 'update']);