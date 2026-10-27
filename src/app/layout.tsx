import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karl Almomento | Aspiring Software Developer",
  description: "Explore the personal CV, technical interests, academic background, and FeedSmart capstone project of Karl Almomento, a student at Davao del Norte State College.",
  openGraph: { title: "Karl Almomento | Aspiring Software Developer", description: "Personal CV and academic project portfolio.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
