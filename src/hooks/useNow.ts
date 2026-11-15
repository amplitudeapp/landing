import { useEffect, useState } from "react";

/**
 * L'heure courante, rafraîchie régulièrement : une visiteuse déjà sur la page
 * au début d'une offre la voit apparaître sans recharger.
 *
 * En dev uniquement, `?now=2026-11-18T10:00:00+01:00` simule une date pour
 * vérifier l'affichage d'une offre avant qu'elle commence.
 */
function readNow(): Date {
  if (import.meta.env.DEV) {
    const simulated = new URLSearchParams(window.location.search).get("now");
    if (simulated && !Number.isNaN(Date.parse(simulated))) return new Date(simulated);
  }
  return new Date();
}

export function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(readNow);

  useEffect(() => {
    const id = window.setInterval(() => setNow(readNow()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
