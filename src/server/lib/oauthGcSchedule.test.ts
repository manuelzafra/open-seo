import { expect, it } from "vitest";
import { shouldRunDailyOAuthGc } from "./oauthGcSchedule";

it("runs when no GC has ever run", () => {
  expect(shouldRunDailyOAuthGc(new Date("2026-11-26T03:17:00Z"), null)).toBe(
    true,
  );
});

it("skips later ticks on the same UTC day GC already ran", () => {
  expect(
    shouldRunDailyOAuthGc(new Date("2026-11-26T23:55:00Z"), "2026-11-26"),
  ).toBe(false);
});

it("runs again once the UTC day rolls over", () => {
  expect(
    shouldRunDailyOAuthGc(new Date("2026-11-27T00:05:00Z"), "2026-11-26"),
  ).toBe(true);
});
