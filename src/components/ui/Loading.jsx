import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Processing image..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
        <ApperIcon 
          name="Image" 
          className="absolute inset-0 m-auto w-6 h-6 text-primary-500 animate-pulse" 
        />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-gray-900">
        Processing
      </h3>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
        {message}
      </p>
    </div>
  );
};

export default Loading;