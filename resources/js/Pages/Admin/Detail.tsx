import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface Users {
  id: number;
  name: string;
  email: string;
  point: string;
}

const ItemDetail = ({ user }: { user: Users }) => {
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
            <div className="py-8 px-4">
                <div className="container mx-auto p-8 px-8 bg-white rounded-xl shadow-lg">
                    <div className="md:flex">
                        <div className="md:w-2/3 ml-4 flex items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
                                <p className="text-lg text-gray-700 mb-4">{user.email}</p>
                                <p className="text-lg text-gray-700 mt-2">Point {user.point}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </AuthenticatedLayout>
  );
};

export default ItemDetail;
