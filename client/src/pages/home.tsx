import { Link } from "wouter";
import { ArrowRight, Phone, Mail, Award, Users, Truck, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { posts, type Post } from "@/data/posts";
import { LOCALITATI } from "@/data/localitati";
import RomaniaMap from "@/components/RomaniaMap";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-primary-foreground py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 industrial-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Top Beton – <span className="text-gradient">mergi pe calitate</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
                Beton proaspăt, livrat rapid, cu pompă, pentru proiecte rezidențiale și comerciale în Ilfov și sudul Bucureștiului.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="btn-primary text-lg" data-testid="button-contact-hero">
                    <Phone className="w-5 h-5 mr-2" />
                    Cere ofertă acum
                  </Button>
                </Link>
                <Link href="/produse">
                  <Button size="lg" variant="outline" className="text-lg bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20">
                    Vezi produsele
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {/* Quick contact */}
              <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row gap-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-accent" />
                  <a href="tel:0752400200" className="text-lg font-mono hover:text-accent transition-colors" data-testid="link-phone-hero">
                    0752 400 200
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-accent" />
                  <a href="mailto:office@topbeton.ro" className="hover:text-accent transition-colors" data-testid="link-email-hero">
                    office@topbeton.ro
                  </a>
                </div>
              </div>
            </div>
            
            {/* Hero Image placeholder */}
            <div className="hidden lg:block animate-fade-in-up">
              <div className="relative">
                <div className="w-full h-96 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
                  <Truck className="w-24 h-24 text-primary-foreground/50" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-4 rounded-2xl shadow-xl">
                  <p className="font-bold text-2xl">15+ ani</p>
                  <p className="text-sm">experiență</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Aria de acoperire</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Livrăm beton proaspăt în Ilfov și sudul Bucureștiului
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Romania Map */}
            <div className="order-2 lg:order-1">
              <div className="bg-background rounded-2xl p-8 shadow-lg">
                <RomaniaMap />
              </div>
            </div>
            
            {/* Cities List */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LOCALITATI.filter(loc => loc.featured).map((localitate) => (
                  <div 
                    key={localitate.slug} 
                    className="flex items-center space-x-2 text-foreground"
                  >
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{localitate.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link href="/aria-de-acoperire">
                  <Button 
                    size="lg" 
                    className="btn-primary w-full sm:w-auto"
                    data-testid="button-view-all-coverage"
                  >
                    Vezi toată aria de acoperire
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-96 bg-muted rounded-2xl flex items-center justify-center">
                <Users className="w-24 h-24 text-muted-foreground" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Expertiză și tehnologie de încredere
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Din 2008 livrăm betoane și șape cu control digital al dozajului și echipamente moderne. 
                Oferim consultanță tehnică și soluții adaptate fiecărui șantier.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Suntem aleși pentru calitate constantă, timp de livrare predictibil și echipă atentă pe teren.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Control digital al dozajului pentru constanță maximă</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Consultanță tehnică gratuită de la ingineri experimentați</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground">Livrare rapidă cu pompă pentru eficiență pe șantier</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Calitate certificată</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Producție monitorizată în laborator autorizat; materiale cu declarații de performanță.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">RAD CERT</CardTitle>
                <p className="text-muted-foreground">Certificare control producție</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">Laborator Autorizat</CardTitle>
                <p className="text-muted-foreground">Control calitate continuu</p>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl mb-2">Declarații CE</CardTitle>
                <p className="text-muted-foreground">Materiale certificate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Noutăți</h2>
            <Link href="/noutati">
              <Button variant="ghost" className="text-accent hover:text-accent/80 font-semibold" data-testid="link-all-news">
                Vezi toate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post: Post) => (
              <Card key={post.slug} className="card-hover overflow-hidden" data-testid={`card-news-${post.slug}`}>
                <div className="w-full h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Imagine articol</span>
                </div>
                <CardHeader>
                  <div className="text-sm text-accent font-semibold mb-2">{post.category}</div>
                  <CardTitle className="text-xl">
                    <Link href={`/noutati/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link href={`/noutati/${post.slug}`} className="text-accent hover:text-accent/80 font-semibold inline-flex items-center">
                    Citește mai mult
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ai nevoie de beton de calitate?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contactează-ne astăzi pentru o ofertă personalizată și consultanță tehnică gratuită.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg" data-testid="button-call-cta">
              <Phone className="w-5 h-5 mr-2" />
              0752 400 200
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20">
                Formular Contact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
