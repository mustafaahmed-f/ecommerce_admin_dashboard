import CheckIcon from "@/app/_icons/CheckIcon";
import React from "react";
import { colorsArray } from "../utils/colorsArray";

interface ColorIndicatorProps {
  colorHex: string;
  colorString: string;
  isSelected?: boolean;
  size?: string;
}

function ColorIndicator({
  colorHex,
  colorString,
  isSelected = false,
  size,
}: ColorIndicatorProps) {
  return (
    <div
      className={`color-indicator ${size && size === "small" ? "h-4 w-4" : "h-6 w-6"} relative flex cursor-pointer items-center justify-center rounded-full`}
      style={{ backgroundColor: colorHex }}
    >
      {isSelected && <CheckIcon isWhite={colorString === "white"} />}
      <span className="color-tooltip invisible absolute bottom-full my-2 rounded-md bg-black px-2 py-1 text-xs text-white transition-opacity group-hover:visible">
        {colorString}
      </span>
    </div>
  );
}

export const colorMap: Map<string | null, string | null> = new Map(
  colorsArray.map((item) => [item.colorString, item.colorHex]),
);

export default ColorIndicator;
