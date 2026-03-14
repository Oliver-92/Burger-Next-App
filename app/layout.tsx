import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BurgerBrand - Sabor Urbano Real",
  description:
    "Carne 100% Angus premium, queso Gouda ahumado y pan brioche horneado hoy. La hamburguesa definitiva ha llegado a la ciudad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${splineSans.variable} font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased selection:bg-primary selection:text-background-dark`}
      >
        {children}
      </body>
    </html>
  );
}
