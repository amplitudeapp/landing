// Payment Links Stripe. Les deux sont des abonnements récurrents (6 mois et
// 1 mois) : jamais de paiement unique, que le back-end lirait comme un accès à
// vie. Ils redirigent vers /payment-success, d'où part la création du mot de passe.
const STRIPE_LINK_SEMESTRIEL = "https://buy.stripe.com/14A7sM04EgX7dGs8aN2cg0a";
const STRIPE_LINK_MENSUEL = "https://buy.stripe.com/7sYfZi7x6fT30TG3Ux2cg09";

export interface Plan {
  id: "semestriel" | "mensuel";
  brand: string;
  title: string;
  price: string;
  period: string;
  compareAt: string | null;
  discount: string | null;
  note: string;
  /** Mention discrète sous la carte, pour ce qui doit être dit sans être vendu. */
  finePrint: string | null;
  cta: string;
  href: string;
}

// Le prix barré du semestriel est le coût réel de six mois payés au tarif
// mensuel (24,90 × 6 = 149,40), affiché sur cette même page. Ce n'est pas un
// ancien prix : la mention « au tarif mensuel » doit rester visible, sinon la
// réduction devient une annonce de rabais sans prix de référence pratiqué.
export const plans: Plan[] = [
  {
    id: "semestriel",
    brand: "amplitude plus",
    title: "L'abonnement 6 mois",
    price: "119,40",
    period: "tous les 6 mois",
    compareAt: "149,40",
    discount: "-20 %",
    note: "Soit 19,90 € par mois au lieu de 24,90 € au tarif mensuel",
    finePrint: null,
    cta: "Rejoindre Amplitude",
    href: import.meta.env.VITE_STRIPE_LINK_SEMESTRIEL ?? STRIPE_LINK_SEMESTRIEL,
  },
  {
    id: "mensuel",
    brand: "amplitude",
    title: "L'abonnement mensuel",
    price: "24,90",
    period: "par mois",
    compareAt: null,
    discount: null,
    note: "Sans engagement, résiliable à tout moment",
    finePrint: null,
    cta: "Rejoindre Amplitude",
    href: import.meta.env.VITE_STRIPE_LINK_MENSUEL ?? STRIPE_LINK_MENSUEL,
  },
];
