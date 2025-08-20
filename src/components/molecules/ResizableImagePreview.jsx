import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';

const ResizableImagePreview = ({ 
  src, 
  alt, 
  width, 
  height, 
  onDimensionChange, 
  aspectRatioLocked = true,
  className,
  style = {}
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startDimensions, setStartDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const originalAspectRatio = width / height;

  const handleMouseDown = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeType(type);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartDimensions({ width, height });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [width, height]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing || !resizeType) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    let newWidth = startDimensions.width;
    let newHeight = startDimensions.height;

    switch (resizeType) {
      case 'se': // bottom-right
        newWidth = Math.max(50, startDimensions.width + deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        } else {
          newHeight = Math.max(50, startDimensions.height + deltaY);
        }
        break;
      case 'sw': // bottom-left
        newWidth = Math.max(50, startDimensions.width - deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        } else {
          newHeight = Math.max(50, startDimensions.height + deltaY);
        }
        break;
      case 'ne': // top-right
        newWidth = Math.max(50, startDimensions.width + deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        } else {
          newHeight = Math.max(50, startDimensions.height - deltaY);
        }
        break;
      case 'nw': // top-left
        newWidth = Math.max(50, startDimensions.width - deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        } else {
          newHeight = Math.max(50, startDimensions.height - deltaY);
        }
        break;
      case 'n': // top
        newHeight = Math.max(50, startDimensions.height - deltaY);
        if (aspectRatioLocked) {
          newWidth = Math.max(50, newHeight * originalAspectRatio);
        }
        break;
      case 's': // bottom
        newHeight = Math.max(50, startDimensions.height + deltaY);
        if (aspectRatioLocked) {
          newWidth = Math.max(50, newHeight * originalAspectRatio);
        }
        break;
      case 'e': // right
        newWidth = Math.max(50, startDimensions.width + deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        }
        break;
      case 'w': // left
        newWidth = Math.max(50, startDimensions.width - deltaX);
        if (aspectRatioLocked) {
          newHeight = Math.max(50, newWidth / originalAspectRatio);
        }
        break;
    }

    // Limit maximum dimensions
    newWidth = Math.min(10000, Math.round(newWidth));
    newHeight = Math.min(10000, Math.round(newHeight));

    onDimensionChange(newWidth, newHeight);
  }, [isResizing, resizeType, startPos, startDimensions, originalAspectRatio, aspectRatioLocked, onDimensionChange]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeType(null);
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Calculate display dimensions (maintain aspect ratio for display)
  const containerWidth = Math.min(width, 400);
  const containerHeight = Math.min(height, 400);
  
  const displayScale = Math.min(
    containerWidth / width,
    containerHeight / height,
    1
  );

  const displayWidth = width * displayScale;
  const displayHeight = height * displayScale;

  return (
    <div 
      ref={containerRef}
      className={cn("relative inline-block group", className)}
      style={{
        width: displayWidth + 32, // Extra space for handles
        height: displayHeight + 32,
        ...style
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="image-preview absolute top-4 left-4 select-none pointer-events-none"
        style={{
          width: displayWidth,
          height: displayHeight,
          maxWidth: 'none',
          maxHeight: 'none'
        }}
        draggable={false}
      />
      
      {/* Resize handles - only show on hover or when resizing */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200", {
        "opacity-100": isResizing
      })}>
        {/* Corner handles */}
        <div
          className="resize-handle resize-handle-nw"
          onMouseDown={(e) => handleMouseDown(e, 'nw')}
        />
        <div
          className="resize-handle resize-handle-ne"
          onMouseDown={(e) => handleMouseDown(e, 'ne')}
        />
        <div
          className="resize-handle resize-handle-sw"
          onMouseDown={(e) => handleMouseDown(e, 'sw')}
        />
        <div
          className="resize-handle resize-handle-se"
          onMouseDown={(e) => handleMouseDown(e, 'se')}
        />
        
        {/* Edge handles */}
        <div
          className="resize-handle resize-handle-n"
          onMouseDown={(e) => handleMouseDown(e, 'n')}
        />
        <div
          className="resize-handle resize-handle-s"
          onMouseDown={(e) => handleMouseDown(e, 's')}
        />
        <div
          className="resize-handle resize-handle-e"
          onMouseDown={(e) => handleMouseDown(e, 'e')}
        />
        <div
          className="resize-handle resize-handle-w"
          onMouseDown={(e) => handleMouseDown(e, 'w')}
        />
      </div>
      
      {/* Overlay when resizing */}
      {isResizing && (
        <div className="absolute inset-0 bg-primary-500/10 border-2 border-primary-500 border-dashed rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default ResizableImagePreview;