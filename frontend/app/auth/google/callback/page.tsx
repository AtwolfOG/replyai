"use client"
import { Loader } from "@/components/loader";
import { callback } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const { isLoading, error, isSuccess } = useQuery({
    queryKey: ["google-callback"],
    queryFn: () => callback(searchParams),
  });
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess, router])
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }
}