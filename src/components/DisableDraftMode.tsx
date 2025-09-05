"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Only run in the browser; detect if we're inside an iframe or popup
    try {
      setIsEmbedded(window !== window.parent || !!window.opener);
    } catch {
      setIsEmbedded(false);
    }
  }, []);

  if (isEmbedded) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        // <button type="button" onClick={disable}>
        //   Disable draft mode
        // </button>
        <a
          onClick={disable}
          className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
        >
          Disable Draft Mode
        </a>
      )}
    </div>
  );
}

//
// import { useDraftModeEnvironment } from "next-sanity/hooks";

// export function DisableDraftMode() {
//   const environment = useDraftModeEnvironment();

//   // Only show the disable draft mode button when outside of Presentation Tool
//   if (environment !== "live" && environment !== "unknown") {
//     return null;
//   }

//   return (
//     <a
//       href="/api/draft-mode/disable"
//       className="fixed bottom-4 right-4 bg-gray-50 px-4 py-2"
//     >
//       Disable Draft Mode
//     </a>
//   );
// }
