import { ExamProvider } from "./context";

export default function RootLayout({ children }) {
  return (
    <ExamProvider>
      <div className="min-h-all">{children}</div>
    </ExamProvider>
  );
}
