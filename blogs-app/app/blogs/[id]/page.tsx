import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { likeBlog } from "@/app/actions/blogs";
import Button from "@/app/components/Button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
      <p className="mb-3">
        By <em>{blog.author}</em> — {blog.likes}{" "}
        {blog.likes === 1 ? "like" : "likes"}
      </p>
      <p className="mb-3">
        <a href={blog.url} className="text-blue-400 hover:text-blue-500">
          {blog.url}
        </a>
      </p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <Button type="submit">Like</Button>
      </form>
    </div>
  );
};

export default BlogPage;
