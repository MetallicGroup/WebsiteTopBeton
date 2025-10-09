import { Eye, Target, Heart, Shield, RotateCcw, Star, GraduationCap, Users, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values = [
  {
    title: "Integritate",
    description: "Acționăm cu onestitate în toate interacțiunile, respectându-ne angajamentele față de clienți și parteneri.",
    icon: Shield
  },
  {
    title: "Constanță",
    description: "Livrăm aceeași calitate superioară la fiecare comandă, indiferent de dimensiunea proiectului.",
    icon: RotateCcw
  },
  {
    title: "Calitate",
    description: "\"Mergi pe calitate!\" - este mai mult decât un slogan, este esența activității noastre zilnice.",
    icon: Star
  },
  {
    title: "Educație",
    description: "Investim continuu în formarea echipei pentru a oferi cele mai bune soluții tehnice.",
    icon: GraduationCap
  },
  {
    title: "Atenție",
    description: "Acordăm atenție detaliilor și nevoilor specifice ale fiecărui client și proiect.",
    icon: Eye
  },
  {
    title: "Implicare",
    description: "De la primirea comenzii până la finalizarea lucrărilor – suntem alături de voi la fiecare pas.",
    icon: Heart
  },
  {
    title: "Echipă",
    description: "Colaborăm excelent între departamente, cu respect reciproc și spirit de corp puternic.",
    icon: Users
  },
  {
    title: "Inovație",
    description: "Investim în tehnologie nouă, adoptăm cele mai bune practici din industrie, căutăm îmbunătățiri continue.",
    icon: Lightbulb
  }
];

export default function MisiuneViziuneValori() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Misiune, Viziune și Valori</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Principiile care ne ghidează în fiecare zi
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
            <Card className="card-hover shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">Viziunea noastră</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  Să fim prima opțiune pe piața locală pentru proiecte mici și medii, recunoscuți pentru 
                  calitate constantă și servicii complete adaptate nevoilor fiecărui client.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover shadow-lg">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground">Misiunea noastră</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  Să livrăm beton de calitate și servicii complete, cu integritate și consecvență, 
                  susținute de instruirea continuă a echipei și tehnologii moderne de producție.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Valorile noastre</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Principiile fundamentale care definesc modul nostru de a lucra și de a ne raporta la clienți
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index} 
                  className={`card-hover ${index === 2 ? 'border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-500/5' : ''}`}
                  data-testid={`card-value-${value.title.toLowerCase()}`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
