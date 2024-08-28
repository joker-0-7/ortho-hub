import { Cairo } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata = {
  title: "OrthoMCQHub",
  description:
    "OrthoMCQHub is FRCS / EBOT preparation Question bank. OrthoMCQHub is high yield Qbank, course and resource for orthopedics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-all">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
