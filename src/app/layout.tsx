import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryClientProvider from "@/app/QueryClientProvider";
import AuthScreen from "@/components/AuthScreen/AuthScreen";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MFP",
  description: "Advanced order management and tracking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthScreen>
            {/*<Navigation />*/}
            {children}
          </AuthScreen>
        </QueryClientProvider>
      </body>
    </html>
  );
}
