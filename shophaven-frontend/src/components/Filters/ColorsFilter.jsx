import { useCallback, useState } from 'react';

export const colorSelector = {
  Purple: "#8434E1",
  Black: "#252525",
  White: "#FFFFFF",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Orange: "#FFA500",
  Navy: "#000080",
  Grey: "#808080",
  Yellow: "#FFFF00",
  Pink: "#FFC0CB",
  Green: "#008000",
  Brown: "#A52A2A"
};

const ColorsFilter = ({ colors }) => {
  const [appliedColors, setAppliedColors] = useState([]);

  const onClickDiv = useCallback((item) => {
    setAppliedColors((prev) => {
      if (prev.includes(item)) {
        return prev.filter((color) => color !== item);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  return (
    <div className='flex flex-col mb-4'>
      <p className='text-[16px] text-black mt-5 mb-5'>Colors</p>

      <div className='flex flex-wrap px-2'>
        {colors?.map((item) => (
          <div key={item} className='flex flex-col mr-2'>
            <div
              className='w-8 h-8 border rounded-xl mr-4 cursor-pointer hover:scale-110'
              onClick={() => onClickDiv(item)}
              style={{ background: colorSelector[item] || '#ccc' }}
            ></div>

            <p
              className='text-sm mb-2'
              style={{
                color: appliedColors.includes(item)
                  ? 'black'
                  : '#9CA3AF'
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsFilter;