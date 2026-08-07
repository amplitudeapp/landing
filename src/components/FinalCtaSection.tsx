import { Reveal } from "./Reveal";

export function FinalCtaSection() {
  return (
    <section
      aria-label="Rejoindre Amplitude"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Prêt(e) à atteindre tous tes objectifs{" "}
            <span className="text-gold">de souplesse et de mobilité ?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
            Six mois ou au mois sans engagement — le même accès complet à la
            méthode, et tu commences aujourd&apos;hui.
          </p>
          <a
            href="#tarifs"
            className="btn-primary mt-8 flex w-full justify-center sm:mt-10 lg:inline-flex lg:w-auto lg:px-10"
          >
            Je rejoins Amplitude
          </a>
        </Reveal>
      </div>
    </section>
  );
}
