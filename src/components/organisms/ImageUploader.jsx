import React, { useRef, useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import { toast } from "react-toastify";

const ImageUploader = ({ onImageUpload, imageData, error, onClearError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    if (!supportedFormats.includes(file.type)) {
      throw new Error("Unsupported file format. Please upload JPG, PNG, GIF, or WebP images.");
    }
    
    if (file.size > maxFileSize) {
      throw new Error("File is too large. Please upload images smaller than 10MB.");
    }
    
    return true;
  };

  const processFile = (file) => {
    try {
      validateFile(file);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const imageData = {
            file,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight,
            currentWidth: img.naturalWidth,
            currentHeight: img.naturalHeight,
            format: file.type,
            dataUrl: e.target.result
          };
          
          onImageUpload(imageData);
          toast.success("Image uploaded successfully!");
        };
        
        img.onerror = () => {
          toast.error("Failed to load image. Please try a different file.");
        };
        
        img.src = e.target.result;
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file. Please try again.");
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <Error 
          title="Upload Failed"
          message={error}
          onRetry={onClearError}
        />
      </div>
    );
  }

  if (imageData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <img
            src={imageData.dataUrl}
            alt="Uploaded"
            className="image-preview mx-auto mb-6"
            style={{ maxHeight: "300px" }}
          />
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <ApperIcon name="Image" className="w-4 h-4 mr-2 text-primary-500" />
              <span>{imageData.originalWidth} × {imageData.originalHeight} px</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="File" className="w-4 h-4 mr-2 text-primary-500" />
              <span>{(imageData.file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div
        className={`
          relative p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
          ${isDragging 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {isDragging && (
          <div className="drag-overlay">
            <div className="text-center">
              <ApperIcon name="Upload" className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-primary-700">Drop your image here</p>
            </div>
          </div>
        )}
        
        <Empty
          title="Upload Your Image"
          message="Drag and drop an image here, or click to select from your device. Supports JPG, PNG, GIF, and WebP up to 10MB."
          icon="Upload"
          action={
            <Button onClick={handleClick} size="lg">
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              Choose Image
            </Button>
          }
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;