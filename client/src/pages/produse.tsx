import { Package, Truck, UserCheck, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { standardProducts, specialProducts, type StandardProduct, type SpecialProduct } from "@/data/products";

export default function Produse() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Produse</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Gama noastră acoperă betoane uzuale pentru fundații, grinzi, plăci, cât și soluții speciale la cerere.
          </p>
        </div>
      </section>

      {/* Standard Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8">Produse uzuale</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {standardProducts.map((product: StandardProduct) => (
              <Card key={product.code} className="card-hover" data-testid={`card-product-${product.code.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-mono">{product.code}</CardTitle>
                  <p className="text-sm text-muted-foreground">({product.oldCode})</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8">Produse speciale</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {specialProducts.map((product: SpecialProduct, index: number) => (
              <Card key={index} className="card-hover border-2 border-accent/20" data-testid={`card-special-${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8">Servicii complementare</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="card-hover hero-gradient text-primary-foreground">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-4">Pompare beton cu utilaje dedicate</CardTitle>
                <p className="text-primary-foreground/90 mb-4">
                  Asigurăm pomparea betonului la înălțimi și distanțe mari cu echipamente moderne și operatori experimentați.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-primary-foreground/90">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span>Pompe cu brațe ajustabile</span>
                  </li>
                  <li className="flex items-center text-primary-foreground/90">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span>Capacitate mare de pompare</span>
                  </li>
                  <li className="flex items-center text-primary-foreground/90">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span>Operatori certificați</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-accent to-amber-600 text-accent-foreground">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent-foreground/20 rounded-xl flex items-center justify-center mb-6">
                  <UserCheck className="w-8 h-8" />
                </div>
                <CardTitle className="text-2xl mb-4">Consultanță tehnică de șantier</CardTitle>
                <p className="mb-4">
                  Echipa noastră de ingineri oferă consultanță gratuită pentru alegerea betonului optim și recomandări de turnare.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span>Analiza necesităților proiectului</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span>Recomandări tehnice personalizate</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span>Suport pe toată durata proiectului</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-muted/50 rounded-2xl p-8 max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">
                Nu găsești produsul potrivit? Contactează-ne pentru soluții personalizate!
              </p>
              <Link href="/contact">
                <Button className="btn-primary" data-testid="button-contact-products">
                  <Wrench className="w-4 h-4 mr-2" />
                  Solicită ofertă personalizată
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
