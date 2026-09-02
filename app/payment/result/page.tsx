import { Suspense } from "react";
import ResultView from "./ResultView";

// Static export: the bank callback redirects here with query params, so the
// result is read client-side from `useSearchParams` inside a Suspense boundary.
export default function PaymentResultPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">...</div>}>
      <ResultView />
    </Suspense>
  );
}
