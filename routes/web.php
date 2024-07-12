<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContratoController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/works', function () {
//     return Inertia::render('Works');
// })->middleware(['auth', 'verified'])->name('works');

Route::get('/report', function () {
    return Inertia::render('Report');
})->middleware(['auth', 'verified'])->name('report');

Route::middleware('auth')->group(function () {

    //Rotas para contratos
    Route::get('/contratos', [ContratoController::class, 'index'])->name('works');

    Route::post('/contratos', [ContratoController::class, 'store'])->name('contrato.store');
    Route::get('/contratos/{id}', [ContratoController::class, 'show'])->name('contrato.show');
    Route::put('/contratos/{id}', [ContratoController::class, 'update'])->name('contrato.update');
    Route::delete('/contratos/{id}', [ContratoController::class, 'destroy'])->name('contrato.destroy');

    //Rotas para usuarios
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
