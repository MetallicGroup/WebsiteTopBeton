import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LOCALITATI, type Localitate } from "@/data/localitati";

export default function AriaDeAcoperire() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Aria de acoperire</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Livrăm cu plăcere în următoarele localități din Ilfov și împrejurimi
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {LOCALITATI.map((localitate: Localitate, index: number) => (
                <Link key={localitate.slug} href={`/localitate/${localitate.slug}`}>
                  <Card className="card-hover cursor-pointer" data-testid={`location-card-${localitate.slug}`}>
                    <CardContent className="p-4 text-center">
                      <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="font-semibold text-foreground">{localitate.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Nu găsești localitatea ta pe listă?</h3>
                <p className="text-muted-foreground mb-6">
                  Contactează-ne pentru a verifica dacă putem livra în zona ta. Suntem deschiși să extindem 
                  aria de acoperire pentru clienții noștri.
                </p>
                <Link href="/contact">
                  <Button className="btn-primary" data-testid="button-contact-coverage">
                    <MapPin className="w-4 h-4 mr-2" />
                    Contactează-ne
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
