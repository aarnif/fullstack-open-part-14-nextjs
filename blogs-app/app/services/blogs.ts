import { ilike, desc, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

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
) => await db.insert(blogs).values({ title, author, url, likes });

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
