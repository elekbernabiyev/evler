import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
export const metadata = { title: "Satış – Evler" };
export default function Page() {
  return (<><Hero title="Satılan əmlaklar" subtitle="Mənzil, villa, həyət evi, obyekt və torpaq – hamısı bir yerdə." /><Listings deal="Satış" /></>);
}
