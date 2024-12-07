<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function add()
    {
        return Inertia::render('Products/Add');
    }

    public function updated(Product $product)
    {
        return Inertia::render('Products/Update', [
            'product' => $product
        ]);
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
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'image' => $image,
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'stok' => $request->stok,
        ]);

        return redirect()->route('products.index');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
    }

    public function update(UpdateRequest $request, Product $product)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('products', 'public');
            $product->image = $image;
        }

        $product->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'harga' => $request->harga,
            'stok' => $request->stok,
        ]);

        return redirect()->route('products.index');
    }

    public function show($product)
    {
        $product = Product::findOrFail($product);

        return Inertia::render('Products/Detail', [
            'product' => $product
        ]);
    }
}
