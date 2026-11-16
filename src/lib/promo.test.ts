import { describe, expect, it } from "vitest";
import { plans } from "./plans";
import { BIRTHDAY_PROMO, getVisiblePlans, isPromoActive } from "./promo";

const at = (iso: string) => new Date(iso);

describe("outside the BIRTHDAY window the pricing is unchanged", () => {
  it.each(["2026-11-15T12:00:00+01:00", "2026-11-23T00:00:00+01:00", "2027-01-10T09:00:00+01:00"])(
    "%s shows both current plans as they are",
    (iso) => {
      expect(getVisiblePlans(plans, at(iso))).toEqual(plans);
    },
  );

  it("keeps today's two plans", () => {
    expect(plans.map((plan) => [plan.id, plan.price, plan.compareAt])).toEqual([
      ["semestriel", "119,40", "149,40"],
      ["mensuel", "24,90", null],
    ]);
  });
});

describe("BIRTHDAY window boundaries, Paris time", () => {
  it.each([
    ["2026-11-16T17:59:59+01:00", false],
    ["2026-11-16T18:00:00+01:00", true],
    ["2026-11-22T23:59:59+01:00", true],
    ["2026-11-23T00:00:00+01:00", false],
  ])("%s → active: %s", (iso, active) => {
    expect(isPromoActive(BIRTHDAY_PROMO, at(iso))).toBe(active);
  });
});

describe("during the BIRTHDAY window", () => {
  const visible = getVisiblePlans(plans, at("2026-11-18T10:00:00+01:00"));

  it("hides the monthly plan", () => {
    expect(visible.map((plan) => plan.id)).toEqual(["semestriel"]);
  });

  it("shows the discounted 6-month price against its own regular price", () => {
    expect(visible[0]).toMatchObject({ price: "78,80", compareAt: "119,40", discount: "-34 %" });
  });

  it("says the discount covers the first 6 months only, then the regular price", () => {
    expect(visible[0].period).toBe("les 6 premiers mois");
    expect(visible[0].note).toContain("puis 119,40 € tous les 6 mois");
  });

  it("prices the offer at 119,40 € minus 34 %, rounded to the cent", () => {
    expect(BIRTHDAY_PROMO.price).toBe((Math.round(11940 * 0.66) / 100).toFixed(2).replace(".", ","));
  });

  it("prefills the code at checkout", () => {
    const url = new URL(visible[0].href);
    expect(url.searchParams.get("prefilled_promo_code")).toBe("BIRTHDAY");
  });
});

describe("the page never mixes the offer and the regular pricing", () => {
  const hours = Array.from({ length: 20 * 24 }, (_, i) => new Date(Date.UTC(2026, 10, 10) + i * 3_600_000));

  it.each(hours.map((date) => [date.toISOString(), date]))("%s", (_, date) => {
    const visible = getVisiblePlans(plans, date as Date);
    const promo = visible.some((plan) => plan.href.includes("prefilled_promo_code"));

    if (isPromoActive(BIRTHDAY_PROMO, date as Date)) {
      expect(visible).toHaveLength(1);
      expect(promo).toBe(true);
    } else {
      expect(visible).toEqual(plans);
      expect(promo).toBe(false);
    }
  });
});
