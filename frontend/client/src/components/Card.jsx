export default function Card({
  image,
  title,
  description,
  subtext,
}) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md 
                    hover:shadow-xl transition-all duration-300 
                    overflow-hidden max-w-sm">


      {/* Content */}
      <div className="flex flex-col flex-grow p-6 space-y-3">
        <h3 className=" font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-gray-600">
          {description}
        </p>

        <p className="text-sm text-gray-400 mt-auto">
          {subtext}
        </p>
      </div>
            {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

    </div>
  );
}
