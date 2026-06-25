"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikeToBlog } from "@/app/services/blogs";
import { auth } from "@/auth";

export const createBlog = async (
  _prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const likes = formData.get("likes") as string;

  if (!title || title.length < 5) {
    return { error: "Blog title must be at least 5 characters long" };
  }
  if (!author || author.length < 5) {
    return { error: "Blog author must be at least 5 characters long" };
  }
  if (!url || url.length < 5) {
    return { error: "Blog url must be at least 5 characters long" };
  }

  await addBlog(title, author, url, Number(likes));

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await addLikeToBlog(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const filterBlogs = async (formData: FormData) => {
  const query = formData.get("query") as string;
  revalidatePath("/blogs");
  redirect(query ? `/blogs?filter=${query}` : "/blogs");
};
