"use client";
import { useMemo, useState } from "react";
import { useListings } from "@/lib/store";
import { DEALS, Deal, FEATURES, LOCATIONS, METROS, REPAIRS, TYPES } from "@/lib/types";
import PropertyCard from "./PropertyCard";

const empty = { deal: "", type: "", city: "", district: "", metro: "", rooms: "", pMin: "", pMax: "", fMin: "", fMax: "", tfMin: "", aMin: "", aMax: "", repair: "", features: [] as string[] };

export default function Listings({ deal }: { deal?: Deal }) {
  const { listings } = useListings();
  const [f, setF] = useState({ ...empty, deal: deal ?? "" });
  const [open, setOpen] = useState(false);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v, ...(k === "city" ? { district: "" } : {}) }));
  const toggle = (x: string) => setF((p) => ({ ...p, features: p.features.includes(x) ? p.features.filter((y) => y !== x) : [...p.features, x] }));
  const n = (s: string) => (s === "" ? null : Number(s));

  const result = useMemo(() => listings.filter((l) => {
    if (deal && l.deal !== deal) return false;
    if (f.deal && l.deal !== f.deal) return false;
    if (f.type && l.type !== f.type) return false;
    if (f.city && l.city !== f.city) return false;
    if (f.district && l.district !== f.district) return false;
    if (f.metro && l.metro !== f.metro) return false;
    if (f.rooms && (f.rooms === "5" ? l.rooms < 5 : l.rooms !== Number(f.rooms))) return false;
    if (f.repair && l.repair !== f.repair) return false;
    const chk = (v: number, a: string, b: string) => (n(a) !== null && v < n(a)!) || (n(b) !== null && v > n(b)!);
    if (chk(l.price, f.pMin, f.pMax) || chk(l.area, f.aMin, f.aMax) || chk(l.floor, f.fMin, f.fMax)) return false;
    if (n(f.tfMin) !== null && l.totalFloors < n(f.tfMin)!) return false;
    if (!f.features.every((x) => l.features.includes(x))) return false;
    return true;
  }).sort((a, b) => b.createdAt - a.createdAt), [listings, f, deal]);

  const Sel = ({ k, label, opts }: { k: keyof typeof empty; label: string; opts: string[] }) => (
    <div><label className="label">{label}</label>
      <select className="input" value={f[k] as string} onChange={(e) => set(k, e.target.value)}>
        <option value="">Hamısı</option>{opts.map((o) => <option key={o}>{o}</option>)}
      </select></div>
  );
  const Range = ({ a, b, label, unit }: { a: keyof typeof empty; b: keyof typeof empty; label: string; unit?: string }) => (
    <div><label className="label">{label}{unit ? ` (${unit})` : ""}</label>
      <div className="flex gap-2">
        <input type="number" min={0} placeholder="Min" className="input" value={f[a] as string} onChange={(e) => set(a, e.target.value)} />
        <input type="number" min={0} placeholder="Maks" className="input" value={f[b] as string} onChange={(e) => set(b, e.target.value)} />
      </div></div>
  );

  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4">
      <div className="relative z-10 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 md:p-6">
        <div className="flex items-center justify-between md:hidden">
          <b className="text-navy-800">Filtrlər</b>
          <button onClick={() => setOpen(!open)} className="text-sm font-semibold text-brand-600">{open ? "Gizlət" : "Göstər"}</button>
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-0">
            {!deal && <Sel k="deal" label="Kateqoriya" opts={DEALS} />}
            <Sel k="type" label="Əmlakın növü" opts={TYPES} />
            <Sel k="city" label="Şəhər" opts={Object.keys(LOCATIONS)} />
            <Sel k="district" label="Rayon" opts={f.city ? LOCATIONS[f.city] : Object.values(LOCATIONS).flat()} />
            <Sel k="metro" label="Metro stansiyası" opts={METROS} />
            <Sel k="rooms" label="Otaq sayı" opts={["1", "2", "3", "4", "5"]} />
            <Range a="pMin" b="pMax" label="Qiymət" unit="AZN" />
            <Range a="aMin" b="aMax" label="Sahə" unit="m²" />
            <Range a="fMin" b="fMax" label="Mərtəbə" />
            <div><label className="label">Binanın mərtəbə sayı (min)</label>
              <input type="number" min={0} className="input" placeholder="məs. 9" value={f.tfMin} onChange={(e) => set("tfMin", e.target.value)} /></div>
            <Sel k="repair" label="Təmir vəziyyəti" opts={REPAIRS} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {FEATURES.map((x) => (
              <button key={x} onClick={() => toggle(x)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${f.features.includes(x) ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-brand-500"}`}>
                {x}
              </button>
            ))}
            <button onClick={() => setF({ ...empty, deal: deal ?? "" })} className="ml-auto text-sm font-semibold text-slate-500 underline">Filtrləri təmizlə</button>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-8 flex items-baseline justify-between">
        <h2 className="text-2xl font-extrabold text-navy-800">{deal ? `${deal} elanları` : "Bütün elanlar"}</h2>
        <span className="text-sm text-slate-500">{result.length} nəticə</span>
      </div>
      {result.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
          Heç bir elan tapılmadı. Filtrləri dəyişdirin.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {result.map((l) => <PropertyCard key={l.id} l={l} />)}
        </div>
      )}
    </section>
  );
}
