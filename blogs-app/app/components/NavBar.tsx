"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <NavLink href="/">home</NavLink>
      {" | "}
      <NavLink href="/blogs">blogs</NavLink>
      {" | "}
      <NavLink href="/users">users</NavLink>
      {" | "}
      {session ? (
        <>
          <NavLink href="/blogs/new">new blog</NavLink>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <NavLink href="/login">login</NavLink>
          {" | "}
          <NavLink href="/register">register</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
