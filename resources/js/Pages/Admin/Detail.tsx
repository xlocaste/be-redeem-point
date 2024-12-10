import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { IoMdAddCircle } from "react-icons/io";

interface Product {
    id: number
    nama: string
    stok: number
    harga: number
}
interface Users {
  id: number
  name: string
  email: string
  point: number
}

interface Props {
    user: Users
    products: Product[]
}

const UserDetail = ({ user, products }: Props) => {
  return (
    <AuthenticatedLayout
            header={
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Detail User
                    </h2>
                </div>
            }
        >
            <Head title="Produk" />
            <div className="py-8 px-4">
                <div className="container mx-auto p-8 px-8 bg-white rounded-xl shadow-lg">
                    <div className="md:flex">
                        <div className="md:w-2/3 ml-4 flex items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                <p className="text-lg text-gray-700 mb-2">{user.email}</p>
                                <p className="text-lg text-gray-700">Point :{user.point}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">Daftar Produk</h2>
                        <table className="w-full text-left table-auto border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 text-center">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nama Produk</th>
                            <th className="px-4 py-2">Harga</th>
                            <th className="px-4 py-2">Stok</th>
                            <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-200 text-center">
                                        <td className="px-4 py-2">{product.id}</td>
                                        <td className="px-4 py-2">{product.nama}</td>
                                        <td className="px-4 py-2">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(product.harga))}
                                        </td>
                                        <td className="px-4 py-2">{product.stok}</td>
                                        <td className="px-4 py-2">
                                            <button>
                                            <IoMdAddCircle />
                                            </button>
                                        </td>
                                    </tr> 
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-4 py-2 text-center text-gray-600">
                                        Tidak ada produk tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  );
};

export default UserDetail;
