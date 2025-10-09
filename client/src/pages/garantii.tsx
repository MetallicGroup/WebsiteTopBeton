import { Shield, Award, Clock, Zap, Tag, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { guarantees, type Guarantee } from "@/data/guarantees";

const iconMap = {
  award: Award,
  scale: Award, // Using Award as placeholder for scale
  clock: Clock,
  zap: Zap,
  tag: Tag,
  "user-check": UserCheck,
};

export default function Garantii() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Garanții</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Angajamentele noastre față de tine - promisiuni concrete susținute de fapte
          </p>
        </div>
      </section>

      {/* Guarantees Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {guarantees.map((guarantee: Guarantee, index: number) => {
              const IconComponent = iconMap[guarantee.icon as keyof typeof iconMap] || Shield;
              return (
                <Card 
                  key={index} 
                  className={`card-hover ${guarantee.highlight ? 'border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5' : ''}`}
                  data-testid={`card-guarantee-${index}`}
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{guarantee.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{guarantee.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="bg-muted/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">De ce să ne ai încredere?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-experience">15+</div>
                <p className="text-muted-foreground">Ani de experiență</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-production">150k</div>
                <p className="text-muted-foreground">m³ beton produs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-satisfaction">98%</div>
                <p className="text-muted-foreground">Clienți mulțumiți</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2" data-testid="stat-support">24/7</div>
                <p className="text-muted-foreground">Suport tehnic</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
