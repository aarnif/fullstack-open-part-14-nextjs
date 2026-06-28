import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="mb-4">Username: {user.username}</p>
      <h3 className="text-xl font-bold mb-4">Blogs</h3>
      <ul className="flex flex-col gap-2">
        {user.blogs.map((blog) => (
          <li
            key={blog.id}
            className="p-2 rounded dark:even:bg-slate-900 even:bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-200"
          >
            <Link href={`/blogs/${blog.id}`}>
              <p>
                <em>{blog.title}</em> —{" "}
                <span className="font-semibold">{blog.likes}</span>{" "}
                {blog.likes === 1 ? "like" : "likes"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserPage;
