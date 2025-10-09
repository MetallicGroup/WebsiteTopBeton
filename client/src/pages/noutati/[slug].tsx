import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { posts } from "@/data/posts";
import NotFound from "@/pages/not-found";

export default function NoutatiSlug() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/noutati">
              <Button variant="ghost" className="text-accent hover:text-accent/80 p-0" data-testid="button-back-news">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Înapoi la noutăți
              </Button>
            </Link>
          </nav>

          <Card className="overflow-hidden shadow-lg">
            {/* Featured image placeholder */}
            <div className="w-full h-96 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-lg">Imagine articol</span>
            </div>
            
            <CardContent className="p-8 lg:p-12">
              <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold text-sm mb-4">
                {post.category}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-8">
                <Calendar className="w-5 h-5 mr-2" />
                <span data-testid="text-date">{post.date}</span>
              </div>

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="content-article"
              />

              {/* CTA Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="bg-accent/10 border-l-4 border-accent rounded-r-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">💡 Consultanță gratuită</h3>
                  <p className="text-muted-foreground">
                    Echipa Top Beton oferă consultanță tehnică gratuită pentru toate proiectele. 
                    Contactați-ne la <a href="tel:0752400200" className="text-accent hover:text-accent/80 font-semibold">0752 400 200</a> pentru 
                    recomandări specifice șantierului dumneavoastră.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
