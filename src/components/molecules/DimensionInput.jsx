import React from "react";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DimensionInput = ({ 
  width, 
  height, 
  onWidthChange, 
  onHeightChange, 
  aspectRatioLocked,
  onToggleAspectRatio,
  className 
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={width || ""}
            onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)}
            placeholder="Width"
            min="1"
          />
        </div>
        
        <div className="flex items-center justify-center pt-8">
          <button
            onClick={onToggleAspectRatio}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200",
              aspectRatioLocked 
                ? "text-primary-500 bg-primary-50 hover:bg-primary-100" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
            title={aspectRatioLocked ? "Unlock aspect ratio" : "Lock aspect ratio"}
          >
            <ApperIcon 
              name={aspectRatioLocked ? "Link" : "Unlink"} 
              className="w-5 h-5" 
            />
          </button>
        </div>
        
        <div className="flex-1">
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            type="number"
            value={height || ""}
            onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)}
            placeholder="Height"
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionInput;