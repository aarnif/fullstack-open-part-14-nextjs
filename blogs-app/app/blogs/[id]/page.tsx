import { notFound } from "next/navigation";
import { getBlogById, isBlogInUsersReadingList } from "@/app/services/blogs";
import { likeBlog, addToReadingList } from "@/app/actions/blogs";
import Button from "@/app/components/Button";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const isInReadingList = await isBlogInUsersReadingList(blog.id);

  return (
    <div data-testid="blog-detail">
      <h2 className="text-2xl font-bold mb-4">Blog</h2>
      <h3 className="text-xl font-bold mb-1" data-testid="blog-title">
        {blog.title}
      </h3>
      <p className="mb-3">
        By <em data-testid="blog-author">{blog.author}</em> — {blog.likes}{" "}
        {blog.likes === 1 ? "like" : "likes"}
      </p>
      <p className="mb-3">
        <a href={blog.url} className="text-blue-400 hover:text-blue-500">
          {blog.url}
        </a>
      </p>
      <div className="flex gap-4 items-center">
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <Button type="submit">Like</Button>
        </form>
        {isInReadingList ? (
          <p className="text-green-600 dark:text-green-400">
            This blog is in your reading list.
          </p>
        ) : (
          <form action={addToReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <Button type="submit" data-testid="add-to-reading-list-button">
              Add to Reading List
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
