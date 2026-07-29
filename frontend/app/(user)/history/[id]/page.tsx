"use client"
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { getReplyById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const {id} = useParams();
  const {data, isLoading, isError } = useQuery({
    queryKey: ["reply", id],
    queryFn: () => getReplyById(id as string),
  })
    return (
        <div>
          <div className="p-(--spacing-16)">
            <Button className="flex items-center gap-(--space-2) group text-muted hover:text-primary! transition-all duration-300"> <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" /> Back</Button>
          </div>
          {isLoading && <Loader />}
          {isError && <div className="flex items-center justify-center">Error</div>}

          <div className="">
            <h1>Reply Detail</h1>
            <p></p>
            
          </div>
        </div>
    )
}