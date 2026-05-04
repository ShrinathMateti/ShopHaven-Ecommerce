

const Categories = ({ types }) => {
  return (
    <div>
      {types?.map((type, index) => {
        return (
          <div
            key={type?.id || type?.code || index}
            className='flex items-center p-1'
          >
            <input
              type='checkbox'
              id={`type-${type?.code}-${index}`}
              name={type?.code}
              className='border rounded-xl w-4 h-4 accent-black text-black'
            />
            <label
              htmlFor={`type-${type?.code}-${index}`}
              className='px-2 text-[14px] text-gray-600'
            >
              {type?.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Categories