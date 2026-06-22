import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";

const Blogs = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>Blog</h2>
      <h3>{blog.title}</h3>
      <p>
        By <em>{blog.author}</em> — {blog.likes}{" "}
        {blog.likes === 1 ? "like" : "likes"}
      </p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
    </div>
  );
};

export default Blogs;
