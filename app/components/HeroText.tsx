import { Scissors } from "lucide-react";
import Link from "next/link";

export default function HeroText() {
  return (
    <div className="pb-16 text-white w-[95%] mx-auto">

      {/* Eyebrow label */}
      <p className="text-xs tracking-[0.25em] uppercase opacity-60 mb-5 animate-slide-left [animation-delay:0.2s]">
        Seregno · Est. 2018
      </p>

      {/* Main title */}
      <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-bold leading-[0.9] tracking-tight mb-6 animate-fade-up [animation-delay:0.35s]">
        L&apos;arte<br />
        del taglio<br />
        <em className="font-light not-italic opacity-85">perfetto.</em>
      </h1>

      {/* Subtitle */}
      <p className="text-base font-light leading-relaxed opacity-70 mb-10 animate-fade-up [animation-delay:0.55s]">
        Ogni dettaglio conta.<br />Ogni cliente, un&apos;opera d&apos;arte.
      </p>

      {/* CTA buttons row */}
      <div className="flex items-center gap-4 flex-wrap animate-fade-up [animation-delay:0.75s]">

        {/* Primary — Prenota ora: sfondo bianco pieno */}
        <a
          href="https://www.my-booking-app.com/booking/home/qO4wj8s1I6j8FYokIK91eNNQc14BwwiC?iso=it"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group relative inline-flex items-center
            px-8 py-4 rounded-full
            bg-white hover:bg-white/90
            text-sm font-semibold tracking-[0.12em] uppercase text-black
            overflow-hidden min-w-[220px] justify-center
            shadow-[0_4px_24px_rgba(0,0,0,0.3)]
            transition-all duration-300
          "
        >
          {/* Scissors — slide da sinistra a destra all'hover */}
          <span className="
            absolute left-6 text-black
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            opacity-100 translate-x-0
            group-hover:translate-x-40 group-hover:opacity-0
          ">
            <Scissors className="w-5 h-5" strokeWidth={2} />
          </span>

          {/* Label */}
          <span className="
            relative
            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            translate-x-4 group-hover:translate-x-0
          ">Prenota ora</span>
        </a>

        {/* Secondary — Scopri i servizi: bordo bianco + backdrop blur */}
        <Link
          href="/servizi"
          className="
            group relative inline-flex items-center gap-2
            px-8 py-4 rounded-full
            border border-white
            bg-white/10 hover:bg-white/20
            backdrop-blur-sm
            text-sm font-semibold tracking-[0.12em] uppercase
            text-white
            transition-all duration-300
            shadow-[0_4px_24px_rgba(0,0,0,0.2)]
          "
        >
          <span className="relative">Scopri i servizi</span>

          {/* Arrow — scivola a destra all'hover */}
          <span className="
            relative
            transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:translate-x-1
          ">→</span>
        </Link>

      </div>
    </div>
  );
}
