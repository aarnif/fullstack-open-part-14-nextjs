import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";
import { filterBlogs } from "@/app/actions/blogs";
import Button from "@/app/components/Button";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter ?? "");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form action={filterBlogs} className="max-w-100 flex gap-2">
        <input
          className="grow rounded p-2 dark:bg-slate-800 bg-slate-200 text-slate-700 dark:text-white placeholder:text-slate-500"
          type="search"
          name="query"
          defaultValue={filter}
          placeholder="Search blogs by title..."
        />
        <Button type="submit">Search</Button>
      </form>
      <ul className="mt-4 flex flex-col gap-2">
        {blogs.map((blog) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
