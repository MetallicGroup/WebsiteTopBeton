import { useState, useRef, useEffect } from "react";
import { Calculator, X, Send, ArrowLeft } from "lucide-react";

type Stage =
  | "welcome"
  | "name"
  | "phone"
  | "email"
  | "zona"
  | "strada"
  | "cantitate"
  | "pompa"
  | "clasa"
  | "calculating"
  | "result"
  | "error";

interface Message {
  from: "bot" | "user";
  text: string;
  buttons?: { label: string; value: string }[];
}

const CLASE_BETON = [
  "C 8/10",
  "C 12/15",
  "C 16/20",
  "C 20/25",
  "C 25/30",
  "C 30/37",
];

export default function PriceCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zona: "",
    strada: "",
    cantitate: 0,
    pompa: "",
    clasa: "",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !["pompa", "clasa", "calculating", "result", "error", "welcome"].includes(stage)) {
      inputRef.current.focus();
    }
  }, [isOpen, stage]);

  function addBotMessage(text: string, buttons?: { label: string; value: string }[]) {
    setMessages((prev) => [...prev, { from: "bot", text, buttons }]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  function openChat() {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            from: "bot",
            text: "Bună! Sunt calculatorul de preț Top Beton. Vă ajut să aflați costul betonului livrat la adresa dumneavoastră.",
          },
          {
            from: "bot",
            text: "Care este numele dumneavoastră?",
          },
        ]);
        setStage("name");
      }, 300);
    }
  }

  function resetChat() {
    setMessages([]);
    setStage("welcome");
    setInputValue("");
    setFormData({
      name: "",
      phone: "",
      email: "",
      zona: "",
      strada: "",
      cantitate: 0,
      pompa: "",
      clasa: "",
    });
    setTimeout(() => {
      setMessages([
        {
          from: "bot",
          text: "Bună! Sunt calculatorul de preț Top Beton. Vă ajut să aflați costul betonului livrat la adresa dumneavoastră.",
        },
        {
          from: "bot",
          text: "Care este numele dumneavoastră?",
        },
      ]);
      setStage("name");
    }, 300);
  }

  async function handleSubmit() {
    const value = inputValue.trim();
    if (!value) return;

    setInputValue("");
    addUserMessage(value);

    switch (stage) {
      case "name":
        setFormData((p) => ({ ...p, name: value }));
        setTimeout(() => {
          addBotMessage("Care este numărul dumneavoastră de telefon?");
          setStage("phone");
        }, 400);
        break;

      case "phone":
        setFormData((p) => ({ ...p, phone: value }));
        setTimeout(() => {
          addBotMessage("Care este adresa de email?");
          setStage("email");
        }, 400);
        break;

      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setTimeout(() => addBotMessage("Adresa de email nu pare validă. Încercați din nou:"), 400);
          return;
        }
        setFormData((p) => ({ ...p, email: value }));
        setTimeout(() => {
          addBotMessage("În ce zonă / localitate se află proiectul? (ex: Bragadiru, Clinceni, Popești-Leordeni)");
          setStage("zona");
        }, 400);
        break;
      }

      case "zona":
        setFormData((p) => ({ ...p, zona: value }));
        setTimeout(() => {
          addBotMessage("Care este strada exactă a proiectului?");
          setStage("strada");
        }, 400);
        break;

      case "strada":
        setFormData((p) => ({ ...p, strada: value }));
        setTimeout(() => {
          addBotMessage("De câți metri cubi (mc) aveți nevoie?");
          setStage("cantitate");
        }, 400);
        break;

      case "cantitate": {
        const mc = parseFloat(value.replace(",", "."));
        if (isNaN(mc) || mc <= 0) {
          setTimeout(() => addBotMessage("Introduceți o valoare validă (ex: 12)"), 400);
          return;
        }
        setFormData((p) => ({ ...p, cantitate: mc }));
        setTimeout(() => {
          addBotMessage("Doriți turnare cu pompă?", [
            { label: "Cu pompă", value: "DA" },
            { label: "Fără pompă", value: "NU" },
          ]);
          setStage("pompa");
        }, 400);
        break;
      }

      default:
        break;
    }
  }

  function handleButtonClick(value: string) {
    if (stage === "pompa") {
      addUserMessage(value === "DA" ? "Cu pompă" : "Fără pompă");
      setFormData((p) => ({ ...p, pompa: value }));
      setTimeout(() => {
        addBotMessage(
          "Alegeți clasa de beton:",
          CLASE_BETON.map((c) => ({ label: c, value: c }))
        );
        setStage("clasa");
      }, 400);
    } else if (stage === "clasa") {
      addUserMessage(value);
      const updatedData = { ...formData, clasa: value };
      setFormData(updatedData);
      setStage("calculating");

      setTimeout(() => {
        addBotMessage("Se calculează prețul...");
        calculatePrice(updatedData);
      }, 400);
    }
  }

  async function calculatePrice(data: typeof formData) {
    try {
      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        setStage("error");
        addBotMessage(result.message || "A apărut o eroare. Încercați din nou.");
        setTimeout(() => {
          addBotMessage("Doriți să reîncercați?", [
            { label: "Da, reîncerc", value: "retry" },
          ]);
        }, 500);
        return;
      }

      setStage("result");
      addBotMessage(
        `TOTAL cu TVA inclus: ${result.totalCuTVA} lei\n\n` +
          `Detalii:\n` +
          `• Beton ${data.clasa}: ${result.costBeton} lei (${result.pretMC} lei/mc × ${data.cantitate} mc)\n` +
          `• Transport: ${result.costTransport} lei (${result.kmOneWay} km, ${result.drumuri} ${result.drumuri === 1 ? "transport" : "transporturi"})\n` +
          `• Pompă: ${result.costPompa} lei\n` +
          `• Total fără TVA: ${result.totalFaraTVA} lei\n\n` +
          `Oferta a fost trimisă pe email la ${data.email}. Un agent vă va contacta în scurt timp!`
      );
      setTimeout(() => {
        addBotMessage("Doriți o altă ofertă?", [
          { label: "Calculează din nou", value: "retry" },
        ]);
      }, 800);
    } catch {
      setStage("error");
      addBotMessage("A apărut o eroare de conexiune. Încercați din nou.");
      setTimeout(() => {
        addBotMessage("Doriți să reîncercați?", [
          { label: "Da, reîncerc", value: "retry" },
        ]);
      }, 500);
    }
  }

  function handleRetry() {
    resetChat();
  }

  const showInput = ["name", "phone", "email", "zona", "strada", "cantitate"].includes(stage);

  function getPlaceholder(): string {
    switch (stage) {
      case "name": return "Numele dumneavoastră...";
      case "phone": return "07xx xxx xxx";
      case "email": return "email@exemplu.ro";
      case "zona": return "Ex: Bragadiru, Clinceni...";
      case "strada": return "Strada și numărul...";
      case "cantitate": return "Ex: 12";
      default: return "";
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
          data-testid="button-open-calculator"
        >
          <span className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-[#2d7a50] border border-[#2d7a50]/20 opacity-90 group-hover:opacity-100 transition-opacity hidden sm:block">
            Calculator Preț
          </span>
          <div className="w-16 h-16 bg-[#2d7a50] rounded-full shadow-xl flex items-center justify-center hover:bg-[#246841] transition-colors hover:scale-105 transform duration-200">
            <Calculator className="w-7 h-7 text-white" />
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200" data-testid="chatbot-window">
          <div className="bg-[#2d7a50] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Calculator Preț</h3>
                <p className="text-xs text-white/80">Top Beton SRL</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {stage !== "welcome" && messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Reîncepe"
                  data-testid="button-reset-chat"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                data-testid="button-close-calculator"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" data-testid="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-[#2d7a50] text-white rounded-br-md"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                  {msg.buttons && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.buttons.map((btn) => (
                        <button
                          key={btn.value}
                          onClick={() =>
                            btn.value === "retry" ? handleRetry() : handleButtonClick(btn.value)
                          }
                          className="bg-[#2d7a50] hover:bg-[#246841] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                          data-testid={`button-option-${btn.value}`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {stage === "calculating" && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 rounded-bl-md">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#2d7a50] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-[#2d7a50] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-[#2d7a50] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showInput && (
            <div className="p-3 bg-white border-t border-gray-200 flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type={stage === "email" ? "email" : "text"}
                  inputMode={stage === "cantitate" ? "decimal" : stage === "phone" ? "tel" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#2d7a50] focus:ring-1 focus:ring-[#2d7a50]"
                  data-testid="input-chat"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-[#2d7a50] hover:bg-[#246841] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
