import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ভাই ভাই সুপার আইসক্রিম",
  description: "A big factory of ice-cream management system",
};

import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mycustomtheme">
      <body className="antialiased transition-colors duration-300">
        {children}
        <ToastContainer /> {/* toast দেখানোর জন্য */}
      </body>
    </html>
  );
}
