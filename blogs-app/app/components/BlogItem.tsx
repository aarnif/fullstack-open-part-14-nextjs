import Link from "next/link";

const BlogItem = ({
  blog,
}: {
  blog: {
    id: number;
    title: string;
    author: string;
    likes: number;
    url: string;
    userId: number;
  };
}) => (
  <li className="rounded dark:even:bg-slate-900 even:bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-200">
    <Link href={`/blogs/${blog.id}`} className="block p-4 cursor-pointer">
      <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
      <p className="mb-3">
        By <em>{blog.author}</em> — {blog.likes}{" "}
        {blog.likes === 1 ? "like" : "likes"}
      </p>
      <p>{blog.url}</p>
    </Link>
  </li>
);

export default BlogItem;
