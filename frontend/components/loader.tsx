import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({className, overlay = false, fullscreen = false}: {className?: string, overlay?: boolean, fullscreen?: boolean}) {
  return (
    <div className={cn("flex items-center justify-center h-full min-h-50", overlay && "bg-foreground/40", fullscreen && "absolute inset-0 z-50", className)}>
      <LoaderIcon className="animate-spin" />
    </div>
  )
}