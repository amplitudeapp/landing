import { Reveal } from "./Reveal";
import { useNow } from "../hooks/useNow";
import { plans, type Plan } from "../lib/plans";
import { BIRTHDAY_PROMO, getVisiblePlans, isPromoActive } from "../lib/promo";

/** Les deux formules donnent accès à la même chose : une seule liste suffit. */
const includedFeatures = [
  "Application mobile et tablette",
  "Tous les cours à l'unité et le Programme Signature",
  "Une nouvelle vidéo ou un nouveau programme chaque mois",
  "Routines de pré-training et de récupération",
  "Outil de mesure d'angle sur les différentes postures",
  "Statistiques de progression",
  "Calendrier d'entraînement personnalisé",
  "Connexion Apple Santé",
  "Cours guidés",
  "Entraînements indépendants",
  "Onglet conseils",
  "Communauté privée",
];

const trustItems = [
  "7 jours satisfait ou remboursé",
  "Paiement sécurisé",
];

function FeatureList() {
  return (
    <ul className="min-h-0 space-y-2.5">
      {includedFeatures.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-3 text-sm font-medium text-muted-light"
        >
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold"
            aria-hidden
          >
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article className="card-dark relative flex flex-col p-6 sm:p-7 lg:h-full lg:min-h-full">
      <div className="shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label-accent">{plan.brand}</p>
          {plan.discount && (
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-tight text-bg">
              {plan.discount}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight sm:mt-4 sm:text-xl">
          {plan.title}
        </h3>
        {plan.tagline && (
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gold">
            {plan.tagline}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-end gap-x-2 gap-y-1">
          {plan.compareAt && (
            <span className="pb-1 text-2xl font-medium leading-none text-muted-light line-through decoration-gold decoration-2">
              {plan.compareAt} €
            </span>
          )}
          <span className="text-4xl font-semibold leading-none tracking-tighter sm:text-5xl">
            {plan.price}
          </span>
          <span className="pb-1 text-lg font-medium leading-none">€</span>
          <span className="pb-1 text-sm text-muted-light">{plan.period}</span>
        </div>

        <p className="mt-2 text-sm font-medium text-gold">{plan.note}</p>
      </div>

      <div className="mt-6 min-h-0 flex-1">
        <FeatureList />
      </div>

      <a
        href={plan.href}
        className="btn-primary mt-8 w-full"
        rel="noopener noreferrer"
      >
        {plan.cta}
      </a>

      {plan.finePrint && (
        <p className="mt-3 text-center text-xs text-muted">{plan.finePrint}</p>
      )}
    </article>
  );
}

export function Pricing() {
  const now = useNow();
  const visiblePlans = getVisiblePlans(plans, now);
  const promoActive = isPromoActive(BIRTHDAY_PROMO, now);

  return (
    <section id="tarifs" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="section-header">
            <p className="label-accent">Nos formules</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Rejoins la communauté Amplitude
            </h2>
            {promoActive ? (
              <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
                Pour son anniversaire, Mylène t&apos;offre{" "}
                <span className="font-medium text-text">-34 % sur l&apos;abonnement 6 mois</span>,
                jusqu&apos;au 22 novembre à minuit. Le code {BIRTHDAY_PROMO.code} est
                déjà appliqué au paiement.
              </p>
            ) : (
              <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
                Deux formules, le{" "}
                <span className="font-medium text-text">même accès complet</span> à
                la méthode. À toi de choisir ton rythme : six mois pour t&apos;engager
                sur la durée, ou au mois sans engagement.
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
              Application disponible sur{" "}
              <span className="font-medium text-text">iOS</span>
              {" et "}
              <span className="font-medium text-text">Android</span>.
            </p>
          </div>
        </Reveal>

        <div
          className={`mt-12 grid items-start gap-6 px-1 sm:mx-auto lg:mt-16 lg:items-stretch lg:gap-6 ${
            visiblePlans.length > 1 ? "sm:max-w-4xl lg:grid-cols-2" : "sm:max-w-md"
          }`}
        >
          {visiblePlans.map((plan, index) => (
            <div key={plan.id} className="flex min-h-0 flex-col lg:h-full">
              <Reveal delay={120 + index * 80} className="flex h-full flex-1 flex-col">
                <PricingCard plan={plan} />
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 space-y-5 sm:mt-12">
            <p className="text-center text-sm text-muted-light">
              Disponible sur iOS et Android
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-light">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
