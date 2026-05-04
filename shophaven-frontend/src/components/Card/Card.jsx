import ArrowIcon from "../common/ArrowIcon";

const Card = ({
  imagePath,
  title,
  description,
  actionArrow,
  height,
  width,
}) => {
  return (
    <div className="group relative flex flex-col p-4 transition-all duration-300">
      <div className="overflow-hidden rounded-lg">
        <img
          src={imagePath}
          alt={title}
          style={{ height: height || "220px", width: width || "200px" }}
          className="rounded-lg object-cover transition-all duration-300 
                 group-hover:scale-110 group-hover:brightness-75"
        />
      </div>
    <div className="flex justify-between items-center mt-2">

  {/* Text */}
  <div className="flex flex-col">
    <p className="text-[16px]">{title}</p>
    {description && (
      <p className="text-[12px] text-gray-600">{description}</p>
    )}
  </div>

  {/* Arrow */}
  {actionArrow && (
    <div className="ml-2 flex items-center">
      <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 hover:text-white transition cursor-pointer">
        <ArrowIcon />
      </div>
    </div>
  )}

</div>
    </div>
  );
};

export default Card;
