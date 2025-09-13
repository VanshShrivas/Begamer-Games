import React from "react";

const GameCard = ({ image, title, description, link }) => {
  return (
    <div className="mb-5 bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden w-72 transition transform hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold truncate">{title}</h2>
        <p className="text-gray-300 text-sm line-clamp-3">{description}</p>

        {/* Download Button */}
        <a
          href={link}
          download
          rel="noopener noreferrer"
          className="mt-3 bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition duration-200"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default GameCard;
