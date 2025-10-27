import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import topBetonLogo from "@assets/top-beton-logo.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <img 
              src={topBetonLogo} 
              alt="TOP BETON - Mergi pe calitate" 
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-acasa">
                Acasă
              </Button>
            </Link>
            <Link href="/produse">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-produse">
                Produse
              </Button>
            </Link>
            <Link href="/echipamente">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-echipamente">
                Echipamente
              </Button>
            </Link>
            <Link href="/misiune-viziune-valori">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-misiune">
                Misiune Viziune Valori
              </Button>
            </Link>
            <Link href="/cariera">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-cariera">
                Carieră
              </Button>
            </Link>
            <Link href="/noutati">
              <Button variant="ghost" className="text-foreground hover:text-accent" data-testid="nav-noutati">
                Noutăți
              </Button>
            </Link>
            
            {/* Dropdown More */}
            <div className="relative">
              <Button 
                variant="ghost" 
                className="text-foreground hover:text-accent flex items-center"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                data-testid="nav-dropdown-trigger"
              >
                Mai multe
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link href="/oferte-speciale">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-accent" data-testid="dropdown-oferte">
                      Oferte Speciale
                    </Button>
                  </Link>
                  <Link href="/garantii">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-accent" data-testid="dropdown-garantii">
                      Garanții
                    </Button>
                  </Link>
                  <Link href="/parteneri">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-accent" data-testid="dropdown-parteneri">
                      Parteneri
                    </Button>
                  </Link>
                  <Link href="/galerie-foto">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-accent" data-testid="dropdown-galerie">
                      Galerie Foto
                    </Button>
                  </Link>
                  <Link href="/aria-de-acoperire">
                    <Button variant="ghost" className="w-full justify-start text-foreground hover:text-accent" data-testid="dropdown-aria">
                      Aria de acoperire
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 ml-4" data-testid="nav-contact">
                Contact
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-4">
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-acasa">
                  Acasă
                </Button>
              </Link>
              <Link href="/produse" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-produse">
                  Produse
                </Button>
              </Link>
              <Link href="/echipamente" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-echipamente">
                  Echipamente
                </Button>
              </Link>
              <Link href="/misiune-viziune-valori" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-misiune">
                  Misiune Viziune Valori
                </Button>
              </Link>
              <Link href="/cariera" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-cariera">
                  Carieră
                </Button>
              </Link>
              <Link href="/noutati" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-noutati">
                  Noutăți
                </Button>
              </Link>
              <Link href="/oferte-speciale" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-oferte">
                  Oferte Speciale
                </Button>
              </Link>
              <Link href="/garantii" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-garantii">
                  Garanții
                </Button>
              </Link>
              <Link href="/parteneri" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-parteneri">
                  Parteneri
                </Button>
              </Link>
              <Link href="/galerie-foto" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-galerie">
                  Galerie Foto
                </Button>
              </Link>
              <Link href="/aria-de-acoperire" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground" data-testid="mobile-nav-aria">
                  Aria de acoperire
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full justify-start mt-4" data-testid="mobile-nav-contact">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
