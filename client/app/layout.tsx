import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/provider/AuthProvider";
import { ClientToaster } from "@/ui/organisms/ClientToaster";

export const metadata: Metadata = {
  title: "Taskly",
  description: "Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans"
      >
        <AuthProvider>
          {children}
          <ClientToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
