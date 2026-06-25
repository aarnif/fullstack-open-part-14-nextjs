import NavBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body>
      <AuthSessionProvider>
        <NavBar />
        {children}
      </AuthSessionProvider>
    </body>
  </html>
);

export default RootLayout;
