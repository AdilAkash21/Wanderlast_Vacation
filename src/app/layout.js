import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ThemeToggle from "@/components/shared/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata = {
  title: "Wanderlast",
  description: "Your gateway to extraordinary travel experiences around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
   
      <body className="min-h-full flex flex-col">
        
           <Navbar />
        {children}
        <Footer />
        <ThemeToggle />
        </body>
    </html>
  );
}
