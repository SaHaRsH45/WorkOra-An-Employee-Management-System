import React from "react";

const NewTask = ({ data }) => {
  return (
    <div className="h-full w-[320px] flex-shrink-0 rounded-2xl p-5 shadow-xl border border-gray-200 bg-gradient-to-br from-red-500 to-red-400 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      {/* Category + Date */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-pink-600 text-white rounded-lg px-3 py-1 text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-sm font-medium text-white">{data.date}</h4>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-white mb-3">{data.title}</h2>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white mb-4">{data.description}</p>

      {/* Accepted Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-yellow-400 text-white hover:bg-yellow-500 transition-all duration-300 shadow-md">
          Accepted
        </button>
      </div>
    </div>
  );
};

export default NewTask;
