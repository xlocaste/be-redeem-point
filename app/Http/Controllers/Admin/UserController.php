<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\Admin\StoreRequest;
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
        $user = User::with('products')->findOrFail($user);

        $products = Product::all();

        return Inertia::render('Admin/Detail', [
            'user' => $user,
            'products' => $products,
            'product' => $user->products,
        ]);
    }

    public function storeProduct(StoreRequest $request, $user)
    {
        $user = User::findOrFail($user);

        $product = Product::findOrFail($request['product_id']);

        $user->products()->attach($product->id);

        $user->save();
    }

    public function dropProduct(User $user, $productId)
    {
        $user->products()->detach($productId);
    }
}
