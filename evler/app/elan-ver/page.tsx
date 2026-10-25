import Hero from "@/components/Hero";
import PostForm from "@/components/PostForm";
export const metadata = { title: "Elan ver – Evler" };
export default function Page() {
  return (<><Hero title="Elan ver" subtitle="Qeydiyyat tələb olunmur. Formu doldurun, elanınız dərhal yayımlansın." /><PostForm /></>);
}
