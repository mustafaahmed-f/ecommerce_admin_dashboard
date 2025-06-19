import { AlertCircleIcon, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ModuleNotFoundProps {}

function ModuleNotFound({}: ModuleNotFoundProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-red-700">
      <AlertTriangle />
      <h1>Module Not Found</h1>
    </div>
  );
}

export default ModuleNotFound;
