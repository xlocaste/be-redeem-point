<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ItemController;
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

Route::prefix('/admin')->name('admin.')->group(function() {
    Route::group(['middleware' => ['auth', 'role:admin']], function() {
        Route::get('/users', [UserController::class, 'index'])->name('users');
        Route::get('/{user}', [UserController::class, 'show'])->name('detail');
        Route::post('/{user}/product/store', [UserController::class, 'storeProduct'])->name('product.store');
    });
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
    });
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::get('/', [ProductController::class, 'index'])->name('index');
});

Route::prefix('/items')->name('items.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/add',[ItemController::class, 'add'])->name('add');
        Route::post('/',[ItemController::class, 'store'])->name('store');
        Route::delete('/{item}', [ItemController::class, 'destroy']);
        Route::put('/{item}', [ItemController::class, 'update'])->name('update');
        Route::get('{item}/updated', [ItemController::class, 'updated'])->name('updated');
    });
    Route::get('/{item}', [ItemController::class, 'show']);
    Route::get('/',[ItemController::class, 'index'])->name('index');
});

require __DIR__.'/auth.php';
