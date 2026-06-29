import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/app/services/session";
import { getUsersReadingList } from "@/app/services/users";
import { generateToken } from "@/app/actions/users";
import Button from "@/app/components/Button";

const MyPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const readingList = await getUsersReadingList(user.id);

  return (
    <div>
      <div className="border-b border-slate-300 dark:border-slate-700 mb-4 pb-4">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p className="mb-2">
          <span className="font-bold">Name:</span> {user.name}
        </p>
        <p className="mb-4">
          <span className="font-bold">Username:</span> {user.username}
        </p>
      </div>
      <div className="border-b border-slate-300 dark:border-slate-700 mb-6 pb-8">
        <h2 className="text-2xl font-bold pt-2 mb-4">API Token</h2>
        <div className="max-w-120 bg-slate-100 dark:bg-slate-900 p-4 mb-4 rounded">
          <p className="font-medium mb-1">Current token:</p>
          <p className="rounded p-2 break-all bg-slate-200 dark:bg-slate-800">
            {user.token ? user.token : <em>No token generated yet</em>}
          </p>
        </div>
        <Button onClick={generateToken}>Generate New Token</Button>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Reading List</h2>
        {readingList.length === 0 ? (
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            Your reading list is empty.
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {readingList.map((item) => {
              const blog = item.blog;
              return (
                <li
                  key={blog.id}
                  className="rounded dark:even:bg-slate-900 even:bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-200"
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="block p-4 cursor-pointer"
                  >
                    <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
                    <p className="mb-3">
                      By <em>{blog.author}</em> — {blog.likes}{" "}
                      {blog.likes === 1 ? "like" : "likes"}
                    </p>
                    <p>{blog.url}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyPage;
