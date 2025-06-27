import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";
import { useTableContext } from "@/app/_context/TableProvider";
import { TransitionStartFunction } from "react";

interface ShadcnPaginationProps {
  count: number;
  siblingCount?: number;
  showFirstLast?: boolean;
  startTransition: TransitionStartFunction;
}

function ShadcnPagination({
  count,
  siblingCount = 1,
  showFirstLast = true,
  startTransition,
}: ShadcnPaginationProps) {
  const { router, searchParams, pathName } = useNextNavigation();

  const { tableInstance, config } = useTableContext();
  const backendPagination = config?.backendPagination;

  const currentPage = backendPagination
    ? parseInt(searchParams.get("page") ?? "1")
    : tableInstance!.getState().pagination.pageIndex + 1;

  const handleChange = (page: number) => {
    if (backendPagination) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      startTransition(() => {
        router.replace(`${pathName}?${params.toString()}`);
      });
    } else {
      tableInstance!.setPageIndex(page - 1);
    }
  };

  const createPageRange = (): (number | string)[] => {
    const totalPages = count;
    const DOTS = "...";

    const totalPageNumbersToShow = siblingCount * 2 + 5;

    if (totalPageNumbersToShow >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => i + 1,
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i,
      );
      return [1, DOTS, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );

    return [1, DOTS, ...middleRange, DOTS, totalPages];
  };

  const pageRange = createPageRange();

  return (
    <Pagination className="flex w-full max-w-full justify-center sm:justify-end">
      <PaginationContent className="flex max-w-full flex-wrap justify-center sm:justify-end">
        {showFirstLast && currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: any) => {
                e.preventDefault();
                handleChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {pageRange.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {showFirstLast && currentPage < count && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default ShadcnPagination;
