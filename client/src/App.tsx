import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Produse from "@/pages/produse";
import Echipamente from "@/pages/echipamente";
import MisiuneViziuneValori from "@/pages/misiune-viziune-valori";
import Cariera from "@/pages/cariera";
import Noutati from "@/pages/noutati";
import NoutatiSlug from "@/pages/noutati/[slug]";
import Contact from "@/pages/contact";
import OferteSpeciale from "@/pages/oferte-speciale";
import Garantii from "@/pages/garantii";
import Parteneri from "@/pages/parteneri";
import GalerieFoto from "@/pages/galerie-foto";
import AriaDeAcoperire from "@/pages/aria-de-acoperire";
import LocalitateSlug from "@/pages/localitate/[slug]";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/produse" component={Produse} />
            <Route path="/echipamente" component={Echipamente} />
            <Route path="/misiune-viziune-valori" component={MisiuneViziuneValori} />
            <Route path="/cariera" component={Cariera} />
            <Route path="/noutati" component={Noutati} />
            <Route path="/noutati/:slug" component={NoutatiSlug} />
            <Route path="/contact" component={Contact} />
            <Route path="/oferte-speciale" component={OferteSpeciale} />
            <Route path="/garantii" component={Garantii} />
            <Route path="/parteneri" component={Parteneri} />
            <Route path="/galerie-foto" component={GalerieFoto} />
            <Route path="/aria-de-acoperire" component={AriaDeAcoperire} />
            <Route path="/localitate/:slug" component={LocalitateSlug} />
          </Switch>
        </main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
