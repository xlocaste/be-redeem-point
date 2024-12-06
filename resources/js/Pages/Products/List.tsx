import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';

interface Product {
    id: number;
    image: string;
    nama: string;
    deskripsi: string;
    harga: string;
    stok: string;
}

interface ProductsProps {
    products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
    const Delete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          Inertia.delete(`/products/${id}`);
        }
      };
      const Details = (id: number) => {
        Inertia.get(`/products/${id}`);
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <PrimaryButton>
                    <Link href="/products/add">
                        + Tambah Product
                    </Link>
                </PrimaryButton>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                    {products.map((product) => (
                        <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                        >
                        <div className="relative">
                            <img
                            src={`/storage/${product.image}`}
                            alt={product.nama}
                            className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.nama}</h3>
                            <p className="text-sm text-gray-500">{product.deskripsi}</p>
                            <div className="mt-4">
                            <p className="text-gray-700">Harga: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(product.harga))}</p>
                                <p className="text-gray-700">Stok: {product.stok}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => Details(product.id)}
                                    >
                                    View Details
                                </button>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={() => Delete(product.id)}
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Products;
