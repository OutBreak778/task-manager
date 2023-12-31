import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";
import { ClerkProvider, auth } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Generated by Nikhil Mishra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {userId} = auth()

  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader 
           height={2}
           color="#27AE60"
           easing="cubic-bezier(0.53, 0.21, 0, 1)"
        />
        <ContextProvider>
          <GlobalStyleProvider>
            {userId && <Sidebar />}
            <div className="w-full">{children}</div>
          </GlobalStyleProvider>
        </ContextProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
