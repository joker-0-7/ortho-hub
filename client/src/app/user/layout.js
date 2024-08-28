import Navbar from "../components/nav/NavBar";
import { UserProvider } from "../context/User";
import UserRouter from "../context/userRouter";

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <UserRouter>
        <nav style={{ zIndex: "999" }}>
          <Navbar />
        </nav>
        {children}
      </UserRouter>
    </UserProvider>
  );
}
