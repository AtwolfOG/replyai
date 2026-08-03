import { GoogleCallback } from "./callback";
import { Suspense } from "react";
import { Loader } from "@/components/loader";

export default function GoogleCallbackPage() {
  return <Suspense fallback={ <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>}>
    <GoogleCallback />
  </Suspense>;
}