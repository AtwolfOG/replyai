"use client"
import { Loader } from "@/components/loader";
import { RotatingBtn } from "@/components/rotatingbtn";
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
  console.log(data)
    return (
        <div>
          <div className="px-(--space-4) py-(--space-2)">
            <Button className="flex items-center gap-(--space-2) group text-muted hover:text-primary! transition-all duration-300"> <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" /> Back</Button>
          </div>
          {isLoading && <Loader />}
          {isError && <div className="flex items-center justify-center">Error</div>}

          {data && <div className="px-(--space-6) ">
            <h3>Reply Detail</h3>
            <small>{new Date(data.created_at).toLocaleString()}</small>
            <RotatingBtn>sup</RotatingBtn>
            
          </div>}
        </div>
    )
}