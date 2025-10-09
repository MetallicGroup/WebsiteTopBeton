import { Award, Factory, FlaskConical, Truck, Users, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Parteneri() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Parteneri</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Colaborăm cu cei mai buni
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Colaborăm cu furnizori consacrați de ciment, aditivi și agregate pentru a asigura calitatea constantă a produselor noastre
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-12">
            {/* Partner placeholders */}
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Factory className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Partner Ciment</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <FlaskConical className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Partner Aditivi</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Partner Agregate</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Award className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Certificare</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Truck className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Logistică</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Wrench className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Echipamente</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <FlaskConical className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Laborator</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">Consultanță</p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                Partenerii noștri sunt selecționați pe baza calității produselor, fiabilității livrărilor și 
                respectării standardelor internaționale. Împreună construim fundația proiectelor de succes.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
