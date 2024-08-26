import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "../context/User";
import { AdminProvider } from "./context/IsAdmin";
import Header from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <AdminProvider>
        <Header />
        {children} <Toaster />
      </AdminProvider>
    </UserProvider>
  );
}
