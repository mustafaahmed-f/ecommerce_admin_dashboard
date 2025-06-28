"use client";

import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { generateErrMsg } from "@/app/_utils/helperMethods/generateErrMsg";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { showErrorToast, showSuccessToast } from "@/app/_utils/toasts";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";

interface ActionsSectionProps {
  recordId: string;
  useIcons?: boolean;
}

function ActionsSection({ recordId, useIcons = true }: ActionsSectionProps) {
  const { module } = useParams();
  const [open, setOpen] = useState(false);
  const { router } = useNextNavigation();

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
      } `}
    >
      {useIcons ? (
        <Link
          href={`/view/${module}/edit/${recordId}`}
          className="hover:bg-muted-foreground cursor-pointer rounded-lg px-3 py-2"
        >
          <Pencil size={20} />
        </Link>
      ) : (
        <Link href={`/view/${module}/edit/${recordId}`}>
          <Button variant={"outline"} className="cursor-pointer">
            Edit
          </Button>
        </Link>
      )}
      <AlertDialog open={open} onOpenChange={setOpen} key={recordId}>
        <AlertDialogTrigger asChild>
          <Button
            variant={!useIcons ? "destructive" : "ghost"}
            className={`hover:bg-secondary cursor-pointer ${!useIcons && "text-white"}`}
            onClick={() => setOpen(true)}
          >
            {useIcons ? <Trash /> : "Delete"}
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
