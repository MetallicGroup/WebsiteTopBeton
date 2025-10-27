import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LOCALITATI } from "@/data/localitati";
import NotFound from "@/pages/not-found";

export default function LocalitateSlug() {
  const { slug } = useParams();
  const localitate = LOCALITATI.find(l => l.slug === slug);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [slug]);

  if (!localitate) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/aria-de-acoperire">
              <Button variant="ghost" className="text-accent hover:text-accent/80 p-0" data-testid="button-back-coverage">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Înapoi la Aria de acoperire
              </Button>
            </Link>
          </nav>

          <Card className="shadow-lg">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-accent" />
              </div>
              <CardTitle className="text-4xl font-bold">
                Livrare beton în <span className="text-accent" data-testid="text-location-name">{localitate.name}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  Livrăm beton proaspăt în <strong>{localitate.name}</strong> din stația noastră Cornetu. 
                  Beneficiezi de preț competitiv datorită distanței reduse, consultanță tehnică gratuită, 
                  transport și pompare cu echipamente moderne.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Garantăm calitatea (laborator autorizat RAD CERT) și cantitatea livrată. 
                  Fiecare comandă este verificată și documentată pentru siguranța ta.
                </p>

                <div className="bg-accent/10 rounded-2xl p-6 mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    De ce să alegi Top Beton pentru livrări în {localitate.name}?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Distanță minimă de transport = beton mai proaspăt și preț mai bun</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Livrare rapidă, de obicei sub 30 de minute de la comandă</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Cunoaștem perfect zona și drumurile de acces</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-accent mt-1 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">Pompare gratuită dacă nu respectăm intervalul de livrare</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-muted rounded-2xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center">
                      <Phone className="w-5 h-5 text-accent mr-2" />
                      Telefon
                    </h4>
                    <a 
                      href="tel:0752400200" 
                      className="text-lg text-accent hover:text-accent/80 font-semibold"
                      data-testid="link-phone-location"
                    >
                      0752 400 200
                    </a>
                  </div>
                  <div className="bg-muted rounded-2xl p-6">
                    <h4 className="font-bold text-foreground mb-3 flex items-center">
                      <Mail className="w-5 h-5 text-accent mr-2" />
                      Email
                    </h4>
                    <a 
                      href="mailto:office@topbeton.ro" 
                      className="text-lg text-accent hover:text-accent/80 font-semibold"
                      data-testid="link-email-location"
                    >
                      office@topbeton.ro
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Pregătit să începi proiectul în {localitate.name}?
                  </p>
                  <Link href="/contact">
                    <Button className="btn-primary" data-testid="button-contact-location">
                      <Phone className="w-4 h-4 mr-2" />
                      Solicită ofertă personalizată
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
