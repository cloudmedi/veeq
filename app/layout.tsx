"use client";
import "./css/style.css";

import { Inter, Architects_Daughter } from "next/font/google";

import Banner from "@/components/banner";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let router = usePathname();

  return (
    <html lang={router.split("/")[1]}>
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}
      >
        <Provider store={store}>
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            {children}
            <Banner />
          </div>
          <SpeedInsights />
        </Provider>
      </body>
    </html>
  );
}
