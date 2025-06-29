import ChipCard from "@/app/_icons/ChipCard";
import MasterCardSVG from "@/app/_icons/MasterCardSVG";
import { cn } from "@/app/_utils/utils";

interface SingleCardProps {
  className?: string;
}

function SingleCard({ className }: SingleCardProps) {
  return (
    <div className={cn("rounded-xl", className)}>
      <div className="mb-10 flex w-full flex-nowrap items-center justify-between px-4">
        <div>
          <div className="text-sm">Balance</div>
          <div className="text-2xl font-bold">$5,756</div>
        </div>
        <ChipCard />
      </div>

      <div className="mb-10 flex w-full flex-nowrap items-center gap-5 px-4">
        <div>
          <div className="text-xs">CARD HOLDER</div>
          <div className="text-sm font-semibold">Eddy Cusuma</div>
        </div>
        <div>
          <div className="text-xs">VALID THRU</div>
          <div className="text-sm font-semibold">12/22</div>
        </div>
      </div>

      <div className="flex w-full flex-nowrap items-center justify-between gap-9 border-t border-gray-200 bg-[#FFFFFF]/7 px-4 py-4">
        <div className="text-2xl font-bold whitespace-nowrap">
          3778 **** **** 1234
        </div>
        <MasterCardSVG />
      </div>
    </div>
  );
}

export default SingleCard;
