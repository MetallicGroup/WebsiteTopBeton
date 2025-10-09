export interface Guarantee {
  icon: string;
  title: string;
  description: string;
  highlight: boolean;
}

export const guarantees: Guarantee[] = [
  {
    icon: "award",
    title: "Calitate verificată în laborator",
    description: "Producție monitorizată în laborator autorizat RAD CERT cu materiale certificate CE. Fiecare lot testat conform standardelor.",
    highlight: false
  },
  {
    icon: "scale",
    title: "Cantitate garantată", 
    description: "Utilaje monitorizate GPS pentru verificarea cantității livrate. Primești exact volumul comandat.",
    highlight: false
  },
  {
    icon: "clock",
    title: "Livrare la timp",
    description: "Fereastră de livrare ±45 minute respectată. Pompare gratuită dacă nu respectăm intervalul convenit.",
    highlight: true
  },
  {
    icon: "zap", 
    title: "Răspuns rapid la oferte",
    description: "Răspuns la cererea de ofertă în maximum 60 minute în programul de lucru. 2 m³ gratuit dacă depășim termenul.",
    highlight: true
  },
  {
    icon: "tag",
    title: "Preț fix confirmat",
    description: "Preț stabilit și confirmat la comandă, fără modificări sau costuri suplimentare neașteptate.",
    highlight: false
  },
  {
    icon: "user-check", 
    title: "Conduită profesională",
    description: "Echipa noastră respectă normele de politeță și siguranță pe șantier. 2 m³ gratuit pentru orice abatere.",
    highlight: true
  }
];
