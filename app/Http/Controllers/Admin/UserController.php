<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('product')->get();

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function show($user)
    {
        $user = User::findOrFail($user);

        $products = Product::all();

        return Inertia::render('Admin/Detail', [
            'user' => $user,
            'products' => $products
        ]);
    }
}
