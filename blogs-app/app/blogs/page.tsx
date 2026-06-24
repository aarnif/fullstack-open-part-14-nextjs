import Link from "next/link";
import { getBlogs } from "@/app/services/blogs";
import { filterBlogs } from "@/app/actions/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter ?? "");

  return (
    <div>
      <h2>Blogs</h2>
      <form action={filterBlogs}>
        <input
          type="search"
          name="query"
          defaultValue={filter}
          placeholder="Search blogs by title..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              <h3>{blog.title}</h3>
            </Link>
            <p>
              By <em>{blog.author}</em> — {blog.likes}{" "}
              {blog.likes === 1 ? "like" : "likes"}
            </p>
            <p>
              <a href={blog.url}>{blog.url}</a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
