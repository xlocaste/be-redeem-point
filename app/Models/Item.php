<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = "items";

    protected $fillable = [
        'image',
        'nama',
        'deskripsi',
        'stok',
        'point',
    ];
}
