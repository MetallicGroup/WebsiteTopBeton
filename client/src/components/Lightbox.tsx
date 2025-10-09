import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt = "", onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (src) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lightbox" onClick={onClose} data-testid="lightbox">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
        onClick={onClose}
        data-testid="button-lightbox-close"
      >
        <X className="w-6 h-6" />
      </Button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        data-testid="lightbox-image"
      />
    </div>
  );
}
