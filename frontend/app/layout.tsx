import type { Metadata } from "next";
import { Permanent_Marker, Indie_Flower } from "next/font/google";
import Navbar from "@/components/NavBar";
import "./globals.css";

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: ["400"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BedHed Matcha",
  description: "Artisanal Matcha Pop-Up • Dallas, TX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${permanentMarker.variable} ${indieFlower.variable} font-sans`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
