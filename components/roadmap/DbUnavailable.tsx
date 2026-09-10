// Shown instead of crashing when the roadmap tool's database isn't
// reachable/configured yet (e.g. DATABASE_URL not set in this environment).
export function DbUnavailable() {
  return (
    <p className="rounded-md border border-dashed border-border-warm bg-paper p-8 text-center text-sm text-stone">
      The roadmap tool isn&apos;t set up yet in this environment — its database hasn&apos;t been configured. Everything
      else in the dashboard is unaffected.
    </p>
  );
}
