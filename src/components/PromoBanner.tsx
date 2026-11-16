import { useNow } from "../hooks/useNow";
import { BIRTHDAY_PROMO, isPromoActive, type Promo } from "../lib/promo";

function formatRemaining(ms: number): string {
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms / 3_600_000) % 24);
  const minutes = Math.max(1, Math.floor((ms / 60_000) % 60));
  if (days > 0) return `${days} j ${hours} h`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  return `${minutes} min`;
}

/**
 * Bande promo persistante, visible sur toute la page, renvoyant vers les tarifs.
 *
 * Elle n'existe que pendant l'offre : elle s'allume et s'éteint d'elle-même.
 * Rien à retirer à la main, et aucun risque qu'un « offre terminée » traîne
 * sur le site.
 */
export function PromoBanner({ promo = BIRTHDAY_PROMO }: { promo?: Promo }) {
  const now = useNow(15_000);

  if (!isPromoActive(promo, now)) return null;

  return (
    <a
      href="#tarifs"
      className="block bg-gold text-bg transition-opacity hover:opacity-95"
      aria-label={`${promo.label} ${promo.occasion} : ${promo.discount}, ${promo.price} € au lieu de ${promo.compareAt} €`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2 px-4 py-2 text-center text-[13px] sm:gap-x-2.5 sm:px-6 sm:text-sm">
        <span className="font-bold tracking-tight">
          <span aria-hidden>🎂 </span>
          {promo.label}
        </span>
        <span className="hidden sm:inline">{promo.occasion}</span>
        <span className="opacity-60">·</span>
        <span className="font-bold">{promo.discount}</span>
        <span className="opacity-60">·</span>
        <span className="whitespace-nowrap">
          <span className="font-bold">{promo.price} €</span>{" "}
          <span className="line-through decoration-2 opacity-70">{promo.compareAt} €</span>
        </span>
        <span className="hidden opacity-60 md:inline">·</span>
        <span className="hidden font-medium opacity-80 md:inline">
          plus que {formatRemaining(promo.end.getTime() - now.getTime())}
        </span>
      </div>
    </a>
  );
}
