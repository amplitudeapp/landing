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
      aria-label={`Offre limitée : ${promo.label} avec le code ${promo.code}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-2 text-center sm:px-6">
        <span className="text-[13px] font-semibold tracking-tight sm:text-sm">
          {promo.label}
        </span>
        <span className="hidden text-[13px] opacity-70 sm:inline">·</span>
        <span className="text-[13px] sm:text-sm">
          Code{" "}
          <span className="rounded bg-bg/10 px-1.5 py-0.5 font-semibold tracking-wide">
            {promo.code}
          </span>
        </span>
        <span className="hidden text-[13px] opacity-70 sm:inline">·</span>
        <span className="text-[13px] font-medium opacity-80 sm:text-sm">
          plus que {formatRemaining(promo.end.getTime() - now.getTime())}
        </span>
      </div>
    </a>
  );
}
