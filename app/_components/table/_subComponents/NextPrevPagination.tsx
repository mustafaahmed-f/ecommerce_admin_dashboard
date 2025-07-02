"use client";

import { Button } from "@/app/_components/ui/button";

export interface NextPrevPaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function NextPrevPagination({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: NextPrevPaginationProps) {
  return (
    <div className="mt-4 flex w-full justify-end gap-2">
      {hasPrev && (
        <Button variant="outline" onClick={onPrev} className="cursor-pointer">
          Previous
        </Button>
      )}
      {hasNext && (
        <Button className="cursor-pointer" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
}
