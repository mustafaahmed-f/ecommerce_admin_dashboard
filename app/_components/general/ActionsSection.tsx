"use client";

import { DeleteIcon, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";

interface ActionsSectionProps {
  recordId: string;
}

function ActionsSection({ recordId }: ActionsSectionProps) {
  const { module } = useParams();
  const [open, setOpen] = useState(false);
  const { 0: isLoading, 1: setIsLoading } = useState<boolean>(false);
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const apisFile = await import(
        `@/app/_features/${module}/services/${module}APIs`
      );

      return apisFile.deleteSingleRecord(recordId);
    },
    onSuccess: () => {
      showSuccessToast(generateSuccessMsg("Deleted successfully"));
      router.refresh();
    },

    onError: (err) => {
      console.log(err);
      showErrorToast(generateErrMsg(err.message));
    },
  });

  return (
    <div
      className={`flex items-center justify-center gap-1 ${
        deleteMutation.isPending ? "pointer-events-none opacity-65" : ""
      }`}
    >
      <Link
        href={`/view/${module}/edit/${recordId}`}
        className="hover:bg-muted-foreground cursor-pointer rounded-lg px-3 py-2"
      >
        <Pencil size={20} />
      </Link>
      <AlertDialog open={open} onOpenChange={setOpen} key={recordId}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-secondary cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteMutation.mutate();
                setOpen(false);
              }}
              className="cursor-pointer text-white"
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ActionsSection;
