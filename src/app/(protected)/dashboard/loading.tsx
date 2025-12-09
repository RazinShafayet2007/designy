import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className={cn(
      "flex flex-col h-screen w-full items-center justify-center gap-4",
      "animate-in fade-in-0 duration-1000"
    )}>
      <Loader2 className={cn("h-12 w-12 animate-spin")} />
      <div className="text-center">
        <p className="text-xl text-gray-700">Loading dashboard</p>
        <p className="text-md text-gray-500 mt-2">Preparing your workspace...</p>
      </div>
    </div>
  );
}
