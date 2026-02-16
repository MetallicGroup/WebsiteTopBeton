import { Cog, Truck, FlaskConical, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import stationImage from "@/assets/images/equipment-station.jpg";
import fleetImage from "@/assets/images/equipment-fleet.jpg";
import pumpImage from "@/assets/images/equipment-pump.jpg";
import labImage from "@/assets/images/equipment-lab.jpg";
import mixerImage from "@/assets/images/equipment-mixer.jpg";

export default function Echipamente() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Echipamente</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stație automatizată cu cântărire electronică și control digital al dozajelor pentru loturi constante. 
            Flotă pentru transport și pompare întreținută periodic.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <img 
                src={stationImage} 
                alt="Stație automatizată de producție beton Top Beton" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                data-testid="img-station"
              />
              <h2 className="text-3xl font-bold text-foreground mb-4">Stație automatizată</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Echipamentul nostru de producție include sisteme de cântărire electronică de înaltă precizie și 
                control digital complet al dozajelor, asigurând constanța calității la fiecare lot produs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Cântărire electronică cu precizie de ±1%</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Control digital al dozajelor pentru consistență</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Monitorizare în timp real a parametrilor</span>
                </li>
              </ul>
            </div>

            <div>
              <img 
                src={fleetImage} 
                alt="Flotă modernă de autobetoniere Top Beton" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                data-testid="img-fleet"
              />
              <h2 className="text-3xl font-bold text-foreground mb-4">Flotă modernă</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Autobetoniere și autopompe întreținute periodic, echipate cu sisteme GPS pentru monitorizare 
                în timp real și planificare optimă a livrărilor.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Autobetoniere cu capacități variate (6-10 mc)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Întreținere preventivă programată</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Monitorizare GPS pentru livrări la timp</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <p className="text-muted-foreground">Autobetoniere</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">5</div>
              <p className="text-muted-foreground">Autopompe</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">100%</div>
              <p className="text-muted-foreground">Control digital</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <p className="text-muted-foreground">Disponibilitate</p>
            </div>
          </div>

          {/* Equipment Gallery */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover overflow-hidden">
              <CardContent className="p-6">
                <img 
                  src={stationImage} 
                  alt="Stația de producție beton" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <CardTitle className="text-lg mb-2">Stația de producție</CardTitle>
                <p className="text-sm text-muted-foreground">Control computerizat, dozare precisă</p>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <CardContent className="p-6">
                <img 
                  src={mixerImage} 
                  alt="Autobetoniere Top Beton" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <CardTitle className="text-lg mb-2">Autobetoniere</CardTitle>
                <p className="text-sm text-muted-foreground">Flotă modernă, mentenanță regulată</p>
              </CardContent>
            </Card>

            <Card className="card-hover overflow-hidden">
              <CardContent className="p-6">
                <img 
                  src={labImage} 
                  alt="Laborator testare calitate beton" 
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <CardTitle className="text-lg mb-2">Laborator</CardTitle>
                <p className="text-sm text-muted-foreground">Testare calitate, certificări</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
