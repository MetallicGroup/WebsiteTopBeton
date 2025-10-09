import { CheckCircle, Phone, Truck, UserCheck, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OferteSpeciale() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Oferte Speciale</h1>
          <p className="text-xl max-w-3xl mx-auto">
            De ce să alegi Top Beton? Beneficii concrete pentru fiecare comandă
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="card-hover border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5">
              <CardHeader>
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Beton omogen, ușor de pus în operă</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Control digital al dozajelor asigură consistență perfectă și lucru facil pe șantier
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5">
              <CardHeader>
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Consultanță tehnică gratuită (inginer)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Specialist dedicat vă ajută să alegeți mixul optim și să evitați problemele comune
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5">
              <CardHeader>
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Transport și pompare cu utilaje moderne</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flotă nouă, întreținută preventiv, echipamente de pompare performante
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5">
              <CardHeader>
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Cere ofertă rapid online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Răspuns în maximum 60 minute, calcul transparent, fără surprize neplăcute
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-accent to-amber-600 text-accent-foreground shadow-2xl">
              <CardContent className="p-8 lg:p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Pregătit să începi proiectul?</h3>
                <p className="text-lg mb-8 text-accent-foreground/90">
                  Solicită o ofertă personalizată și beneficiază de toate avantajele noastre
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:0752400200">
                    <Button 
                      size="lg" 
                      className="bg-background text-foreground hover:bg-background/90"
                      data-testid="button-call-special"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Sună: 0752 400 200
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-accent-foreground/10 border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/20"
                      data-testid="button-contact-special"
                    >
                      Email: office@topbeton.ro
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
