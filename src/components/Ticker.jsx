import { useState } from "react";
import { partnerGroups } from "../data/news.js";
import { Icon } from "./Icons.jsx";
import { pub } from "../utils/pub.js";

// Все партнёры одной бегущей лентой; направление показываем меткой на карточке
const allPartners = partnerGroups.flatMap((g) =>
  g.items.map((p) => ({ ...p, group: g.title })),
);

export default function Ticker() {
  const list = [...allPartners, ...allPartners];

  return (
    <section
      id="partners"
      className="relative py-12 sm:py-16 bg-brand-deepPurple dark:bg-slate-950 overflow-hidden"
    >
      <div className="orb w-72 h-72 -top-20 left-1/4 bg-brand-purple/40" />
      <div className="orb w-72 h-72 -bottom-20 right-1/4 bg-brand-blue/30" />

      <div className="container-x relative z-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-lilac ring-1 ring-white/15">
          С кем мы сотрудничаем
        </div>
        <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
          Нам доверяют бренды, которые{" "}
          <span className="text-brand-lilac">задают темп рынку</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
          Три направления — <b className="text-white/90">курьеры</b>,{" "}
          <b className="text-white/90">доставка</b> и{" "}
          <b className="text-white/90">Бери Заряд</b>. Сотрудничаем с сервисами
          Яндекса и другими компаниями, список постоянно расширяется — у наших
          исполнителей всегда есть выбор проектов.
        </p>
      </div>

      <div className="relative mt-10 z-10">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-brand-deepPurple dark:from-slate-950 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-brand-deepPurple dark:from-slate-950 to-transparent z-10" />

          <div className="flex w-max animate-marquee">
            {list.map((p, i) => (
              <PartnerCard
                key={i}
                name={p.name}
                note={p.note}
                logo={p.logo}
                group={p.group}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ name, note, logo, group }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="mx-3 sm:mx-4 flex items-center gap-4 rounded-2xl bg-white/95 dark:bg-slate-900 px-5 py-4 sm:px-6 sm:py-5 min-w-[240px] sm:min-w-[280px] shadow-lg shadow-black/10">
      {logo && !imgError ? (
        <img
          src={pub(logo)}
          alt={name}
          width="96"
          height="56"
          className="h-12 sm:h-14 w-20 sm:w-24 object-contain flex-shrink-0"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-brand-gradient flex items-center justify-center text-white font-display font-extrabold text-xl flex-shrink-0">
          {name.charAt(0)}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-[9px] font-bold uppercase tracking-wider text-brand-purple/70 dark:text-brand-lilac/70">
          {group}
        </div>
        <div className="font-display text-base sm:text-lg font-bold text-brand-deepPurple dark:text-white whitespace-nowrap">
          {name}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap overflow-hidden text-ellipsis">
          {note}
        </div>
      </div>
    </div>
  );
}
