import Navbar from "../components/nav/NavBar";
import { CsurfProvider } from "../context/Csurf";
import { UserProvider } from "../context/User";
import UserRouter from "../context/userRouter";

export default function RootLayout({ children }) {
  return (
    // <CsurfProvider>
    <UserProvider>
      <UserRouter>
        <nav style={{ zIndex: "999" }}>
          <Navbar />
        </nav>
        {children}
      </UserRouter>
    </UserProvider>
    // </CsurfProvider>
  );
}
