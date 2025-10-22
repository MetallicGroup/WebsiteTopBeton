export interface StandardProduct {
  code: string;
  oldCode: string;
  description: string;
}

export interface RoadConcreteProduct {
  code: string;
  description: string;
}

export interface StabilizedAggregateProduct {
  name: string;
  description: string;
}

export const standardProducts: StandardProduct[] = [
  {
    code: "C 8/10",
    oldCode: "B150",
    description: "Pentru lucrări nerelevante structural, amenajări și fundații ușoare"
  },
  {
    code: "C 12/15", 
    oldCode: "B200",
    description: "Pentru fundații clădiri mici, șape și elemente cu solicitări reduse"
  },
  {
    code: "C 16/20",
    oldCode: "B250", 
    description: "Cel mai utilizat pentru fundații, stâlpi și structuri curente rezidențiale"
  },
  {
    code: "C 20/25",
    oldCode: "B350",
    description: "Pentru grinzi, plăci și elemente cu solicitări medii spre mari"
  },
  {
    code: "C 25/30",
    oldCode: "B400",
    description: "Beton de înaltă rezistență pentru structuri complexe și industriale"
  },
  {
    code: "C 30/37",
    oldCode: "B450",
    description: "Pentru structuri cu solicitări mari, clădiri înalte și lucrări industriale"
  },
  {
    code: "C 32/40",
    oldCode: "B500",
    description: "Beton de înaltă performanță pentru structuri speciale și infrastructură critică"
  },
  {
    code: "C 35/45",
    oldCode: "B550",
    description: "Pentru lucrări cu cerințe extreme de rezistență și durabilitate"
  },
  {
    code: "C 40/50",
    oldCode: "B600",
    description: "Clasa superioară de rezistență pentru aplicații speciale și infrastructură majoră"
  }
];

export const roadConcreteProducts: RoadConcreteProduct[] = [
  {
    code: "Beton rutier BcR 3.5",
    description: "Pentru drumuri cu trafic ușoar și mediu, căi de acces și platforme"
  },
  {
    code: "Beton rutier Bcr 4",
    description: "Drumuri cu trafic mediu, străzi urbane și platforme industriale"
  },
  {
    code: "Beton rutier BcR 4.5",
    description: "Pentru drumuri principale, artere de circulație și autostrăzi secundare"
  },
  {
    code: "Beton rutier BcR 5",
    description: "Clasa superioară pentru autostrăzi, poduri și infrastructură rutieră de mare capacitate"
  }
];

export const stabilizedAggregateProducts: StabilizedAggregateProduct[] = [
  {
    name: "Agregate stabilizate cu ciment 4%",
    description: "Pentru straturi de fundație rutieră și platforme cu trafic ușoar"
  },
  {
    name: "Agregate stabilizate cu ciment 5%",
    description: "Pentru baze rutiere, platforme de parcare și zone de trafic mediu"
  },
  {
    name: "Agregate stabilizate cu ciment 6%",
    description: "Pentru infrastructură rutieră majoră, zone industriale și trafic intens"
  }
];
