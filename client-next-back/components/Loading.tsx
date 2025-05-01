import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-50 bg-white z-50">
      <Loader2 className="animate-spin text-primary" />
    </div>
  );
}
