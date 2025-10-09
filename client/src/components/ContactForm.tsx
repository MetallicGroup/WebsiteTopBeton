import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nume: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere"),
  email: z.string().email("Adresa de email nu este validă"),
  telefon: z.string().optional(),
  mesaj: z.string().min(10, "Mesajul trebuie să aibă cel puțin 10 caractere"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nume: "",
      email: "",
      telefon: "",
      mesaj: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Here would be EmailJS or Formspree integration
      // For now, simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Mulțumim!",
        description: "Revenim în cel mai scurt timp.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Eroare",
        description: "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
        <FormField
          control={form.control}
          name="nume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume *</FormLabel>
              <FormControl>
                <Input {...field} data-testid="input-nume" />
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
                <Input type="email" {...field} data-testid="input-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input type="tel" {...field} data-testid="input-telefon" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mesaj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesaj *</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} data-testid="textarea-mesaj" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full btn-primary" 
          disabled={isSubmitting}
          data-testid="button-submit-contact"
        >
          {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
        </Button>
      </form>
    </Form>
  );
}
