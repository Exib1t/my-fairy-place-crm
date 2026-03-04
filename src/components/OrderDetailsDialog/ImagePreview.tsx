import { memo, useState } from "react";
import { createPortal } from "react-dom";
import "./ImagePreview.css";

interface ImagePreviewProps {
  src: string;
  alt?: string;
}

export const ImagePreview = memo(({ src, alt = "Preview" }: ImagePreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="image-preview-thumbnail"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={src} alt={alt} />
      </div>

      {isHovered &&
        createPortal(
          <div className="image-preview-popup">
            <img src={src} alt={alt} />
          </div>,
          document.body,
        )}
    </>
  );
});

ImagePreview.displayName = "ImagePreview";
