import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { posts, type Post } from "@/data/posts";
import blogPouringImage from "@/assets/images/blog-concrete-pouring.jpg";
import blogTypesImage from "@/assets/images/blog-concrete-types.jpg";
import blogPlantImage from "@/assets/images/blog-concrete-plant.jpg";

const blogImages: Record<string, string> = {
  "recomandari-punere-in-opera-betoane": blogPouringImage,
  "ce-este-betonul-tipuri-clase": blogTypesImage,
  "150000-m3-produsi-cornetu": blogPlantImage,
};

export default function Noutati() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Noutăți</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Informații utile și actualizări din industrie
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {posts.length > 0 && (
            <Card className="overflow-hidden mb-12 shadow-xl bg-gradient-to-r from-muted/30 to-accent/5">
              <div className="grid lg:grid-cols-2">
                <img 
                  src={blogImages[posts[0].slug] || blogPouringImage} 
                  alt={posts[0].title}
                  className="w-full h-64 lg:h-auto object-cover"
                />
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-lg font-semibold text-sm mb-4 self-start">
                    ARTICOL DESTACAT
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    <Link 
                      href={`/noutati/${posts[0].slug}`} 
                      className="hover:text-accent transition-colors"
                      data-testid={`link-featured-${posts[0].slug}`}
                    >
                      {posts[0].title}
                    </Link>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">{posts[0].excerpt}</p>
                  <Link href={`/noutati/${posts[0].slug}`} className="text-accent font-semibold inline-flex items-center hover:underline">
                    Citește articolul complet
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* All Articles */}
          <div className="space-y-8">
            {posts.map((post: Post) => (
              <Card key={post.slug} className="card-hover overflow-hidden shadow-lg" data-testid={`card-news-${post.slug}`}>
                <div className="grid lg:grid-cols-3">
                  <img 
                    src={blogImages[post.slug] || blogPouringImage} 
                    alt={post.title}
                    className="w-full h-64 lg:h-auto object-cover"
                  />
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{post.date}</span>
                      <span className="ml-4 px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      <Link 
                        href={`/noutati/${post.slug}`} 
                        className="hover:text-accent transition-colors"
                        data-testid={`link-news-${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
                    <Link href={`/noutati/${post.slug}`} className="text-accent font-semibold inline-flex items-center hover:underline">
                      Citește mai mult
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
