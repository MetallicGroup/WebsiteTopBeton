import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { QuoteRequest } from "@shared/schema";

export function useSubmitQuote() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: QuoteRequest) => {
      const res = await apiRequest("POST", "/api/quotes", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mulțumim!",
        description: "Mesajul a fost trimis cu succes. Revenim în cel mai scurt timp.",
        duration: 5000,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    },
  });
}
