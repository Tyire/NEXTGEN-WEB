import { site, waLink } from "@/lib/site";

/**
 * Phones only: the two actions people actually take, pinned within thumb
 * reach. Server-rendered plain anchors — works with no JS. The page body
 * carries `.has-action-bar` so the footer clears it.
 */
export function MobileActionBar() {
  return (
    <div className="action-bar fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="site-pill mx-auto flex max-w-md gap-2 rounded-full p-1.5">
        <a
          href={waLink("Hi NextGen, I'd like to get connected.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost !min-h-[2.75rem] flex-1"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.512 5.26l-.999 3.648 3.65-.957z" />
          </svg>
          WhatsApp
        </a>
        <a href={site.selfcare.onboard} target="_blank" rel="noopener noreferrer" className="btn btn-accent !min-h-[2.75rem] flex-1">
          Check coverage
        </a>
      </div>
    </div>
  );
}
