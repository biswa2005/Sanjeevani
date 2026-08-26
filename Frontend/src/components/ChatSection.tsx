import { useState, useRef, useEffect } from "react";
import { Send, Mic, AlertCircle, MessageSquareHeart, Globe } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const quickPrompts = [
  "Check my symptoms",
  "Set a medicine reminder",
  "Check vaccination schedule",
  "Find a hospital near me",
  "Give me a health tip",
];

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("fever") || lower.includes("temperature")) {
    return "I can help with your fever concern. A fever is generally defined as a temperature above 100.4°F (38°C). Please share: your current temperature, how long the fever has lasted, and any other symptoms like chills, body aches, or cough.\n\nIf your temperature exceeds 103°F (39.4°C) or you experience difficulty breathing, please seek immediate medical attention.";
  }
  if (lower.includes("headache") || lower.includes("migraine")) {
    return "Headaches can have several causes — tension, dehydration, stress, or migraine. Can you describe where the pain is located (front, back, sides) and how long you've had it?\n\nFor immediate relief: rest in a quiet, dark room, stay hydrated, and apply a cold or warm compress. For severe or sudden-onset headaches, please consult a doctor promptly.";
  }
  if (lower.includes("cough") || lower.includes("cold") || lower.includes("flu")) {
    return "Cough and cold symptoms are common but should be monitored. Please share: how long you've had these symptoms, whether you have a fever, and if there's any mucus or difficulty breathing.\n\nGeneral guidance: stay hydrated, rest, and consider honey-lemon water for throat comfort. If symptoms persist beyond 7 days or worsen, consult a healthcare professional.";
  }
  if (lower.includes("medicine") || lower.includes("medication") || lower.includes("remind") || lower.includes("reminder")) {
    return "I can help you set medication reminders. Please share:\n\n• Medication name\n• Dosage amount\n• Frequency (e.g., twice daily, after meals)\n• Start date\n\nI'll help you stay consistent with your treatment plan. Never alter prescribed dosages without consulting your doctor.";
  }
  if (lower.includes("vaccination") || lower.includes("vaccine") || lower.includes("immuniz")) {
    return "Vaccination schedules vary by age and health profile. Common vaccines to stay current on include:\n\n• Flu vaccine (annual)\n• COVID-19 (per current health authority guidelines)\n• Tetanus booster (every 10 years)\n\nFor children: the national immunization schedule includes BCG, DPT, Hepatitis B, and others.\n\nWhich vaccine or age group would you like specific information about?";
  }
  if (lower.includes("hospital") || lower.includes("clinic") || lower.includes("doctor") || lower.includes("near")) {
    return "I can help you find healthcare facilities nearby. To provide accurate recommendations, please share your location or area name.\n\nI can help you find:\n• Hospitals and emergency rooms\n• General clinics and family physicians\n• Specialist centers\n• Pharmacies\n\nFor emergencies, please call your local emergency number immediately.";
  }
  if (lower.includes("tip") || lower.includes("today") || lower.includes("health tip") || lower.includes("advice")) {
    return "Today's health tip: Stay hydrated throughout the day — aim for 8 glasses of water.\n\nProper hydration supports every organ, improves energy levels, aids digestion, and helps prevent common illnesses. If you find plain water boring, try adding a slice of lemon or cucumber.\n\nWould you like tips on nutrition, sleep, exercise, or preventive care?";
  }
  if (lower.includes("blood pressure") || lower.includes("bp") || lower.includes("hypertension")) {
    return "High blood pressure is a serious but manageable condition. Normal blood pressure is below 120/80 mmHg.\n\nGeneral lifestyle recommendations:\n• Reduce salt intake\n• Exercise regularly (30 min, 5 days/week)\n• Maintain a healthy weight\n• Avoid smoking and limit alcohol\n\nIf your readings are consistently above 130/80, please consult your doctor. Do not stop prescribed medication without medical advice.";
  }
  if (lower.includes("diabetes") || lower.includes("sugar") || lower.includes("glucose")) {
    return "Diabetes management requires consistent monitoring and care. If you're experiencing symptoms like frequent urination, excessive thirst, or unexplained fatigue, consult a doctor for proper testing.\n\nGeneral guidance:\n• Monitor blood glucose regularly\n• Follow a balanced, low-sugar diet\n• Stay physically active\n• Take medications as prescribed\n\nWould you like information on diet, monitoring, or finding a diabetes specialist?";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("namaste")) {
    return "Hello! I'm SANJEEVANI, your AI healthcare assistant. I'm here to help with:\n\n• Symptom guidance\n• Medicine reminders\n• Vaccination tracking\n• Preventive care tips\n• Finding nearby healthcare\n\nWhat can I help you with today?";
  }
  if (lower.includes("anxiety") || lower.includes("stress") || lower.includes("mental")) {
    return "Mental health is an important part of overall wellness. If you're experiencing anxiety or stress, some helpful strategies include:\n\n• Deep breathing exercises (4-7-8 technique)\n• Regular physical activity\n• Adequate sleep (7-9 hours)\n• Limiting caffeine and screen time before bed\n\nIf anxiety is significantly affecting your daily life, speaking with a mental health professional is strongly recommended. You are not alone.";
  }

  return "Thank you for reaching out to SANJEEVANI. To provide you with the most helpful guidance, could you describe your symptoms or health concern in more detail?\n\nI can assist with symptom information, medication reminders, vaccination schedules, preventive health tips, and finding nearby healthcare facilities.\n\nRemember: for emergencies or serious conditions, please contact emergency services or visit a healthcare facility immediately.";
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full bg-[#4ade80]/12 flex-shrink-0 flex items-center justify-center">
        <MessageSquareHeart size={12} className="text-[#4ade80]" />
      </div>
      <div className="bg-[#192019] rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-1.5 h-1.5 rounded-full bg-[#4ade80]/60"
            style={{ animation: `typing-bounce 1.2s ease-in-out ${delay}ms infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hello! I'm SANJEEVANI, your AI healthcare assistant.\n\nI can help you with symptom guidance, medicine reminders, vaccination tracking, preventive care, and finding nearby healthcare services.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: getAIResponse(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section id="assistant" className="py-24 relative">
      {/* Subtle background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(74,222,128,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-semibold text-[#4ade80] uppercase tracking-widest mb-4">AI Assistant</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#f2f4f1] mb-5 leading-tight">
                Meet your AI healthcare assistant.
              </h2>
              <p className="text-base text-[#7a8e7a] leading-relaxed">
                SANJEEVANI is designed for everyone — simple enough for users unfamiliar with AI,
                powerful enough to handle complex health questions across multiple languages.
              </p>
            </div>

            {/* Quick prompts */}
            <div>
              <p className="text-xs font-medium text-[#3d503d] uppercase tracking-wider mb-3">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="px-3 py-2 text-xs font-medium text-[#7a8e7a] bg-[#0d110e] border border-[#4ade80]/12 rounded-lg hover:border-[#4ade80]/35 hover:text-[#4ade80] transition-all duration-200 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {[
                "Understands symptoms in plain language",
                "Medication and vaccination reminders",
                "Finds nearby healthcare facilities",
                "Supports regional languages and voice",
                "Available 24/7 across platforms",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] flex-shrink-0" />
                  <span className="text-sm text-[#7a8e7a]">{item}</span>
                </div>
              ))}
            </div>

            {/* Safety notice */}
            <div className="p-4 rounded-xl border border-amber-500/15 bg-amber-500/4">
              <div className="flex gap-3">
                <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-400/80 leading-relaxed">
                  SANJEEVANI provides informational and preliminary health guidance. It does not replace
                  professional medical diagnosis or treatment. For emergencies, contact local emergency
                  services immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Chat interface */}
          <div
            className="rounded-2xl overflow-hidden border border-[#4ade80]/12 bg-[#0d110e] flex flex-col"
            style={{
              height: "640px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(74,222,128,0.04)",
            }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#4ade80]/10 bg-[#111814] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#4ade80]/12 flex items-center justify-center">
                  <MessageSquareHeart size={16} className="text-[#4ade80]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#f2f4f1]">SANJEEVANI AI</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"
                      style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                    />
                    <span className="text-[10px] text-[#4ade80]">Available</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#4ade80]/8 border border-[#4ade80]/15 text-xs text-[#4ade80] hover:bg-[#4ade80]/15 transition-colors cursor-pointer">
                <Globe size={11} />
                EN
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-7 h-7 rounded-full bg-[#4ade80]/12 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <MessageSquareHeart size={12} className="text-[#4ade80]" />
                    </div>
                  )}
                  <div className="max-w-[82%]">
                    <div
                      className={`px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "ai"
                          ? "bg-[#192019] text-[#f2f4f1] rounded-tl-sm"
                          : "bg-[#4ade80]/12 border border-[#4ade80]/15 text-[#f2f4f1] rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className="text-[9px] text-[#3d503d] mt-1 px-1">{msg.time}</p>
                  </div>
                </div>
              ))}

              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Disclaimer bar */}
            <div className="px-5 py-2 border-t border-[#4ade80]/8 bg-[#111814]/60 flex-shrink-0">
              <p className="text-[9px] text-[#3d503d] text-center">
                Preliminary health guidance only · Not a substitute for medical diagnosis · Emergency? Call local services
              </p>
            </div>

            {/* Input area */}
            <div className="px-4 py-4 border-t border-[#4ade80]/10 bg-[#111814] flex-shrink-0">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your symptoms or ask a health question…"
                  rows={1}
                  disabled={typing}
                  className="flex-1 resize-none bg-[#192019] border border-[#4ade80]/12 rounded-xl px-4 py-3 text-sm text-[#f2f4f1] placeholder-[#3d503d] focus:outline-none focus:border-[#4ade80]/35 transition-colors duration-200 disabled:opacity-50 leading-relaxed"
                  style={{ maxHeight: "120px", minHeight: "44px" }}
                />
                <button
                  className="w-10 h-10 rounded-xl bg-[#4ade80]/8 border border-[#4ade80]/15 flex items-center justify-center text-[#4ade80] hover:bg-[#4ade80]/18 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                  title="Voice input (coming soon)"
                  aria-label="Voice input"
                >
                  <Mic size={15} />
                </button>
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl bg-[#4ade80] flex items-center justify-center hover:bg-[#22c55e] transition-colors duration-200 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={15} className="text-[#070907]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
