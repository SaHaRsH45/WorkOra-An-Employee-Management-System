import React from "react";

const CompleteTask = ({ data }) => {
  return (
    <div className="h-full w-[320px] flex-shrink-0 rounded-2xl p-5 shadow-xl border border-gray-200 bg-gradient-to-br from-blue-500 to-blue-400 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      {/* Category + Date */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-blue-600 text-white rounded-lg px-3 py-1 text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-sm font-medium text-white">{data.date}</h4>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-white mb-3">{data.title}</h2>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white mb-4">{data.description}</p>

      {/* Completed Button */}
      <div className="flex justify-center">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transition-all duration-300">
          Completed
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
