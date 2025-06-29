import ChipCard from "@/app/_icons/ChipCard";
import SingleCard from "./SingleCard";

export default function MyCardsSection() {
  return (
    <div className="col-span-1 flex w-full gap-4 overflow-x-auto md:col-span-2">
      <SingleCard className="bg-gradient-to-br from-blue-600 to-indigo-600 pt-4 text-white" />
      <SingleCard className="bg-gradient-to-br from-red-600 to-pink-600 py-4 text-white" />
    </div>
  );
}
