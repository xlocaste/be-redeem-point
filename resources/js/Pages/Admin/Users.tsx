import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface User {
    id: number;
    name: string;
    email: string;
  }

  interface UsersProps {
    users: User[];
  }

  const Users: React.FC<UsersProps> = ({ users }) => {
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
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <table className="w-full">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                <button>Edit</button>
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
