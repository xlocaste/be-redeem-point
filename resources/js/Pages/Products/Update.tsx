import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';

interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: string;
  stok: string;
  image: string;
}

interface UpdateProductProps {
  product: Product;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
  const [nama, setNama] = useState<string>(product.nama);
  const [deskripsi, setDeskripsi] = useState<string>(product.deskripsi || '');
  const [harga, setHarga] = useState<string>(product.harga);
  const [stok, setStok] = useState<string>(product.stok);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setNama(product.nama);
    setDeskripsi(product.deskripsi || '');
    setHarga(product.harga);
    setStok(product.stok);
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('deskripsi', deskripsi);
    formData.append('harga', harga);
    formData.append('stok', stok);
    if (image) formData.append('image', image);

    Inertia.put(`/products/${product.id}`, formData);
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 mb-6">Edit Produk</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                  <input
                    type="text"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi Produk</label>
                  <textarea
                    id="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
                  <input
                    type="number"
                    id="harga"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="stok" className="block text-sm font-medium text-gray-700">Stok</label>
                  <input
                    type="number"
                    id="stok"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gambar Produk</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    accept="image/*"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-6">
                  <PrimaryButton type="submit">Perbarui Produk</PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
