import type { Plan } from "./plans";

export interface Promo {
  code: string;
  start: Date;
  end: Date;
  /** Bandeau et carte : tout le texte de l'offre vit ici. */
  label: string;
  title: string;
  discount: string;
  price: string;
  /** La remise Stripe ne s'applique qu'au premier paiement. */
  period: string;
  note: string;
  /**
   * Le prix de renouvellement reste affiché, en petit : le taire sur un
   * abonnement serait une omission trompeuse (C. conso L.121-3), et Stripe
   * l'affiche de toute façon au paiement.
   */
  finePrint: string;
}

/**
 * Anniversaire de Mylène : -34 % sur le semestriel, du lundi 16 novembre 18 h
 * au dimanche 22 à minuit, heure de Paris. Pendant l'offre, le mensuel est
 * retiré pour ne laisser que le 6 mois.
 *
 * Le coupon Stripe ne vaut qu'une fois : 78,80 € les 6 premiers mois, puis
 * 119,40 € à chaque renouvellement. La carte le dit, en petit.
 *
 * Le prix barré devient 119,40 €, le prix normal du semestriel : sans le
 * mensuel à côté, « 149,40 € au tarif mensuel » n'aurait plus de référence
 * affichée sur la page.
 */
export const BIRTHDAY_PROMO: Promo = {
  code: "BIRTHDAY",
  start: new Date("2026-11-16T18:00:00+01:00"),
  end: new Date("2026-11-22T23:59:59+01:00"),
  label: "La plus grosse offre de l'année : -34 % sur 6 mois",
  title: "La plus grosse offre de l'année",
  discount: "-34 %",
  price: "78,80",
  period: "les 6 premiers mois",
  note: "Soit 13,13 € par mois · jusqu'au 22 novembre seulement",
  finePrint: "Puis 119,40 € tous les 6 mois, résiliable avant chaque renouvellement",
};

export function isPromoActive(promo: Promo, now: Date): boolean {
  return now >= promo.start && now <= promo.end;
}

/** Le code est prérempli au paiement : la cliente n'a rien à recopier. */
function withPromoCode(href: string, code: string): string {
  const url = new URL(href);
  url.searchParams.set("prefilled_promo_code", code);
  return url.toString();
}

export function getVisiblePlans(plans: Plan[], now: Date, promo: Promo = BIRTHDAY_PROMO): Plan[] {
  if (!isPromoActive(promo, now)) return plans;

  return plans
    .filter((plan) => plan.id === "semestriel")
    .map((plan) => ({
      ...plan,
      title: promo.title,
      compareAt: plan.price,
      price: promo.price,
      discount: promo.discount,
      period: promo.period,
      note: promo.note,
      finePrint: promo.finePrint,
      href: withPromoCode(plan.href, promo.code),
    }));
}
