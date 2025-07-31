import { Suspense } from "react";
import SuccessPage from "./SuccessPage";

export default function SuccessWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10">Loading success message...</div>
      }
    >
      <SuccessPage />
    </Suspense>
  );
}
