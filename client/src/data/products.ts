export interface StandardProduct {
  code: string;
  oldCode: string;
  description: string;
}

export interface SpecialProduct {
  name: string;
  description: string;
}

export const standardProducts: StandardProduct[] = [
  {
    code: "C 8/10",
    oldCode: "(B150, Bc10)",
    description: "Pentru lucrări nerelevante structural, amenajări și fundații ușoare"
  },
  {
    code: "C 12/15", 
    oldCode: "(B200, Bc15)",
    description: "Pentru fundații clădiri mici, șape și elemente cu solicitări reduse"
  },
  {
    code: "C 16/20",
    oldCode: "(B250, Bc20)", 
    description: "Cel mai utilizat pentru fundații, stâlpi și structuri curente rezidențiale"
  },
  {
    code: "C 20/25",
    oldCode: "(B350, Bc25)",
    description: "Pentru grinzi, plăci și elemente cu solicitări medii spre mari"
  },
  {
    code: "C 25/30",
    oldCode: "(B400, Bc30)",
    description: "Beton de înaltă rezistență pentru structuri complexe și industriale"
  },
  {
    code: "Șapă S400",
    oldCode: "Șapă autonivelantă",
    description: "Șapă fluidă pentru pardoseli interioare rezistente"
  },
  {
    code: "Balast stabilizat",
    oldCode: "Material de umplutură",
    description: "Pentru umplături, platforme și straturi de fundație temporare"
  }
];

export const specialProducts: SpecialProduct[] = [
  {
    name: "Beton rutier",
    description: "Rezistență ridicată la trafic și condiții meteorologice extreme, ideal pentru drumuri și platforme industriale"
  },
  {
    name: "Betoane ușoare", 
    description: "Densitate redusă pentru încărcări structurale scăzute și izolare termică îmbunătățită"
  },
  {
    name: "Șapă ușoară",
    description: "Soluție optimă pentru pardoseli cu cerințe de izolare fonică și termică, fără a încărca structura"
  },
  {
    name: "Betoane impermeabile",
    description: "Protecție maximă împotriva infiltrațiilor pentru subsoluri, fundații și structuri expuse la umiditate"
  }
];
