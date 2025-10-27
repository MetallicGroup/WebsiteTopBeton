import { Link } from "wouter";
import topBetonLogo from "@assets/top-beton-logo.png";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src={topBetonLogo} 
                alt="TOP BETON - Mergi pe calitate" 
                className="h-20 w-auto mb-4 brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Din 2008 livrăm beton de calitate pentru proiectele dumneavoastră.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigare rapidă</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-acasa">
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/produse" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-produse">
                  Produse
                </Link>
              </li>
              <li>
                <Link href="/echipamente" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-echipamente">
                  Echipamente
                </Link>
              </li>
              <li>
                <Link href="/noutati" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-noutati">
                  Noutăți
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Servicii</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/oferte-speciale" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-oferte">
                  Oferte Speciale
                </Link>
              </li>
              <li>
                <Link href="/garantii" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-garantii">
                  Garanții
                </Link>
              </li>
              <li>
                <Link href="/parteneri" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-parteneri">
                  Parteneri
                </Link>
              </li>
              <li>
                <Link href="/galerie-foto" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-galerie">
                  Galerie Foto
                </Link>
              </li>
              <li>
                <Link href="/aria-de-acoperire" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="footer-link-aria">
                  Aria de acoperire
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-4 text-primary-foreground/80">
              <div>
                <p className="font-semibold">Adresă</p>
                <p data-testid="footer-address">Str. Barajului nr. 19, Cornetu, Ilfov</p>
              </div>
              <div>
                <p className="font-semibold">Telefon</p>
                <a 
                  href="tel:0752400200" 
                  className="hover:text-accent transition-colors"
                  data-testid="footer-phone"
                >
                  0752 400 200
                </a>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <a 
                  href="mailto:office@topbeton.ro" 
                  className="hover:text-accent transition-colors"
                  data-testid="footer-email"
                >
                  office@topbeton.ro
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Top Beton SRL. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
