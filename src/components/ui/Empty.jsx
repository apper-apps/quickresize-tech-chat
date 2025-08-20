import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No image uploaded", 
  message = "Drag and drop an image or click to select one to get started.",
  icon = "Image",
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-base text-gray-500 text-center max-w-md mb-8">
        {message}
      </p>
      {action}
    </div>
  );
};

export default Empty;