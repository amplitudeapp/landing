import type { Plan } from "./plans";

export interface Promo {
  code: string;
  start: Date;
  end: Date;
  /** Bandeau et carte : tout le texte de l'offre vit ici. */
  label: string;
  discount: string;
  price: string;
  note: string;
}

/**
 * Anniversaire de Mylène : -34 % sur le semestriel, du lundi 16 novembre 18 h
 * au dimanche 22 à minuit, heure de Paris. Pendant l'offre, le mensuel est
 * retiré pour ne laisser que le 6 mois.
 *
 * Le prix barré devient 119,40 €, le prix normal du semestriel : sans le
 * mensuel à côté, « 149,40 € au tarif mensuel » n'aurait plus de référence
 * affichée sur la page.
 */
export const BIRTHDAY_PROMO: Promo = {
  code: "BIRTHDAY",
  start: new Date("2026-11-16T18:00:00+01:00"),
  end: new Date("2026-11-22T23:59:59+01:00"),
  label: "-34 % sur l'abonnement 6 mois",
  discount: "-34 %",
  price: "78,80",
  note: "Soit 13,13 € par mois · offre valable jusqu'au 22 novembre",
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
      compareAt: plan.price,
      price: promo.price,
      discount: promo.discount,
      note: promo.note,
      href: withPromoCode(plan.href, promo.code),
    }));
}
