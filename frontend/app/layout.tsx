import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"], // Optimize for Latin characters
  weight: ["300", "400", "500", "600", "700"], // Select font weights
  variable: "--font-poppins", // Set a CSS variable
});

export const metadata: Metadata = {
  title: "Books App",
  description: "This is website for books CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
