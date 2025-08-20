import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ title = "Something went wrong", message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        {message || "An unexpected error occurred. Please try again."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;