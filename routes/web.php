<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Product\ItemController;
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

Route::prefix('/products')->name('products.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::middleware(['role:admin'])->group(function() {
            Route::get('/add', [ProductController::class, 'add'])->name('add');
            Route::post('/', [ProductController::class, 'store'])->name('store');
            Route::delete('/{product}', [ProductController::class, 'destroy']);
            Route::put('/{product}', [ProductController::class, 'update'])->name('update');
            Route::get('{product}/updated', [ProductController::class, 'updated'])->name('updated');
        });

        Route::get('/{product}', [ProductController::class, 'show']);
    });
    Route::get('/', [ProductController::class, 'index'])->name('index');
});

Route::prefix('/items')->name('items.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        
        Route::get('/',[ItemController::class, 'index'])->name('index');
    });
});

require __DIR__.'/auth.php';
