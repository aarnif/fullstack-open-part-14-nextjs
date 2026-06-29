import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, readingList } from "@/db/schema";

export const getUsers = async () => db.query.users.findMany();

export const getUserWithBlogs = async (username: string) =>
  db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });

export const getUsersReadingList = async (userId: number) =>
  db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  });
