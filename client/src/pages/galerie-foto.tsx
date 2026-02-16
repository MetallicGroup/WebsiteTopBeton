import { useState } from "react";
import { Users, Truck } from "lucide-react";
import Lightbox from "@/components/ui/lightbox";

import galleryTeam1 from "@/assets/images/gallery-team-1_1.jpg";
import galleryTeam2 from "@/assets/images/gallery-team-1_2.jpg";
import galleryTeam3 from "@/assets/images/gallery-team-1_3.jpg";
import galleryTeam4 from "@/assets/images/gallery-team-1_4.jpg";

import galleryEquip1 from "@/assets/images/gallery-equip-1_1.jpg";
import galleryEquip2 from "@/assets/images/gallery-equip-1_2.jpg";
import galleryEquip3 from "@/assets/images/gallery-equip-1_3.jpg";
import galleryEquip4 from "@/assets/images/gallery-equip-1_4.jpg";
import galleryEquipPump from "@/assets/images/gallery-equip-pump.jpg";
import galleryEquipPlant from "@/assets/images/gallery-equip-plant.jpg";

const teamImages = [
  { src: galleryTeam1, alt: "Echipa Top Beton pe șantier" },
  { src: galleryTeam2, alt: "Echipa Top Beton la lucru" },
  { src: galleryTeam3, alt: "Specialiști Top Beton" },
  { src: galleryTeam4, alt: "Echipa de profesioniști Top Beton" },
];

const equipmentImages = [
  { src: galleryEquip1, alt: "Autobetonieră Top Beton" },
  { src: galleryEquip2, alt: "Transport beton pe șantier" },
  { src: galleryEquipPlant, alt: "Stația de producție beton" },
  { src: galleryEquipPump, alt: "Pompă beton Top Beton" },
  { src: galleryEquip3, alt: "Flotă autobetoniere" },
  { src: galleryEquip4, alt: "Echipamente moderne Top Beton" },
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
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galerie Foto</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Echipa și echipamentele noastre
          </p>
        </div>
      </section>

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

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={lightboxImage.src}
        imageAlt={lightboxImage.alt}
      />
    </div>
  );
}
