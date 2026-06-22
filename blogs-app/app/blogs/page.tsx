import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();

  return (
    <div>
      <h2>Blogs</h2>
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
