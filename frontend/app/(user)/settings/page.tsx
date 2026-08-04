"use client"
import Transition from "@/components/pagetransition"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMe, logout } from "@/lib/api"
import { Loader } from "@/components/loader"
import { GenerationSettings } from "./generationsettings"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function History() {
  const queryClient = useQueryClient();
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Logged out successfully");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
    onError: () => {
      toast.error("Failed to logout");
    }
  });
    return (
      <Transition>
        {isLoading && <Loader />}
        {isError && <div>
          <p>Something went wrong</p>
          <button onClick={() => refetch()}>Retry</button>
          </div>}
        {data && <><div className="flex flex-col gap-4 max-w-2xl m-auto  my-(--space-12)">
         <div>
          <div className="flex flex-col items-center gap-4 p-(--space-8) rounded-lg">
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image src={data.profile_picture} alt={data.name} fill={true} className="rounded-full object-cover" />
            </div>
            <div>
              <h3>{data.name}</h3>
              <p>{data.email}</p>
            </div>
          </div>
         </div>
         <GenerationSettings />
         <div className="p-(--space-8)"><Button  variant="destructive" disabled={logoutMutation.isPending} onClick={() => logoutMutation.mutate()}>{logoutMutation.isPending ? "Logging out..." : "Logout"}</Button></div>
        </div>
        </>
        }
      </Transition>
    )
}

