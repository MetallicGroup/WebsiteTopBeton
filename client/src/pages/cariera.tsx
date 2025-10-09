import { Mail, CheckCircle, Users, GraduationCap, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Cariera() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Carieră</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Alătură-te echipei Top Beton
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-2xl shadow-lg p-8 lg:p-12 text-center mb-12">
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Momentan nu avem poziții deschise</h2>
              <p className="text-lg text-muted-foreground mb-8">
                În prezent nu avem poziții deschise. Dacă dorești să ni te alături, trimite CV și scrisoare de intenție 
                la adresa de email de mai jos. Te vom contacta când apare un rol potrivit.
              </p>
              
              <div className="bg-background rounded-2xl p-6 inline-block">
                <p className="text-muted-foreground mb-2">Trimite aplicația la:</p>
                <a href="mailto:office@topbeton.ro" className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors">
                  office@topbeton.ro
                </a>
              </div>

              <div className="mt-8">
                <a href="mailto:office@topbeton.ro">
                  <Button className="btn-primary" data-testid="button-send-cv">
                    <Mail className="w-4 h-4 mr-2" />
                    Trimite CV-ul tău
                  </Button>
                </a>
              </div>
            </div>

            <div className="pt-12 border-t border-border">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">De ce să lucrezi la Top Beton?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Dezvoltare continuă</h4>
                  <p className="text-sm text-muted-foreground">Instruire și formare profesională constantă</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Echipă solidă</h4>
                  <p className="text-sm text-muted-foreground">Mediu profesional și colegial</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Tehnologie modernă</h4>
                  <p className="text-sm text-muted-foreground">Echipamente și sisteme de ultimă generație</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
