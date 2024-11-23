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
      <div>
        <h1>Data Pengguna</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button>Edit</button>
                  <button>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default Users;
