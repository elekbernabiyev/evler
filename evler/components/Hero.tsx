export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 text-white">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-50">✓ Qeydiyyatsız, pulsuz elan yerləşdirin</span>
        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-slate-200 md:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
