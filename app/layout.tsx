import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Frontend Mentor | Age calculator app",
  description: "Coded by galih Arizza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-chLightGrey bg-opacity-40">
        {children}
        <Footer />
      </body>
    </html>
  );
}
