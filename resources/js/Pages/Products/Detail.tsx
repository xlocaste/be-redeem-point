import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

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
                    <div className="md:flex">
                        <div className="md:w-1/3 mb-4">
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.nama}
                                className="w-full object-cover h-96 rounded-xl"
                            />
                        </div>
                        <div className="md:w-2/3 ml-4 flex items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{product.nama}</h1>
                                <p className="text-lg text-gray-700 mb-4">{product.deskripsi}</p>
                                <p className="text-gray-700">Harga: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(product.harga))}</p>
                                <p className="text-lg text-gray-700 mt-2">Stok: {product.stok}</p>
                                <div className="mt-4">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  );
};

export default ProductDetail;
