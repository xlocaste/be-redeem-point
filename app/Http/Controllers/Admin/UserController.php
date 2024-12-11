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
        $users = User::all();

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function show($user)
    {
        $user = User::with('products')->findOrFail($user);

        $products = Product::all();

        $totalPrice = $user->products->sum(function ($product) {
            return $product->pivot->quantity * $product->harga;
        });

        return Inertia::render('Admin/Detail', [
            'user' => $user,
            'products' => $products,
            'product' => $user->products,
            'totalPrice' => $totalPrice,
        ]);
    }

    public function storeProduct(StoreRequest $request, $user)
    {
        $user = User::findOrFail($user);

        $productId = $request->input('product_id');

        $quantityProduct = $user->products()->where('product_id', $productId)->first();

        if ($quantityProduct) {
            $user->products()->updateExistingPivot($productId, [
                'quantity' => $quantityProduct->pivot->quantity + 1,
            ]);
        } else {
            $user->products()->attach($productId, ['quantity' => 1]);
        }
    }

    public function dropProduct(User $user, $productId)
    {
        $product = $user->products()->where('product_id', $productId)->first();

        if ($product) {
            if ($product->pivot->quantity > 1) {
                $user->products()->updateExistingPivot($productId, [
                    'quantity' => $product->pivot->quantity - 1,
                ]);
            } else {
                $user->products()->detach($productId);
            }
        }
    }
}
