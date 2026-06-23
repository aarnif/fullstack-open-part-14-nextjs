"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikeToBlog } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const likes = formData.get("likes") as string;

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
