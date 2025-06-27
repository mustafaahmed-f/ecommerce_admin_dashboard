import { ChevronDown, ChevronUp } from "lucide-react";

interface SortIndicatorsProps {
  sortDirection: 1 | -1 | 0;
}

function SortIndicators({ sortDirection }: SortIndicatorsProps) {
  //// 1 => asc  -1 => desc  0 => none
  return (
    <div className="flex flex-col items-center justify-center gap-[1px]">
      <ChevronUp
        size={15}
        strokeWidth={3}
        className={`${sortDirection === 1 ? "text-secondary" : "text-muted-foreground"}`}
      />
      <ChevronDown
        size={15}
        strokeWidth={3}
        className={`${sortDirection === -1 ? "text-secondary" : "text-muted-foreground"}`}
      />
    </div>
  );
}

export default SortIndicators;
