import Link from "next/link";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">home</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
        </nav>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
