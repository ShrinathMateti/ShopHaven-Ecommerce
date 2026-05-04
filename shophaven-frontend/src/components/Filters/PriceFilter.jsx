import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const PriceFilter = () => {
  const [range, setRange] = useState([10, 250]);

  return (
    <div className="flex flex-col mb-6">
      <p className="text-[16px] text-black mt-5 mb-5 font-medium">
        Price
      </p>

      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        min={0}
        max={500}
        step={5}
        value={range}
        onValueChange={setRange}
      >
        {/* Track */}
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>

        {/* Thumbs */}
        <Slider.Thumb className="block w-5 h-5 bg-black border border-gray-300 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black transition" />
        <Slider.Thumb className="block w-5 h-5 bg-black border border-gray-300 rounded-full shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black transition" />
      </Slider.Root>

      {/* Values */}
      <div className="flex justify-between mt-5 gap-4">
        {/* Min */}
        <div className="border rounded-xl h-10 w-full flex items-center px-3">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            value={range[0]}
            readOnly
            className="w-full bg-transparent outline-none px-2 text-gray-700"
          />
        </div>

        {/* Max */}
        <div className="border rounded-xl h-10 w-full flex items-center px-3">
          <span className="text-gray-500">$</span>
          <input
            type="number"
            value={range[1]}
            readOnly
            className="w-full bg-transparent outline-none px-2 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;