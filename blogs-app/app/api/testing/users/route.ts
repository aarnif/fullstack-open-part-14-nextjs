import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const { username, name, password } = await req.json();

  if (!username || username.length < 4) {
    return NextResponse.json(
      { error: "Username must be at least 4 characters long" },
      { status: 400 },
    );
  }

  if (!password || password.length < 4) {
    return NextResponse.json(
      { error: "Password must be at least 4 characters long" },
      { status: 400 },
    );
  }

  const userExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (userExists) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning({
      username: users.username,
      name: users.name,
    });

  return NextResponse.json({ user: result[0] }, { status: 201 });
};
