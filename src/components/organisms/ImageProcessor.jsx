import React, { useState, useEffect } from "react";
import DimensionInput from "@/components/molecules/DimensionInput";
import FormatSelector from "@/components/molecules/FormatSelector";
import ResizableImagePreview from "@/components/molecules/ResizableImagePreview";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const ImageProcessor = ({ imageData, onReset }) => {
  const [width, setWidth] = useState(imageData?.originalWidth || 0);
  const [height, setHeight] = useState(imageData?.originalHeight || 0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [outputFormat, setOutputFormat] = useState("image/png");
  const [quality, setQuality] = useState(0.9);
  const [processing, setProcessing] = useState(false);
  const [resizedImageUrl, setResizedImageUrl] = useState(null);
  
  const originalAspectRatio = imageData ? imageData.originalWidth / imageData.originalHeight : 1;

  useEffect(() => {
    if (imageData) {
      setWidth(imageData.originalWidth);
      setHeight(imageData.originalHeight);
      setResizedImageUrl(null);
    }
  }, [imageData]);

const handleWidthChange = (newWidth) => {
  setWidth(newWidth);
  if (aspectRatioLocked && newWidth > 0) {
    setHeight(Math.round(newWidth / originalAspectRatio));
  }
};

const handleHeightChange = (newHeight) => {
  setHeight(newHeight);
  if (aspectRatioLocked && newHeight > 0) {
    setWidth(Math.round(newHeight * originalAspectRatio));
  }
};

const handleDimensionChange = (newWidth, newHeight) => {
  setWidth(newWidth);
  setHeight(newHeight);
};

  const handleToggleAspectRatio = () => {
    setAspectRatioLocked(!aspectRatioLocked);
  };

  const resizeImage = async () => {
    if (!imageData || !width || !height) {
      toast.error("Please enter valid dimensions");
      return;
    }

    if (width > 10000 || height > 10000) {
      toast.error("Dimensions too large. Maximum size is 10000px");
      return;
    }

    setProcessing(true);

    try {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Create image element
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          // Draw resized image
          ctx.drawImage(img, 0, 0, width, height);
          resolve();
        };
        
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageData.dataUrl;
      });

      // Convert to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, outputFormat, quality);
      });

      // Create URL for preview
      const url = URL.createObjectURL(blob);
      setResizedImageUrl(url);
      
      toast.success("Image resized successfully!");
    } catch (error) {
      console.error("Resize error:", error);
      toast.error("Failed to resize image. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!resizedImageUrl) return;

    const link = document.createElement("a");
    const extension = outputFormat.split("/")[1];
    link.href = resizedImageUrl;
    link.download = `resized-image-${width}x${height}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded!");
  };

  const hasChanges = width !== imageData?.originalWidth || height !== imageData?.originalHeight;

  if (processing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <Loading message="Resizing your image..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resize Settings</h2>
        
        <div className="space-y-8">
          <DimensionInput
            width={width}
            height={height}
            onWidthChange={handleWidthChange}
            onHeightChange={handleHeightChange}
            aspectRatioLocked={aspectRatioLocked}
            onToggleAspectRatio={handleToggleAspectRatio}
          />
          
          <FormatSelector
            format={outputFormat}
            onFormatChange={setOutputFormat}
          />

          {outputFormat === "image/jpeg" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={resizeImage}
              disabled={!hasChanges || processing}
              className="flex-1"
              size="lg"
            >
              <ApperIcon name="Zap" className="w-5 h-5 mr-2" />
              Resize Image
            </Button>
            
            <Button
              onClick={onReset}
              variant="secondary"
              className="flex-1 sm:flex-none"
            >
              <ApperIcon name="RotateCcw" className="w-5 h-5 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </div>

      {resizedImageUrl && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
<h3 className="text-xl font-bold text-gray-900 mb-6">Resized Image</h3>
          <div className="flex justify-center mb-6">
            <ResizableImagePreview
              src={resizedImageUrl}
              alt="Resized"
              width={width}
              height={height}
              onDimensionChange={handleDimensionChange}
              aspectRatioLocked={aspectRatioLocked}
              className="mx-auto"
            />
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <ApperIcon name="Image" className="w-4 h-4 mr-2 text-success-500" />
              <span>{width} × {height} px</span>
            </div>
          </div>
            <Button
              onClick={downloadImage}
              variant="success"
              size="lg"
            >
              <ApperIcon name="Download" className="w-5 h-5 mr-2" />
              Download Resized Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;