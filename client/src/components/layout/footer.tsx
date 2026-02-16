import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import topBetonLogo from "@assets/top-beton-logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src={topBetonLogo} 
                alt="TOP BETON - Mergi pe calitate" 
                className="h-40 w-auto mb-4 brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/90 mb-4">
              Beton proaspăt de calitate pentru proiectele tale din 2008.
            </p>
            <div className="flex items-center space-x-3 text-sm">
              <span className="text-primary-foreground/80">Urmărește-ne:</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigare rapidă</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/produse" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Produse
                </Link>
              </li>
              <li>
                <Link href="/echipamente" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Echipamente
                </Link>
              </li>
              <li>
                <Link href="/noutati" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Noutăți
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Companie</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/misiune-viziune-valori" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Misiune, Viziune, Valori
                </Link>
              </li>
              <li>
                <Link href="/cariera" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Carieră
                </Link>
              </li>
              <li>
                <Link href="/garantii" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Garanții
                </Link>
              </li>
              <li>
                <Link href="/parteneri" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Parteneri
                </Link>
              </li>
              <li>
                <Link href="/aria-de-acoperire" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Aria de acoperire
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-primary-foreground/80">
                  <div>Str. Barajului nr. 7</div>
                  <div>Cornetu, Ilfov</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:0752400200" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  0752 400 200
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:office@topbeton.ro" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  office@topbeton.ro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>&copy; 2024 Top Beton SRL. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
