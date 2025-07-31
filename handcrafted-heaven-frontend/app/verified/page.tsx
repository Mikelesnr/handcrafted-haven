import { Suspense } from "react";
import VerifiedPage from "./VerifiedPage";

export default function VerifiedWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10">Loading verification...</div>
      }
    >
      <VerifiedPage />
    </Suspense>
  );
}
