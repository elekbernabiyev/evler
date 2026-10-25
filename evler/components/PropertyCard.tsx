import { Listing } from "@/lib/types";
import { FALLBACK_IMG } from "@/lib/data";

const badgeColor: Record<string, string> = { Yeni: "bg-brand-600", Təcili: "bg-red-600", Kupçalı: "bg-navy-700" };

export default function PropertyCard({ l }: { l: Listing }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.image} alt={l.title} loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          {l.badges.map((b) => (
            <span key={b} className={`rounded-full px-2.5 py-1 text-xs font-bold text-white ${badgeColor[b] ?? "bg-navy-700"}`}>{b}</span>
          ))}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy-800">{l.deal}</span>
      </div>
      <div className="p-4">
        <p className="text-xl font-extrabold text-brand-600">
          {l.price.toLocaleString("az-AZ")} ₼{l.deal === "Kirayə" && <span className="text-sm font-medium text-slate-500"> / ay</span>}
        </p>
        <h3 className="mt-1 line-clamp-2 font-semibold text-navy-800">{l.title}</h3>
        <p className="mt-1 text-sm text-slate-500">📍 {l.city}, {l.district}{l.metro ? ` · m. ${l.metro}` : ""}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-sm text-slate-600">
          <span>{l.type}</span>
          {l.rooms > 0 && <span>{l.rooms} otaq</span>}
          <span>{l.area} m²</span>
          {l.floor > 0 && <span>{l.floor}/{l.totalFloors} mərtəbə</span>}
          <span>Təmir: {l.repair}</span>
        </div>
        <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="mt-3 block rounded-lg bg-navy-50 py-2 text-center text-sm font-semibold text-navy-700 hover:bg-navy-100">
          📞 {l.phone}
        </a>
      </div>
    </article>
  );
}
