import React from "react";
import Label from "@/components/atoms/Label";

const FormatSelector = ({ format, onFormatChange, className }) => {
  const formats = [
    { value: "image/png", label: "PNG", description: "Best for images with transparency" },
    { value: "image/jpeg", label: "JPEG", description: "Best for photos, smaller file size" },
    { value: "image/webp", label: "WebP", description: "Modern format, excellent compression" }
  ];

  return (
    <div className={className}>
      <Label>Output Format</Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {formats.map((fmt) => (
          <label
            key={fmt.value}
            className={`
              relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${format === fmt.value 
                ? "border-primary-500 bg-primary-50" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <input
              type="radio"
              value={fmt.value}
              checked={format === fmt.value}
              onChange={(e) => onFormatChange(e.target.value)}
              className="sr-only"
            />
            <span className="text-sm font-medium text-gray-900">
              {fmt.label}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {fmt.description}
            </span>
            {format === fmt.value && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;