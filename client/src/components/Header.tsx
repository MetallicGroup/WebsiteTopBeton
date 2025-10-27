import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import topBetonLogo from "@assets/top-beton-logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" data-testid="link-logo">
              <img 
                src={topBetonLogo} 
                alt="TOP BETON - Mergi pe calitate" 
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" data-testid="nav-acasa">
              <Button variant="ghost" className="text-sm font-medium">Acasă</Button>
            </Link>
            <Link href="/produse" data-testid="nav-produse">
              <Button variant="ghost" className="text-sm font-medium">Produse</Button>
            </Link>
            <Link href="/echipamente" data-testid="nav-echipamente">
              <Button variant="ghost" className="text-sm font-medium">Echipamente</Button>
            </Link>
            <Link href="/misiune-viziune-valori" data-testid="nav-misiune">
              <Button variant="ghost" className="text-sm font-medium">Misiune Viziune Valori</Button>
            </Link>
            <Link href="/cariera" data-testid="nav-cariera">
              <Button variant="ghost" className="text-sm font-medium">Carieră</Button>
            </Link>
            <Link href="/noutati" data-testid="nav-noutati">
              <Button variant="ghost" className="text-sm font-medium">Noutăți</Button>
            </Link>
            <Link href="/contact" data-testid="nav-contact">
              <Button className="btn-primary text-sm font-medium">Contact</Button>
            </Link>
            
            {/* Dropdown More */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium" data-testid="nav-dropdown">
                  Mai mult <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/oferte-speciale" data-testid="nav-oferte">Oferte Speciale</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/garantii" data-testid="nav-garantii">Garanții</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/parteneri" data-testid="nav-parteneri">Parteneri</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/galerie-foto" data-testid="nav-galerie">Galerie Foto</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/aria-de-acoperire" data-testid="nav-aria">Aria de acoperire</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden" 
            onClick={toggleMenu}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" onClick={toggleMenu} data-testid="mobile-nav-acasa">
                <Button variant="ghost" className="w-full justify-start">Acasă</Button>
              </Link>
              <Link href="/produse" onClick={toggleMenu} data-testid="mobile-nav-produse">
                <Button variant="ghost" className="w-full justify-start">Produse</Button>
              </Link>
              <Link href="/echipamente" onClick={toggleMenu} data-testid="mobile-nav-echipamente">
                <Button variant="ghost" className="w-full justify-start">Echipamente</Button>
              </Link>
              <Link href="/misiune-viziune-valori" onClick={toggleMenu} data-testid="mobile-nav-misiune">
                <Button variant="ghost" className="w-full justify-start">Misiune Viziune Valori</Button>
              </Link>
              <Link href="/cariera" onClick={toggleMenu} data-testid="mobile-nav-cariera">
                <Button variant="ghost" className="w-full justify-start">Carieră</Button>
              </Link>
              <Link href="/noutati" onClick={toggleMenu} data-testid="mobile-nav-noutati">
                <Button variant="ghost" className="w-full justify-start">Noutăți</Button>
              </Link>
              <Link href="/oferte-speciale" onClick={toggleMenu} data-testid="mobile-nav-oferte">
                <Button variant="ghost" className="w-full justify-start">Oferte Speciale</Button>
              </Link>
              <Link href="/garantii" onClick={toggleMenu} data-testid="mobile-nav-garantii">
                <Button variant="ghost" className="w-full justify-start">Garanții</Button>
              </Link>
              <Link href="/parteneri" onClick={toggleMenu} data-testid="mobile-nav-parteneri">
                <Button variant="ghost" className="w-full justify-start">Parteneri</Button>
              </Link>
              <Link href="/galerie-foto" onClick={toggleMenu} data-testid="mobile-nav-galerie">
                <Button variant="ghost" className="w-full justify-start">Galerie Foto</Button>
              </Link>
              <Link href="/aria-de-acoperire" onClick={toggleMenu} data-testid="mobile-nav-aria">
                <Button variant="ghost" className="w-full justify-start">Aria de acoperire</Button>
              </Link>
              <Link href="/contact" onClick={toggleMenu} data-testid="mobile-nav-contact">
                <Button className="btn-primary w-full">Contact</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
