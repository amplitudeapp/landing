import { useEffect } from "react";

/**
 * Ancienne page d'abonnement autonome. Elle dupliquait le prix et le lien de
 * paiement, et avait fini par afficher un tarif qui n'existait plus.
 * Elle redirige désormais vers la section tarifs, seule source de vérité.
 */
export function SubscribePage() {
  useEffect(() => {
    window.location.replace("/#tarifs");
  }, []);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg px-6">
      <p className="text-sm text-muted-light">
        Redirection vers nos formules…{" "}
        <a href="/#tarifs" className="font-medium text-gold underline">
          Cliquez ici
        </a>{" "}
        si rien ne se passe.
      </p>
    </div>
  );
}
