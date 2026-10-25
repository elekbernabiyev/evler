import Hero from "@/components/Hero";
import Listings from "@/components/Listings";
export const metadata = { title: "Kirayə – Evler" };
export default function Page() {
  return (<><Hero title="Kirayə əmlaklar" subtitle="Gündəlik və aylıq kirayə üçün ən yaxşı təkliflər." /><Listings deal="Kirayə" /></>);
}
