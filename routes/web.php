<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['middleware' => ['auth', 'role:admin']], function() {
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
});

Route::group(['middleware' => ['auth']], function() {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
});

Route::prefix('/products')->name('products.')->group(function() {
        Route::group(['middleware' => ['auth', 'role:admin']], function() {
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::get('/add', [ProductController::class, 'add'])->name('products.add');
    });
});

require __DIR__.'/auth.php';
