// src/Pages/ProductDetail.tsx
import { useEffect } from 'react';

interface Product {
  id: number;
  image: string;
  nama: string;
  deskripsi: string;
  harga: string;
  stok: string;
}

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.nama}</h1>
      <div className="flex">
        <div className="w-1/3">
          <img
            src={`/storage/${product.image}`}
            alt={product.nama}
            className="w-full object-cover h-96"
          />
        </div>
        <div className="w-2/3 ml-4">
          <p className="text-lg text-gray-700 mb-4">{product.deskripsi}</p>
          <p className="text-xl text-gray-900 font-semibold">Harga: Rp {product.harga}</p>
          <p className="text-lg text-gray-700 mt-2">Stok: {product.stok}</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
