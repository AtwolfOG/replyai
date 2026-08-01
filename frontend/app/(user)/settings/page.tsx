"use client"
import Transition from "@/components/pageTransition"
import Image from "next/image"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getMe, getSettings } from "@/lib/api"
import { Loader } from "@/components/loader"
import { Settings } from "@/components/settings"
import { useReducer } from "react"
import { GenerationSettings } from "./generationsettings"

export default function History() {
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    staleTime: Infinity,
    gcTime: Infinity,
  })
    return (
      <Transition>
        {isLoading && <Loader />}
        {isError && <div>
          <p>Something went wrong</p>
          <button onClick={() => refetch()}>Retry</button>
          </div>}
        {data && <div className="flex flex-col gap-4 ">
         {/* <div>
          <h2>Settings</h2>
          <p>Manage your account settings</p>
         </div>  */}
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
        </div>
        }
      </Transition>
    )
}

