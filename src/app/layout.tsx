import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Sans } from "next/font/google";
import "@/styles.css";
import { AtelierProvider } from "@/lib/atelier";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minhazul Arefin — Portfolio, Research & Visual Work",
  description:
    "Creative technologist working across digital products, interactive systems, research, and visual storytelling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${ibmPlexSans.variable}`}>
      <body>
        <AtelierProvider>{children}</AtelierProvider>
      </body>
    </html>
  );
}
