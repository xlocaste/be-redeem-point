import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import PrimaryButton from "@/Components/PrimaryButton";

interface ProductsId {
    id: number
    nama: string
    harga: number
    pivot: {
        quantity: number
    }
}
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
    product: ProductsId[]
    totalPrice: number
}

const UserDetail = ({ user, products, product, totalPrice }: Props) => {
    const checkOut = ( productId: number) => {
        if (productId) {
            Inertia.post(route('admin.product.checkout', { user: user.id }), {
                product_id: productId,
            });
        }
    };
    const addCart = (productId: number) => {
        if (productId) {
            Inertia.post(route('admin.product.store', { user: user.id }), {
                product_id: productId,
            });
        }
    };
    const dropCart = (productId: number) => {
        if (productId) {
          Inertia.post(route("admin.product.checkout", { user: user.id, productId }), {
            product_id: productId,
          });
        }
      };
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
            <div className="bg-white p-8 m-4 rounded-xl shadow-lg">
                <div className="mx-auto">
                    <div className="md:flex">
                        <div className="md:w-1/4 ml-4 flex items-center mr-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                                <p className="text-lg text-gray-700 mb-2">{user.email}</p>
                                <p className="text-lg text-gray-700 mb-2">Point :{user.point}</p>
                                <PrimaryButton className="w-full gap-6" onClick={() => checkOut(user.id)}>
                                    <IoBagCheckOutline />
                                     Checkout
                                </PrimaryButton>
                            </div>
                        </div>
                        <table className="w-full text-left table-auto border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200 text-center">
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.length > 0 ? (
                                    product.map((cart) => (
                                        <tr key={cart.id}  className="border-b border-gray-200 text-center">
                                            <td>{cart.nama}</td>
                                            <td>
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                }).format(Number(cart.harga))}
                                            </td>
                                            <td>{cart.pivot.quantity}</td>
                                            <td>
                                                <button onClick={() => dropCart(cart.id)}>
                                                    <AiFillMinusCircle />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center text-gray-600">
                                            Tidak ada produk yang ditambahkan.
                                        </td>
                                    </tr>
                                )}
                                        <tr className="border-b border-gray-200 text-center">
                                            <td>Total Harga :</td>
                                            <td colSpan={3} className="text-center">
                                            {" "}
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                }).format(totalPrice)}
                                            </td>
                                        </tr>
                            </tbody>
                        </table>
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
                                            <button onClick={() => addCart(product.id)}>
                                            <IoMdAddCircle />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-2 text-center text-gray-600">
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
