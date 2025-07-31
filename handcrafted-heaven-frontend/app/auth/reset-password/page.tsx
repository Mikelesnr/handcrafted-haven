import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
