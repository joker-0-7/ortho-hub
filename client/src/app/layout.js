import { Cairo } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata = {
  title: "OrthoMCQHub",
  description:
    "OrthoMCQHub is FRCS / EBOT preparation Question bank. OrthoMCQHub is high yield Qbank, course and resource for orthopedics.",
  keywords: [
    "Ortho",
    "Orthopedic",
    "Question bank",
    "Questionbank",
    "Qbank",
    "FRCS Exams",
    "EBOT Exams",
    "SICOT Diploma",
    "FRCS International",
    "FRCS UK",
    "Exit Exams",
    "JCIE Trauma and Orthopeadics",
    "Orthopedic",
    "Knowledge",
    "Multiple-choice questions",
    "Exams",
    "Learning",
    "Education",
    "Medical",
    "MCQs",
    "Orthopedic journey",
    "Professional development",
    "UKITE Exams",
    "Previous exam Questions FRCS",
    "Previous Exam Question EBOT",
    "Previous Exam Question SICOT diploma",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
      </Head>
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
