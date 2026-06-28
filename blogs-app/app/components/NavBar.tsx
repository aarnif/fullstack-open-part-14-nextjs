"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import Button from "./Button";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <NavLink href="/">home</NavLink>
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users">users</NavLink>
        {session && (
          <>
            <NavLink href="/blogs/new">new blog</NavLink>
            <NavLink href="/me">me</NavLink>
          </>
        )}
      </div>

      {session ? (
        <div className="flex items-center gap-4">
          <em>{session.user?.name} logged in</em>{" "}
          <Button onClick={() => signOut()}>logout</Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/login")}>login</Button>
          <Button onClick={() => router.push("/register")}>register</Button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
