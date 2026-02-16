import { useState, useRef, useEffect } from "react";
import { Calculator, X, Send, ArrowLeft } from "lucide-react";

interface ChatbotConfig {
  welcomeMessages: string[];
  steps: { id: string; botMessage: string; placeholder: string; inputType: string }[];
  pumpQuestion: string;
  pumpOptions: { label: string; value: string }[];
  classQuestion: string;
  concreteClasses: string[];
  calculatingMessage: string;
  errorMessage: string;
  connectionErrorMessage: string;
  invalidEmailMessage: string;
  invalidQuantityMessage: string;
  retryButtonLabel: string;
  newCalcButtonLabel: string;
  resultTemplate: string;
  newCalcQuestion: string;
  headerTitle: string;
  headerSubtitle: string;
  buttonLabel: string;
}

interface Message {
  from: "bot" | "user";
  text: string;
  buttons?: { label: string; value: string }[];
}

export default function PriceCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [stage, setStage] = useState<"idle" | "steps" | "pompa" | "clasa" | "calculating" | "result" | "error">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/chatbot-config")
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && stage === "steps") {
      inputRef.current.focus();
    }
  }, [isOpen, stage, currentStepIndex]);

  function addBotMessage(text: string, buttons?: { label: string; value: string }[]) {
    setMessages((prev) => [...prev, { from: "bot", text, buttons }]);
  }

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  function openChat() {
    setIsOpen(true);
    if (!config) return;
    if (messages.length === 0) {
      startConversation();
    }
  }

  function startConversation() {
    if (!config) return;
    const welcomeMsgs: Message[] = config.welcomeMessages.map((text) => ({ from: "bot" as const, text }));
    const firstStepMsg: Message = { from: "bot", text: config.steps[0]?.botMessage || "" };

    setTimeout(() => {
      setMessages([...welcomeMsgs, firstStepMsg]);
      setCurrentStepIndex(0);
      setStage("steps");
    }, 300);
  }

  function resetChat() {
    setMessages([]);
    setCurrentStepIndex(-1);
    setStage("idle");
    setInputValue("");
    setFormData({});
    setTimeout(() => startConversation(), 100);
  }

  function handleSubmit() {
    if (!config) return;
    const value = inputValue.trim();
    if (!value) return;

    const currentStep = config.steps[currentStepIndex];
    if (!currentStep) return;

    if (currentStep.inputType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setInputValue("");
        setTimeout(() => addBotMessage(config.invalidEmailMessage), 400);
        return;
      }
    }

    if (currentStep.inputType === "decimal") {
      const num = parseFloat(value.replace(",", "."));
      if (isNaN(num) || num <= 0) {
        setInputValue("");
        setTimeout(() => addBotMessage(config.invalidQuantityMessage), 400);
        return;
      }
    }

    setInputValue("");
    addUserMessage(value);

    const newFormData = { ...formData, [currentStep.id]: value };
    setFormData(newFormData);

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < config.steps.length) {
      setTimeout(() => {
        addBotMessage(config.steps[nextIndex].botMessage);
        setCurrentStepIndex(nextIndex);
      }, 400);
    } else {
      setTimeout(() => {
        addBotMessage(config.pumpQuestion, config.pumpOptions);
        setStage("pompa");
      }, 400);
    }
  }

  function handleButtonClick(value: string) {
    if (!config) return;

    if (stage === "pompa") {
      const label = config.pumpOptions.find((o) => o.value === value)?.label || value;
      addUserMessage(label);
      setFormData((p) => ({ ...p, pompa: value }));
      setTimeout(() => {
        addBotMessage(
          config.classQuestion,
          config.concreteClasses.map((c) => ({ label: c, value: c }))
        );
        setStage("clasa");
      }, 400);
    } else if (stage === "clasa") {
      addUserMessage(value);
      const updatedData = { ...formData, clasa: value };
      setFormData(updatedData);
      setStage("calculating");

      setTimeout(() => {
        addBotMessage(config.calculatingMessage);
        calculatePrice(updatedData);
      }, 400);
    }
  }

  async function calculatePrice(data: Record<string, string>) {
    if (!config) return;
    try {
      const payload = {
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        zona: data.zona || "",
        strada: data.strada || "",
        cantitate: parseFloat((data.cantitate || "0").replace(",", ".")),
        pompa: data.pompa || "NU",
        clasa: data.clasa || "",
      };

      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        setStage("error");
        addBotMessage(result.message || config.errorMessage);
        setTimeout(() => {
          addBotMessage("", [{ label: config.retryButtonLabel, value: "retry" }]);
        }, 500);
        return;
      }

      setStage("result");

      const resultText = config.resultTemplate
        .replace("{totalCuTVA}", result.totalCuTVA)
        .replace("{totalFaraTVA}", result.totalFaraTVA)
        .replace("{costBeton}", result.costBeton)
        .replace("{costPompa}", result.costPompa)
        .replace("{costTransport}", result.costTransport)
        .replace("{pretMC}", result.pretMC)
        .replace("{cantitate}", data.cantitate || "0")
        .replace("{clasa}", data.clasa || "")
        .replace("{kmOneWay}", result.kmOneWay)
        .replace("{drumuri}", result.drumuri)
        .replace("{drumuriLabel}", result.drumuri === 1 ? "transport" : "transporturi")
        .replace("{email}", data.email || "");

      addBotMessage(resultText);
      setTimeout(() => {
        addBotMessage(config.newCalcQuestion, [
          { label: config.newCalcButtonLabel, value: "retry" },
        ]);
      }, 800);
    } catch {
      setStage("error");
      addBotMessage(config.connectionErrorMessage);
      setTimeout(() => {
        addBotMessage("", [{ label: config.retryButtonLabel, value: "retry" }]);
      }, 500);
    }
  }

  function handleRetry() {
    resetChat();
  }

  const showInput = stage === "steps";
  const currentStep = config?.steps[currentStepIndex];

  function getInputMode(): string {
    if (!currentStep) return "text";
    if (currentStep.inputType === "decimal") return "decimal";
    if (currentStep.inputType === "tel") return "tel";
    return "text";
  }

  if (!config) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
          data-testid="button-open-calculator"
        >
          <span className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-[#2d7a50] border border-[#2d7a50]/20 opacity-90 group-hover:opacity-100 transition-opacity hidden sm:block">
            {config.buttonLabel}
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
                <h3 className="font-bold text-sm">{config.headerTitle}</h3>
                <p className="text-xs text-white/80">{config.headerSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {stage !== "idle" && messages.length > 0 && (
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

          {showInput && currentStep && (
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
                  type={currentStep.inputType === "email" ? "email" : "text"}
                  inputMode={getInputMode() as any}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentStep.placeholder}
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
