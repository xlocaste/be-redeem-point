import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const AddItem: React.FC = () => {
    const [nama, setNama] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [point, setPoint] = useState('');
    const [stok, setStok] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('deskripsi', deskripsi);
        formData.append('point', point);
        formData.append('stok', stok);
        if (image) {
            formData.append('image', image);
          } else {
            console.log('Gambar tidak dipilih');
          }

        Inertia.post('/items', formData);
      };

      return (
        <AuthenticatedLayout
                header={
                    <div className="flex gap-4">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Tambah Items
                        </h2>
                    </div>
                }
            >
                <Head title="Items" />
                <div className="py-8 md:py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                    <div className="p-6 text-gray-900">
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
                            <label htmlFor="point" className="block text-sm font-medium text-gray-700">Point</label>
                            <input
                                type="number"
                                id="point"
                                value={point}
                                onChange={(e) => setPoint(e.target.value)}
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
                                required
                            />
                            </div>

                            <div className="mt-6">
                            <PrimaryButton type="submit">Tambah Items</PrimaryButton>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
        </AuthenticatedLayout>
      );
}

export default AddItem;
