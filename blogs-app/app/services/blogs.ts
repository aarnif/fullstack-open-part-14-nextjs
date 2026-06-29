import { ilike, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (query: string) =>
  db.query.blogs.findMany({
    where: query ? ilike(blogs.title, `%${query}%`) : undefined,
    orderBy: [desc(blogs.likes)],
  });

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }

  const insertedBlog = await db
    .insert(blogs)
    .values({ title, author, url, likes, userId: user.id })
    .returning({ id: blogs.id });

  await db
    .insert(readingList)
    .values({ userId: user.id, blogId: insertedBlog[0].id });
};

export const getBlogById = async (id: number) =>
  db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });

export const addLikeToBlog = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: sql`${blogs.likes} + 1` })
      .where(eq(blogs.id, id));
  }
};

export const addBlogToReadingList = async (id: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }

  await db.insert(readingList).values({ userId: user.id, blogId: id });
};
