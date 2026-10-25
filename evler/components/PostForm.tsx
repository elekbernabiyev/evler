"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useListings } from "@/lib/store";
import { DEALS, Deal, FEATURES, LOCATIONS, METROS, PropType, REPAIRS, Repair, TYPES } from "@/lib/types";
import { SEED } from "@/lib/data";

const IMG: Record<string, string> = Object.fromEntries(SEED.map((s) => [s.type, s.image]));

export default function PostForm() {
  const { addListing } = useListings();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const [d, setD] = useState({
    deal: "Satış" as Deal, type: "Bina evi" as PropType, title: "", price: "", city: "Bakı", district: "Nərimanov", metro: "",
    rooms: "2", area: "", floor: "1", totalFloors: "9", repair: "Əla" as Repair, features: [] as string[],
    description: "", image: "", phone: "",
  });
  const s = (k: string, v: string) => setD((p) => ({ ...p, [k]: v, ...(k === "city" ? { district: LOCATIONS[v][0] } : {}) }));
  const toggle = (x: string) => setD((p) => ({ ...p, features: p.features.includes(x) ? p.features.filter((y) => y !== x) : [...p.features, x] }));

  const next = () => {
    if (step === 1 && (!d.title.trim() || !d.price)) return setErr("Başlıq və qiyməti daxil edin.");
    if (step === 2 && !d.area) return setErr("Sahəni daxil edin.");
    setErr(""); setStep(step + 1);
  };
  const submit = () => {
    if (!/^[+\d\s()-]{7,}$/.test(d.phone)) return setErr("Düzgün telefon nömrəsi daxil edin.");
    addListing({
      id: `u${Date.now()}`, title: d.title.trim(), deal: d.deal, type: d.type, price: Number(d.price), city: d.city, district: d.district,
      metro: d.metro || undefined, rooms: Number(d.rooms), area: Number(d.area), floor: Number(d.floor), totalFloors: Number(d.totalFloors),
      repair: d.repair, features: d.features, badges: ["Yeni", ...(d.features.includes("Kupça var") ? ["Kupçalı"] : [])],
      image: d.image.trim() || IMG[d.type], description: d.description, phone: d.phone, createdAt: Date.now(),
    });
    router.push("/");
  };

  const F = (label: string, el: React.ReactNode) => <div><label className="label">{label}</label>{el}</div>;
  const Sel = (k: keyof typeof d, opts: string[]) => (
    <select className="input" value={d[k] as string} onChange={(e) => s(k, e.target.value)}>{opts.map((o) => <option key={o}>{o}</option>)}</select>
  );
  const Inp = (k: keyof typeof d, ph = "", type = "text") => (
    <input type={type} min={0} className="input" placeholder={ph} value={d[k] as string} onChange={(e) => s(k, e.target.value)} />
  );

  return (
    <section className="mx-auto -mt-8 max-w-3xl px-4">
      <div className="relative z-10 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 md:p-8">
        <ol className="mb-6 flex gap-2 text-xs font-bold">
          {["Əsas məlumat", "Detallar", "Əlaqə"].map((t, i) => (
            <li key={t} className={`flex-1 rounded-full py-2 text-center ${step >= i + 1 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"}`}>{i + 1}. {t}</li>
          ))}
        </ol>
        <div className="grid gap-4 sm:grid-cols-2">
          {step === 1 && (<>
            {F("Kateqoriya", Sel("deal", DEALS))}
            {F("Əmlakın növü", Sel("type", TYPES))}
            <div className="sm:col-span-2">{F("Elan başlığı", Inp("title", "məs. Nərimanovda 3 otaqlı mənzil"))}</div>
            {F("Qiymət (AZN)", Inp("price", "0", "number"))}
            {F("Şəhər", Sel("city", Object.keys(LOCATIONS)))}
            {F("Rayon", Sel("district", LOCATIONS[d.city]))}
            {F("Metro stansiyası", (
              <select className="input" value={d.metro} onChange={(e) => s("metro", e.target.value)}>
                <option value="">Yoxdur</option>{METROS.map((m) => <option key={m}>{m}</option>)}
              </select>))}
          </>)}
          {step === 2 && (<>
            {F("Otaq sayı", Sel("rooms", ["1", "2", "3", "4", "5", "6"]))}
            {F("Sahə (m²)", Inp("area", "0", "number"))}
            {F("Mərtəbə", Inp("floor", "", "number"))}
            {F("Binanın mərtəbə sayı", Inp("totalFloors", "", "number"))}
            {F("Təmir vəziyyəti", Sel("repair", REPAIRS))}
            {F("Şəkil linki (istəyə bağlı)", Inp("image", "https://..."))}
            <div className="sm:col-span-2"><span className="label">Əlavə imkanlar</span>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((x) => (
                  <button type="button" key={x} onClick={() => toggle(x)}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium ${d.features.includes(x) ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 text-slate-600"}`}>{x}</button>
                ))}
              </div></div>
          </>)}
          {step === 3 && (<>
            <div className="sm:col-span-2">{F("Əlavə məlumat", (
              <textarea rows={4} className="input" placeholder="Əmlak haqqında qısa məlumat" value={d.description} onChange={(e) => s("description", e.target.value)} />))}</div>
            <div className="sm:col-span-2">{F("Əlaqə nömrəsi", Inp("phone", "+994 50 000 00 00", "tel"))}</div>
          </>)}
        </div>
        {err && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
        <div className="mt-6 flex justify-between">
          {step > 1 ? <button onClick={() => { setErr(""); setStep(step - 1); }} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">← Geri</button> : <span />}
          {step < 3 ? <button onClick={next} className="btn">Davam et →</button> : <button onClick={submit} className="btn">Elanı yerləşdir</button>}
        </div>
      </div>
    </section>
  );
}
