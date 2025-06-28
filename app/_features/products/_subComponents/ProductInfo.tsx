import { Product } from "../types/productType";
import { colorMap } from "../utils/colorsArray";
import ColorIndicator from "./ColorIndicator";
import ProductProperty from "./ProductProperty";

interface ProductInfoProps {
  product: Product;
}

function ProductInfo({ product }: ProductInfoProps) {
  const {
    title,
    price,
    color,
    size,
    ram,
    screenSize,
    fps,
    power,
    soundOutput,
    category,
    discount,
  } = product;
  return (
    <div className="my-auto flex flex-col gap-2">
      {/* ( title and price ) */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-col">
          <h6 className="text-base font-semibold">{title}</h6>
          <div className="flex w-full flex-row items-center justify-start gap-[2px] sm:gap-3">
            <p className="text-base text-red-600 sm:text-lg">
              $ {price - price * ((discount ?? 0) / 100)}
            </p>

            {discount !== 0 ? (
              <p className="text-textGrey text-sm line-through sm:text-base">
                $ {price}
              </p>
            ) : null}
            <div className="rounded-md px-[1px] py-[2px] text-xs text-[10px] text-red-600 sm:p-1 sm:text-sm">
              {discount !== 0 ? <p>- {discount}%</p> : null}
            </div>
          </div>
        </div>
      </div>
      {/* Other details */}
      <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-6">
        {(() => {
          switch (category) {
            case "tv":
              return (
                <ProductProperty
                  label="screen size"
                  value={`${screenSize} inch`}
                />
              );
            case "laptop":
              return <ProductProperty label="ram" value={`${ram} GB`} />;
            case "gaming":
              return <ProductProperty label="power" value={`${fps} watts`} />;
            case "audio":
              return (
                <ProductProperty
                  label="sound output"
                  value={`${soundOutput} dB`}
                />
              );
            case "appliances":
              return <ProductProperty label="power" value={`${power} watts`} />;
            case "mobile":
              return <ProductProperty label="ram" value={`${ram} GB`} />;
            default:
              return <ProductProperty label="size" value={size} />;
          }
        })()}
        {/* Color */}
        <p className="my-auto">Color</p>
        <ColorIndicator
          isSelected={false}
          colorHex={colorMap.get(color!)!}
          colorString={color!}
        />
      </div>
    </div>
  );
}

export default ProductInfo;
