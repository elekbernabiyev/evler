import type { Metadata } from "next";
import "./globals.css";
import { ListingsProvider } from "@/lib/store";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Evler – Əmlak elanları: satış və kirayə",
  description: "Xəyalınızdakı evi Evler ilə tapın. Azərbaycanda mənzil, villa, həyət evi və obyekt elanları.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>
        <ListingsProvider>
          <Header />
          <main>{children}</main>
          <footer className="mt-16 bg-navy-900 py-8 text-center text-sm text-slate-300">
            © {new Date().getFullYear()} Evler. Bütün hüquqlar qorunur. · Əlaqə: info@evler.az
          </footer>
        </ListingsProvider>
      </body>
    </html>
  );
}
