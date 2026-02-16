import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Lock, LogOut, GripVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface StepConfig {
  id: string;
  botMessage: string;
  placeholder: string;
  inputType: string;
}

interface ChatbotConfig {
  welcomeMessages: string[];
  steps: StepConfig[];
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

export default function AdminChatbot() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setAuthToken(password);
        loadConfig();
      } else {
        toast({ title: "Parolă incorectă", variant: "destructive" });
      }
    } catch {
      toast({ title: "Eroare de conexiune", variant: "destructive" });
    }
    setLoading(false);
  }

  async function loadConfig() {
    try {
      const res = await fetch("/api/chatbot-config");
      const data = await res.json();
      setConfig(data);
    } catch {
      toast({ title: "Eroare la încărcarea configurării", variant: "destructive" });
    }
  }

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch("/api/chatbot-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Salvat cu succes! Modificările sunt active imediat." });
      } else {
        toast({ title: "Eroare la salvare", variant: "destructive" });
      }
    } catch {
      toast({ title: "Eroare de conexiune", variant: "destructive" });
    }
    setSaving(false);
  }

  function updateConfig<K extends keyof ChatbotConfig>(key: K, value: ChatbotConfig[K]) {
    setConfig((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateStep(index: number, field: keyof StepConfig, value: string) {
    if (!config) return;
    const newSteps = [...config.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    updateConfig("steps", newSteps);
  }

  function addStep() {
    if (!config) return;
    const newStep: StepConfig = {
      id: `step_${Date.now()}`,
      botMessage: "Mesaj nou...",
      placeholder: "Placeholder...",
      inputType: "text",
    };
    updateConfig("steps", [...config.steps, newStep]);
  }

  function removeStep(index: number) {
    if (!config) return;
    const newSteps = config.steps.filter((_, i) => i !== index);
    updateConfig("steps", newSteps);
  }

  function moveStep(index: number, direction: "up" | "down") {
    if (!config) return;
    const newSteps = [...config.steps];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newSteps.length) return;
    [newSteps[index], newSteps[swapIndex]] = [newSteps[swapIndex], newSteps[index]];
    updateConfig("steps", newSteps);
  }

  function addWelcomeMessage() {
    if (!config) return;
    updateConfig("welcomeMessages", [...config.welcomeMessages, ""]);
  }

  function removeWelcomeMessage(index: number) {
    if (!config) return;
    updateConfig("welcomeMessages", config.welcomeMessages.filter((_, i) => i !== index));
  }

  function updateWelcomeMessage(index: number, value: string) {
    if (!config) return;
    const msgs = [...config.welcomeMessages];
    msgs[index] = value;
    updateConfig("welcomeMessages", msgs);
  }

  function addConcreteClass() {
    if (!config) return;
    updateConfig("concreteClasses", [...config.concreteClasses, ""]);
  }

  function removeConcreteClass(index: number) {
    if (!config) return;
    updateConfig("concreteClasses", config.concreteClasses.filter((_, i) => i !== index));
  }

  function updateConcreteClass(index: number, value: string) {
    if (!config) return;
    const classes = [...config.concreteClasses];
    classes[index] = value;
    updateConfig("concreteClasses", classes);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-[#2d7a50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#2d7a50]" />
            </div>
            <CardTitle className="text-2xl">Admin Chatbot</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">Introduceți parola pentru a edita chatbot-ul</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola de admin..."
                className="text-center text-lg"
                data-testid="input-admin-password"
              />
              <Button
                type="submit"
                className="w-full bg-[#2d7a50] hover:bg-[#246841]"
                disabled={loading || !password}
                data-testid="button-admin-login"
              >
                {loading ? "Se verifică..." : "Autentificare"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-muted-foreground">Se încarcă configurarea...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-[#2d7a50] text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin — Editor Chatbot</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              data-testid="button-toggle-preview"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Ascunde previzualizare" : "Previzualizare"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              data-testid="button-save-config"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Se salvează..." : "Salvează modificările"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setIsAuthenticated(false); setPassword(""); setAuthToken(""); }}
              className="text-white hover:bg-white/20"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className={`container mx-auto px-4 py-8 ${showPreview ? 'grid lg:grid-cols-3 gap-8' : ''}`}>
        <div className={showPreview ? 'lg:col-span-2' : 'max-w-4xl mx-auto'}>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">Aspect chatbot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Titlu header</label>
                    <Input
                      value={config.headerTitle}
                      onChange={(e) => updateConfig("headerTitle", e.target.value)}
                      data-testid="input-header-title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Subtitlu header</label>
                    <Input
                      value={config.headerSubtitle}
                      onChange={(e) => updateConfig("headerSubtitle", e.target.value)}
                      data-testid="input-header-subtitle"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Text buton flotant</label>
                    <Input
                      value={config.buttonLabel}
                      onChange={(e) => updateConfig("buttonLabel", e.target.value)}
                      data-testid="input-button-label"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mesaje de bun venit</CardTitle>
                <p className="text-sm text-muted-foreground">Mesajele pe care chatbot-ul le afișează când se deschide</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {config.welcomeMessages.map((msg, i) => (
                  <div key={i} className="flex gap-2">
                    <Textarea
                      value={msg}
                      onChange={(e) => updateWelcomeMessage(i, e.target.value)}
                      className="flex-1"
                      rows={2}
                      data-testid={`input-welcome-${i}`}
                    />
                    {config.welcomeMessages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWelcomeMessage(i)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addWelcomeMessage} data-testid="button-add-welcome">
                  <Plus className="w-4 h-4 mr-2" /> Adaugă mesaj
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pașii conversației</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fiecare pas cere o informație de la utilizator. Ordinea contează.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {config.steps.map((step, i) => (
                  <div key={step.id} className="border rounded-xl p-4 bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-[#2d7a50]">Pas {i + 1}</span>
                        <span className="text-xs text-gray-400 font-mono">({step.id})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(i, "up")}
                          disabled={i === 0}
                          className="text-xs h-7 px-2"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStep(i, "down")}
                          disabled={i === config.steps.length - 1}
                          className="text-xs h-7 px-2"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(i)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-7 px-2"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Întrebarea bot-ului</label>
                        <Textarea
                          value={step.botMessage}
                          onChange={(e) => updateStep(i, "botMessage", e.target.value)}
                          rows={2}
                          data-testid={`input-step-message-${i}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Placeholder input</label>
                          <Input
                            value={step.placeholder}
                            onChange={(e) => updateStep(i, "placeholder", e.target.value)}
                            data-testid={`input-step-placeholder-${i}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Tip input</label>
                          <select
                            value={step.inputType}
                            onChange={(e) => updateStep(i, "inputType", e.target.value)}
                            className="w-full border rounded-md px-3 py-2 text-sm"
                            data-testid={`select-step-type-${i}`}
                          >
                            <option value="text">Text</option>
                            <option value="tel">Telefon</option>
                            <option value="email">Email</option>
                            <option value="decimal">Număr</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addStep} data-testid="button-add-step">
                  <Plus className="w-4 h-4 mr-2" /> Adaugă pas nou
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Opțiuni pompă și clase beton</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Întrebarea despre pompă</label>
                  <Input
                    value={config.pumpQuestion}
                    onChange={(e) => updateConfig("pumpQuestion", e.target.value)}
                    data-testid="input-pump-question"
                  />
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {config.pumpOptions.map((opt, i) => (
                      <div key={i}>
                        <label className="text-xs text-gray-500">Buton {i + 1} (valoare: {opt.value})</label>
                        <Input
                          value={opt.label}
                          onChange={(e) => {
                            const newOpts = [...config.pumpOptions];
                            newOpts[i] = { ...newOpts[i], label: e.target.value };
                            updateConfig("pumpOptions", newOpts);
                          }}
                          data-testid={`input-pump-option-${i}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Întrebarea despre clasă</label>
                  <Input
                    value={config.classQuestion}
                    onChange={(e) => updateConfig("classQuestion", e.target.value)}
                    data-testid="input-class-question"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.concreteClasses.map((cls, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Input
                          value={cls}
                          onChange={(e) => updateConcreteClass(i, e.target.value)}
                          className="w-28"
                          data-testid={`input-class-${i}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeConcreteClass(i)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={addConcreteClass} className="mt-2" data-testid="button-add-class">
                    <Plus className="w-4 h-4 mr-2" /> Adaugă clasă
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mesaje sistem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj calcul în progres</label>
                  <Input
                    value={config.calculatingMessage}
                    onChange={(e) => updateConfig("calculatingMessage", e.target.value)}
                    data-testid="input-calculating-msg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj eroare</label>
                  <Input
                    value={config.errorMessage}
                    onChange={(e) => updateConfig("errorMessage", e.target.value)}
                    data-testid="input-error-msg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj eroare conexiune</label>
                  <Input
                    value={config.connectionErrorMessage}
                    onChange={(e) => updateConfig("connectionErrorMessage", e.target.value)}
                    data-testid="input-connection-error-msg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj email invalid</label>
                  <Input
                    value={config.invalidEmailMessage}
                    onChange={(e) => updateConfig("invalidEmailMessage", e.target.value)}
                    data-testid="input-invalid-email-msg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mesaj cantitate invalidă</label>
                  <Input
                    value={config.invalidQuantityMessage}
                    onChange={(e) => updateConfig("invalidQuantityMessage", e.target.value)}
                    data-testid="input-invalid-qty-msg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Text buton reîncearcă</label>
                    <Input
                      value={config.retryButtonLabel}
                      onChange={(e) => updateConfig("retryButtonLabel", e.target.value)}
                      data-testid="input-retry-label"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Text buton calcul nou</label>
                    <Input
                      value={config.newCalcButtonLabel}
                      onChange={(e) => updateConfig("newCalcButtonLabel", e.target.value)}
                      data-testid="input-new-calc-label"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mesaj rezultat</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Variabile disponibile: {"{totalCuTVA}"}, {"{totalFaraTVA}"}, {"{costBeton}"}, {"{costPompa}"}, {"{costTransport}"}, {"{pretMC}"}, {"{cantitate}"}, {"{clasa}"}, {"{kmOneWay}"}, {"{drumuri}"}, {"{drumuriLabel}"}, {"{email}"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Șablon mesaj rezultat</label>
                  <Textarea
                    value={config.resultTemplate}
                    onChange={(e) => updateConfig("resultTemplate", e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                    data-testid="input-result-template"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Întrebare după rezultat</label>
                  <Input
                    value={config.newCalcQuestion}
                    onChange={(e) => updateConfig("newCalcQuestion", e.target.value)}
                    data-testid="input-new-calc-question"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 pb-8">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-[#2d7a50] hover:bg-[#246841] text-white font-bold py-6 text-lg"
              data-testid="button-save-bottom"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? "Se salvează..." : "Salvează modificările"}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Modificările sunt active imediat după salvare, fără nevoie de deploy.
            </p>
          </div>
        </div>

        {showPreview && (
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase">Previzualizare conversație</h3>
              <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-h-[600px] flex flex-col">
                <div className="bg-[#2d7a50] text-white px-4 py-3">
                  <h4 className="font-bold text-sm">{config.headerTitle}</h4>
                  <p className="text-xs text-white/80">{config.headerSubtitle}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {config.welcomeMessages.map((msg, i) => (
                    <div key={i} className="flex justify-start">
                      <div className="max-w-[85%] bg-white rounded-2xl px-4 py-2.5 text-sm shadow-sm border border-gray-100 rounded-bl-md">
                        {msg}
                      </div>
                    </div>
                  ))}
                  {config.steps.map((step, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-white rounded-2xl px-4 py-2.5 text-sm shadow-sm border border-gray-100 rounded-bl-md">
                          {step.botMessage}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="max-w-[85%] bg-[#2d7a50] text-white rounded-2xl px-4 py-2.5 text-sm rounded-br-md italic opacity-60">
                          {step.placeholder}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white rounded-2xl px-4 py-2.5 text-sm shadow-sm border border-gray-100 rounded-bl-md">
                      {config.pumpQuestion}
                      <div className="flex gap-2 mt-2">
                        {config.pumpOptions.map((opt) => (
                          <span key={opt.value} className="bg-[#2d7a50] text-white text-xs px-3 py-1.5 rounded-full">
                            {opt.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white rounded-2xl px-4 py-2.5 text-sm shadow-sm border border-gray-100 rounded-bl-md">
                      {config.classQuestion}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {config.concreteClasses.map((cls) => (
                          <span key={cls} className="bg-[#2d7a50] text-white text-xs px-3 py-1.5 rounded-full">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
