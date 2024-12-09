import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

interface Item {
    id: number;
    image: string;
    nama: string;
    deskripsi: string;
    point: string;
    stok: string;
}

interface ItemsProps {
    items: Item[];
}

const Items: React.FC<ItemsProps> = ({ items }) => {
    const user = usePage().props.auth.user;
    const Delete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
          Inertia.delete(`/items/${id}`);
        }
      };
      const Details = (id: number) => {
        Inertia.get(`/items/${id}`);
      };
      const Update = (id: number) => {
        Inertia.get(`/items/${id}/updated`);
      };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Items
                    </h2>
                </div>
            }
        >
            <Head title="Item" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {user.role === 'admin' && (
                <PrimaryButton>
                    <Link href={route('items.add')}>
                        + Tambah Items
                    </Link>
                </PrimaryButton>
                )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                    {items.map((Item) => (
                        <div
                        key={Item.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                        >
                        <div className="relative">
                            <img
                            src={`/storage/${Item.image}`}
                            alt={Item.nama}
                            className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{Item.nama}</h3>
                            <p className="text-sm text-gray-500">{Item.deskripsi}</p>
                            <div className="mt-4">
                                <p className="text-gray-700">Point: {Item.point}</p>
                                <p className="text-gray-700">Stok: {Item.stok}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => Details(Item.id)}
                                    >
                                    View Details
                                </button>
                                <div className="flex gap-2">
                                {user.role === 'admin' && (
                                <>
                                    <AiOutlineDelete
                                    className="text-gray-800 hover:underline"
                                    onClick={() => Delete(Item.id)}
                                    />
                                    <FiEdit
                                    className="text-gray-800 hover:underline"
                                    onClick={() => Update(Item.id)}
                                    />
                                </>
                                )}
                                </div>
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

export default Items;
