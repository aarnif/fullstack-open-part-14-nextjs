"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/auth";

const errors: Record<string, string> = {};

export const registerUser = async (
  _prevState: { errors: Record<string, string> },
  formData: FormData,
) => {
  const username = (formData.get("username") as string).trim();
  const name = (formData.get("name") as string).trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("password-confirm") as string;

  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  const userExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (userExists) {
    errors.username = "Username already exists";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async () => {
  const token = crypto.randomUUID();

  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email));

  revalidatePath("/me");
  redirect("/me");
};
