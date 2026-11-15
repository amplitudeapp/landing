import { CHALLENGE_PROMO_END } from "../lib/launch";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";

const PROMO_CODE = "RENTREE10";

/**
 * Bande promo persistante, visible sur toute la page.
 *
 * L'offre vaut pour elle-même, indépendamment de toute opération marketing :
 * la bande renvoie donc vers les tarifs.
 *
 * Elle disparaît d'elle-même à l'échéance. Rien à retirer à la main, et aucun
 * risque qu'un « offre terminée » traîne sur le site.
 */
export function PromoBanner() {
  const { days, hours, minutes, expired } = useLaunchCountdown(CHALLENGE_PROMO_END);

  if (expired) return null;

  const remaining =
    days > 0 ? `${days} j ${hours} h` : hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;

  return (
    <a
      href="#tarifs"
      className="block bg-gold text-bg transition-opacity hover:opacity-95"
      aria-label={`Offre limitée : -10 % sur l'abonnement 6 mois avec le code ${PROMO_CODE}`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-4 py-2 text-center sm:px-6">
        <span className="text-[13px] font-semibold tracking-tight sm:text-sm">
          -10 % sur l'abonnement 6 mois
        </span>
        <span className="hidden text-[13px] opacity-70 sm:inline">·</span>
        <span className="text-[13px] sm:text-sm">
          Code{" "}
          <span className="rounded bg-bg/10 px-1.5 py-0.5 font-semibold tracking-wide">
            {PROMO_CODE}
          </span>
        </span>
        <span className="hidden text-[13px] opacity-70 sm:inline">·</span>
        <span className="text-[13px] font-medium opacity-80 sm:text-sm">
          plus que {remaining}
        </span>
      </div>
    </a>
  );
}
