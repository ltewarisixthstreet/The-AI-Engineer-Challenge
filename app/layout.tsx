import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mental Coach Chat",
  description: "Your first vibe-coded LLM app — a supportive mental coach.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  );
}
