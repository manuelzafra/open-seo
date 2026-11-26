// Workers Free caps an account at 5 scheduled triggers, so the daily OAuth KV
// GC piggybacks on the 5-minute cron (src/server.ts `scheduled`) instead of
// getting its own. This decides whether a given tick is the first one of a
// new UTC calendar day, based on a last-run-date marker read from OAUTH_KV.
export const OAUTH_GC_LAST_RUN_KV_KEY = "oauth-gc:last-run-date";

export function utcDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function shouldRunDailyOAuthGc(
  now: Date,
  lastRunDate: string | null,
): boolean {
  return lastRunDate !== utcDateString(now);
}
