import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/services/session";
import { getUsersReadingList } from "@/app/services/users";
import { generateToken } from "@/app/actions/users";
import { markAsRead } from "@/app/actions/blogs";
import Button from "@/app/components/Button";
import BlogItem from "@/app/components/BlogItem";

const MyPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const readingList = await getUsersReadingList(user.id);

  const unreadBlogs = readingList.filter((item) => !item.read);
  const readBlogs = readingList.filter((item) => item.read);

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
      <h2 className="text-2xl font-bold mb-6">Reading List</h2>
      {readingList.length === 0 ? (
        <p className="mt-4 text-slate-700 dark:text-slate-300">
          Your reading list is empty.
        </p>
      ) : (
        <>
          <div>
            <h3 className="text-xl font-bold">Unread ({unreadBlogs.length})</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {unreadBlogs.map((item) => {
                const blog = item.blog;
                return (
                  <BlogItem key={blog.id} blog={blog}>
                    <form
                      action={markAsRead}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <input type="hidden" name="id" value={blog.id} />
                      <Button type="submit">Mark as Read</Button>
                    </form>
                  </BlogItem>
                );
              })}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold">Read ({readBlogs.length})</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {readBlogs.map((item) => {
                const blog = item.blog;
                return <BlogItem key={blog.id} blog={blog} />;
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPage;
