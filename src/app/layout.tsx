import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdConversion - Video Ad Creation Dashboard",
  description: "Create and manage your video ads with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Sidebar />
            <Header />
            <main className="min-h-screen pl-60 pt-[60px] bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
              <div className="mx-auto max-w-[1440px] p-6">
                {children}
              </div>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
