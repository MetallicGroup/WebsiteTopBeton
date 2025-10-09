import { useState } from "react";
import { Users, Truck } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Lightbox from "@/components/ui/lightbox";

const teamImages = [
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Echipa Top Beton 1"
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Echipa Top Beton 2"
  },
  {
    src: "https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Echipa Top Beton 3"
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Echipa Top Beton 4"
  }
];

const equipmentImages = [
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Stație producție"
  },
  {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Autobetonieră"
  },
  {
    src: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Pompă beton"
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Laborator"
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Silozuri"
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    alt: "Sistem GPS"
  }
];

export default function GalerieFoto() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ src: "", alt: "" });

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galerie Foto</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Echipa și echipamentele noastre
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
              <Users className="w-8 h-8 text-accent mr-3" />
              Echipa Top Beton
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {teamImages.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-lg cursor-pointer card-hover"
                  onClick={() => openLightbox(image.src, image.alt)}
                  data-testid={`team-image-${index}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Section */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
              <Truck className="w-8 h-8 text-accent mr-3" />
              Echipamente Top Beton
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {equipmentImages.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-lg cursor-pointer card-hover"
                  onClick={() => openLightbox(image.src, image.alt)}
                  data-testid={`equipment-image-${index}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage.src}
        imageAlt={lightboxImage.alt}
      />
    </div>
  );
}
