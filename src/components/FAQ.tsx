import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "En quoi Amplitude est différente des autres applis de souplesse ?",
    a: "La plupart des applis te balancent une bibliothèque de vidéos et te laissent te débrouiller. Amplitude te donne un vrai programme : un objectif, une progression structurée semaine après semaine, et la logique de la muscu appliquée à la souplesse. Tu sais toujours quoi faire ; et tu mesures tes progrès.",
  },
  {
    q: "Faut-il s'entraîner tous les jours ?",
    a: "Non, quelques séances par semaine suffisent. C'est la régularité qui fait gagner des degrés, pas l'acharnement quotidien ; et ça tient dans un planning de sportif déjà bien rempli.",
  },
  {
    q: "Je suis débutant(e) / très raide, est-ce que ça marche ?",
    a: "Oui, c'est 100 % adapté pour toi ! La méthode part de là où tu en es et construit ta souplesse progressivement, sans exercices irréalistes ni risque de blessure. Plus tu es raide aujourd'hui, plus ta marge de progression est grande.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    a: "Les premiers degrés gagnés se voient en quelques semaines chez les élèves réguliers ; et tu les mesures dans l'app. Pas de délai magique : c'est la régularité qui parle. Les avant/après de cette page se jouent sur 2 à 3 mois.",
  },
  {
    q: "Six mois ou au mois, je prends quoi ?",
    a: "Les deux formules donnent exactement le même accès, c'est une question de rythme. Le mensuel à 24,90 € te laisse totalement libre, sans engagement. Le semestriel est à 119,40 € au lieu de 149,40 € si tu payais ces six mois au tarif mensuel : 20 % de moins, soit 19,90 € par mois. Et il te met dans les vraies conditions de progresser, parce que la souplesse se construit sur la durée : un mois ne suffit pas à la transformer.",
  },
  {
    q: "Comment je résilie ?",
    a: "À tout moment, en autonomie : depuis la page « Gérer mon abonnement », tu reçois un lien par email qui t'ouvre ton espace de facturation. Tu y résilies en un clic. Ton accès reste ouvert jusqu'à la fin de la période déjà payée.",
  },
  {
    q: "Et si ça ne me convient pas ?",
    a: "Tu es couvert(e) par la garantie 7 jours satisfait ou remboursé : tu testes la méthode, et si ce n'est pas pour toi, tu te fais rembourser sans avoir à te justifier. Tu ne prends aucun risque.",
  },
  {
    q: "Combien de temps dure une séance ?",
    a: "Compte environ 20 à 45 minutes par séance, plusieurs fois par semaine, selon ton objectif. Assez court pour tenir dans ton emploi du temps, assez dense pour faire progresser ton amplitude.",
  },
  {
    q: "Sur quels appareils, et si je ne renouvelle pas ?",
    a: "Amplitude fonctionne sur iOS (iPhone, iPad) et Android. Ton abonnement se reconduit automatiquement à la fin de chaque période — tous les 6 mois ou tous les mois selon ta formule — et tu peux l'arrêter quand tu veux depuis « Gérer mon abonnement ». Si tu résilies, tu gardes l'accès jusqu'au bout de la période déjà payée.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="section-header">
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Une question, une réponse
            </h2>
            <p className="mt-5 text-sm leading-[1.75] text-muted-light sm:mt-6 sm:text-base">
              Je réponds à toutes tes questions ici, ou sur Instagram{" "}
              <a
                href="https://www.instagram.com/mylene_miletto"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gold transition-opacity hover:opacity-80"
              >
                @mylene_miletto
              </a>
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl space-y-3 sm:mt-12">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={80 + i * 70}>
                <div className="card-dark overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card-hover"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium sm:text-base">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 ${
                        isOpen
                          ? "border-gold/40 bg-gold-subtle text-gold"
                          : "border-border text-muted-light"
                      }`}
                      style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border px-6 pb-5">
                      <p className="pt-4 text-sm leading-[1.75] text-muted-light">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
