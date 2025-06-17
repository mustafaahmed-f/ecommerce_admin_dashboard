"use client";

import { DeleteIcon, Pencil } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";

interface ActionsSectionProps {
  recordId: string;
}

function ActionsSection({ recordId }: ActionsSectionProps) {
  const { module } = useParams();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const apisFile = await import(
        `@/app/_features/${module}/services/${module}APIs`
      );
      return apisFile.deleteSingleRecord(recordId);
    },
    onSuccess: () => {
      toast.success(generateSuccessMsg("Deleted"));
    },

    onError: (err) => {
      console.log(err);
      toast.error(generateErrMsg(err.message));
    },
  });

  return (
    <div
      className={`flex items-center justify-center gap-1 ${
        deleteMutation.isPending ? "opacity-65 pointer-events-none" : ""
      }`}
    >
      <Link href={`/view/${module}/edit`} className="cursor-pointer">
        <Pencil />
      </Link>
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => deleteMutation.mutate()}
      >
        <DeleteIcon />
      </Button>
    </div>
  );
}

export default ActionsSection;
