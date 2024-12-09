<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\Item\StoreRequest;
use App\Http\Requests\Product\Item\UpdateRequest;
use App\Models\Item;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function updated(Item $item)
    {
        return Inertia::render('Products/Items/Update', [
            'item' => $item
        ]);
    }

    public function add()
    {
    return Inertia::render('Products/Items/Add');
    }

    public function index()
    {
        $items = Item::all();

        return Inertia::render('Products/Items/List', [
            'items' => $items
        ]);
    }

    public function store(StoreRequest $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('items', 'public');
        }

        $item = Item::create([
            'image'=>$image,
            'nama'=>$request->nama,
            'deskripsi'=>$request->deskripsi,
            'stok'=>$request->stok,
            'point'=>$request->point,
        ]);

        return redirect()->route('items.index');
    }

    public function show($item)
    {
        $item = Item::findOrFail($item);

        return Inertia::render('Products/Items/Detail', [
            'item' => $item
        ]);
    }

    public function destroy(Item $item)
    {
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();
    }

    public function update(UpdateRequest $request, Item $item)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('items', 'public');
            $item->image = $image;
        }

        $item->update([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'point' => $request->point,
            'stok' => $request->stok,
        ]);

        return redirect()->route('items.index');
    }
}
