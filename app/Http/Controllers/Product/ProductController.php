<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function add()
    {
        return Inertia::render('Product/Add');
    }

    public function index()
    {
        $daftarProduct = Product::all();

        return Inertia::render('Products/List', [
            'products' => $daftarProduct
        ]);
    }

    public function store(StoreRequest $request)
    {
        $image = $request->file('image')->store('products', 'public');

        $product = Product::create([
            'nama' => $image,
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'stok' => $request->stok,
        ]);

        return Inertia::render('Products/List', [
            'products' => $product
        ]);
    }
}
