import { getUsers } from "@/app/services/users";
import NavLink from "@/app/components/NavLink";

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user.id} className="text-lg font-medium">
            <NavLink href={`/users/${user.username}`}>{user.name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
