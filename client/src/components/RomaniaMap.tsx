import topBetonLogo from "@assets/540506396_122095734507000096_8054366741086429791_n_1760016853766.jpg";

export default function RomaniaMap() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg 
        viewBox="0 0 400 500" 
        className="w-full h-full max-h-[500px]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Romania outline - simplified */}
        <path
          d="M 200 50 L 350 80 L 380 150 L 370 220 L 380 280 L 360 350 L 320 420 L 280 450 L 220 470 L 160 450 L 120 420 L 80 360 L 50 280 L 40 200 L 60 130 L 100 80 L 150 60 Z"
          fill="hsl(215, 25%, 27%)"
          fillOpacity="0.1"
          stroke="hsl(215, 25%, 27%)"
          strokeWidth="3"
          className="transition-all duration-300"
        />
        
        {/* Bucharest marker position (roughly center-south) */}
        <g transform="translate(200, 320)">
          {/* Pulsing circle animation */}
          <circle 
            cx="0" 
            cy="0" 
            r="25" 
            fill="hsl(38, 92%, 50%)"
            opacity="0.3"
            className="animate-ping"
          />
          
          {/* Logo circle background */}
          <circle 
            cx="0" 
            cy="0" 
            r="20" 
            fill="white"
            stroke="hsl(38, 92%, 50%)"
            strokeWidth="3"
          />
          
          {/* Logo image */}
          <image
            href={topBetonLogo}
            x="-15"
            y="-15"
            width="30"
            height="30"
            clipPath="circle(15px at center)"
          />
        </g>
        
        {/* București label */}
        <text 
          x="200" 
          y="370" 
          textAnchor="middle" 
          className="text-sm font-semibold fill-foreground"
        >
          București
        </text>
        
        {/* Decorative coverage area indicators */}
        <circle cx="200" cy="320" r="60" fill="none" stroke="hsl(38, 92%, 50%)" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.4" />
        <circle cx="200" cy="320" r="90" fill="none" stroke="hsl(38, 92%, 50%)" strokeWidth="1" strokeDasharray="5,5" opacity="0.2" />
      </svg>
    </div>
  );
}
