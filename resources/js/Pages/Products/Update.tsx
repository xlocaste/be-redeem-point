import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: string;
  stok: number;
  point: number;
}

interface Props {
  product: Product;
}

const UpdateProduct: React.FC<Props> = ({ product }) => {
  const [formData, setFormData] = useState({
    nama: product.nama,
    deskripsi: product.deskripsi,
    harga: product.harga,
    stok: product.stok,
    point: product.point,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Inertia.put(route('products.update', product.id), formData);
  };

  return (
    <AuthenticatedLayout
            header={
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Products
                    </h2>
                </div>
            }
        >
            <Head title="Produk" />
            <div className="bg-white p-8 m-4 rounded-xl shadow-lg">
                <div className="mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    </div>

                    <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                    <input
                        type="text"
                        id="deskripsi"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    </div>

                    <div>
                    <label htmlFor="harga" className="block text-sm font-medium text-gray-700">Harga</label>
                    <input
                        type="text"
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    </div>

                    <div>
                    <label htmlFor="stok" className="block text-sm font-medium text-gray-700">Stok</label>
                    <input
                        type="number"
                        id="stok"
                        name="stok"
                        value={formData.stok}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    </div>

                    <div>
                    <label htmlFor="point" className="block text-sm font-medium text-gray-700">Pointk</label>
                    <input
                        type="number"
                        id="point"
                        name="point"
                        value={formData.point}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    </div>
                    <PrimaryButton type="submit">Update Produk</PrimaryButton>
                </div>
                </form>
                </div>
            </div>
    </AuthenticatedLayout>
  );
};

export default UpdateProduct;
