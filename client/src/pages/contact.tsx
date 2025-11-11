import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSubmitQuote } from "@/hooks/use-submit-quote";

const contactFormSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  email: z.string().email("Email invalid"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const submitQuote = useSubmitQuote();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });


  const onSubmit = async (data: ContactFormData) => {
    await submitQuote.mutateAsync({
      sourcePage: "/contact",
      formType: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    });
    
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Suntem aici pentru oferte și programări livrări
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Trimite-ne un mesaj</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nume *</FormLabel>
                            <FormControl>
                              <Input placeholder="Ion Popescu" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="ion.popescu@email.ro" type="email" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="0752 123 456" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mesaj *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descrieți proiectul dumneavoastră sau întrebarea..."
                                rows={5}
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="btn-primary w-full" 
                        disabled={submitQuote.isPending}
                        data-testid="button-submit-contact"
                      >
                        {submitQuote.isPending ? "Se trimite..." : "Trimite mesajul"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Informații de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Adresă</h3>
                      <p className="text-muted-foreground">
                        Str. Barajului nr. 19<br />
                        Cornetu, Ilfov
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                      <a 
                        href="tel:0752400200" 
                        className="text-muted-foreground hover:text-accent transition-colors"
                        data-testid="link-phone"
                      >
                        0752 400 200
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a 
                        href="mailto:office@topbeton.ro" 
                        className="text-muted-foreground hover:text-accent transition-colors"
                        data-testid="link-email"
                      >
                        office@topbeton.ro
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Program</h3>
                      <p className="text-muted-foreground">
                        Luni - Vineri: 07:00 - 18:00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div 
                    id="contact-map" 
                    className="w-full h-80 rounded-lg bg-muted flex items-center justify-center"
                    data-testid="contact-map"
                  >
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Hartă interactivă</p>
                      <p className="text-sm text-muted-foreground">Str. Barajului nr. 19, Cornetu, Ilfov</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
