import React, { useState } from "react";
import ImageUploader from "@/components/organisms/ImageUploader";
import ImageProcessor from "@/components/organisms/ImageProcessor";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (data) => {
    setImageData(data);
    setError(null);
  };

  const handleReset = () => {
    setImageData(null);
    setError(null);
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary p-4 rounded-2xl shadow-lg">
              <ApperIcon name="Image" className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            QuickResize
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resize images instantly with precise dimension control. 
            Upload, resize, and download in seconds.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!imageData ? (
            <ImageUploader
              onImageUpload={handleImageUpload}
              imageData={imageData}
              error={error}
              onClearError={handleClearError}
            />
          ) : (
            <>
              <ImageUploader
                onImageUpload={handleImageUpload}
                imageData={imageData}
                error={error}
                onClearError={handleClearError}
              />
              <ImageProcessor
                imageData={imageData}
                onReset={handleReset}
              />
            </>
          )}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Zap" className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Client-side processing means instant results without uploads</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Lock" className="w-6 h-6 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Private & Secure</h3>
            <p className="text-gray-600">Your images never leave your device - complete privacy</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Settings" className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Precise Control</h3>
            <p className="text-gray-600">Exact pixel dimensions with aspect ratio locking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;