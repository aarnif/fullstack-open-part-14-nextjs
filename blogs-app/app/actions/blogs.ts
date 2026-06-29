"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addBlog,
  addLikeToBlog,
  addBlogToReadingList,
} from "@/app/services/blogs";
import { auth } from "@/auth";

const errors: Record<string, string> = {};

export const createBlog = async (
  _prevState: { errors: Record<string, string> },
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

  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long";
  }
  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long";
  }
  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { title, author, url, likes } };
  }

  await addBlog(title, author, url, Number(likes));

  revalidatePath("/blogs");
  return {
    success: true,
    errors: {},
    values: { title, author, url, likes },
  };
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

export const addToReadingList = async (formData: FormData) => {
  const id = formData.get("id") as string;
  await addBlogToReadingList(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
