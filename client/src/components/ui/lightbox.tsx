import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function Lightbox({ isOpen, onClose, imageSrc, imageAlt }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div className="relative max-w-full max-h-full">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
          data-testid="lightbox-image"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={onClose}
          data-testid="lightbox-close"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
