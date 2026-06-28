import "./globals.css";
import AuthSessionProvider from "./components/SessionProvider";
import { NotificationProvider } from "./components/NotificationContext";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="min-h-screen m-4">
      <AuthSessionProvider>
        <NotificationProvider>
          <NavBar />
          <Notification />
          {children}
        </NotificationProvider>
      </AuthSessionProvider>
    </body>
  </html>
);

export default RootLayout;
