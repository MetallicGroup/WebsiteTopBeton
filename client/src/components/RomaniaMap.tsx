import topBetonLogo from "@assets/540506396_122095734507000096_8054366741086429791_n_1760016853766.jpg";
import romaniaMap from "@assets/sticker-harta-romaniei-774-5516_1760018941341.jpg";

export default function RomaniaMap() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Romania Map Image */}
      <img 
        src={romaniaMap} 
        alt="Harta României" 
        className="w-full h-auto max-h-[500px] object-contain"
      />
      
      {/* București marker with logo - positioned on the map */}
      <div className="absolute" style={{ top: '58%', left: '52%', transform: 'translate(-50%, -50%)' }}>
        {/* Pulsing circle animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-accent/30 rounded-full animate-ping"></div>
        </div>
        
        {/* Logo circle background */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full border-4 border-accent flex items-center justify-center shadow-lg">
            <img 
              src={topBetonLogo} 
              alt="Top Beton Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
        
        {/* București label */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className="text-sm font-bold text-foreground bg-background/80 px-2 py-1 rounded">
            București
          </span>
        </div>
      </div>
    </div>
  );
}
