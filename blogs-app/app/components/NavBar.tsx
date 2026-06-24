import Link from "next/link";

const NavBar = () => (
  <nav>
    <Link href="/">home</Link>
    {" | "}
    <Link href="/blogs">blogs</Link>
    {" | "}
    <Link href="/users">users</Link>
    {" | "}
    <Link href="/blogs/new">new blog</Link>
  </nav>
);

export default NavBar;
