import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import { FiEdit } from "react-icons/fi";

interface User {
    id: number;
    name: string;
    email: string;
    point: number;
  }

  interface UsersProps {
    users: User[];
  }

  const Users: React.FC<UsersProps> = ({ users }) => {
    const Details = (id: number) => {
        Inertia.get(`/admin/${id}`);
      };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Data User
                    </h2>
                </div>
            }
        >

            <Head title="Data User" />

            <div className="bg-white p-8 m-4 rounded-xl shadow-lg">
                <div className="mx-auto">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <table className="w-full">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Point</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.point}</td>
                                <td>
                                    <button>
                                    <FiEdit
                                    onClick={() => Details(user.id)}
                                    />
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
      </AuthenticatedLayout>
    );
  };

  export default Users;
