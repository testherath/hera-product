import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import { ProductImage } from '../types';

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-surface rounded-2xl overflow-hidden aspect-square">
        <div
          className="relative w-full h-full cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[selectedImage].url}
            alt={images[selectedImage].alt}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isZoomed ? 'scale(4)' : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors duration-300 shadow-soft"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={20} color="var(--color-primary)" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors duration-300 shadow-soft"
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={20} color="var(--color-primary)" />
        </button>

        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
          {selectedImage + 1} / {images.length}
        </div>

        {isZoomed && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full text-sm font-medium text-accent-foreground flex items-center gap-2">
            <Icon name="ZoomIn" size={16} />
            4x Zoom Active
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index
                ? 'border-primary shadow-soft'
                : 'border-transparent hover:border-muted'
            }`}
          >
            <Image
              src={image.url}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 p-4 bg-surface rounded-xl">
        <Icon name="Rotate3d" size={20} color="var(--color-primary)" />
        <span className="text-sm font-medium text-primary">
          360° View Available - Hover to zoom up to 4x
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;