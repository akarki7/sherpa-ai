"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mountain,
  X,
  Minus,
  Send,
  Trash2,
  MoreVertical,
  MessageSquare,
} from "lucide-react";

/* ─── types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_CHIPS = [
  "Best trek for beginners?",
  "Everest Base Camp difficulty",
  "Altitude sickness tips",
  "What permits do I need?",
];

/** Predefined answers when API is unavailable; key phrases (lowercase) → answer */
const PREDEFINED_ANSWERS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["best trek", "beginner", "beginners", "easy trek", "first trek"],
    answer:
      "**Best treks for beginners in Nepal:**\n\n- **Ghorepani Poon Hill** — 4–5 days, lower altitude, teahouse comfort, and stunning Annapurna views. Perfect first trek.\n- **Langtang Valley** — 7–8 days, less crowded, beautiful valleys and Tamang culture.\n- **Mardi Himal** — 5–6 days, quieter alternative to Annapurna Base Camp with great mountain views.\n\nStart with Poon Hill for the easiest introduction; Langtang if you want something longer and more remote.",
  },
  {
    keywords: ["everest base camp", "ebc", "everest difficulty", "how hard is everest"],
    answer:
      "**Everest Base Camp (EBC)** is a moderate–challenging trek: about **12–14 days** round trip from Lukla. You’ll reach **5,364 m (17,598 ft)**. No technical climbing, but altitude and long days make it tough. Good fitness and prior high-altitude experience help. Acclimatization days are built in (e.g. Namche, Dingboche). Best seasons: **March–May** and **September–November**.",
  },
  {
    keywords: ["altitude", "sickness", "ams", "acclimatization", "altitude sickness"],
    answer:
      "**Altitude sickness tips:**\n\n- **Go slow** — don’t gain more than 300–500 m sleeping altitude per day above 3,000 m.\n- **Stay hydrated** and avoid alcohol.\n- **Acclimatize** — use rest days (e.g. Namche, Dingboche on EBC).\n- **Know the signs** — headache, nausea, dizziness, fatigue; descend if they worsen.\n- **Consider Diamox** (acetazolamide) after talking to a doctor; it’s not a substitute for sensible ascent.",
  },
  {
    keywords: ["permit", "permits", "visa", "trekking permit", "what do i need"],
    answer:
      "**Permits for trekking in Nepal:**\n\n- **TIMS** (Trekkers’ Information Management System) — required for most treks; get it in Kathmandu or Pokhara.\n- **National Park / Conservation Area permit** — e.g. Sagarmatha (Everest), Annapurna, Langtang; buy at park entry or in Kathmandu/Pokhara.\n- **Restricted areas** (e.g. Upper Mustang, Manaslu) need a **special permit** and usually a guide.\n\nYour **visa** is separate (on arrival or e-visa). Bring passport photos and cash for permits.",
  },
  {
    keywords: ["when to go", "best time", "season", "weather"],
    answer:
      "**Best time to trek in Nepal:**\n\n- **Autumn (Sept–Nov)** — clear skies, stable weather, great views. Most popular.\n- **Spring (March–May)** — warmer, rhododendrons in bloom, busier.\n- **Winter (Dec–Feb)** — cold at higher altitude but often clear; lower trails are fine.\n- **Monsoon (June–Aug)** — rain, leeches, and clouds; good for rain-shadow areas like Upper Mustang.",
  },
  {
    keywords: ["gear", "equipment", "what to pack", "packing"],
    answer:
      "**Essential trekking gear:**\n\n- **Layers** — base, fleece, down jacket, rain shell.\n- **Good boots** (broken in), thick socks, gaiters for snow/mud.\n- **Daypack**, headlamp, sunscreen, hat, sunglasses.\n- **Sleeping bag** (teahouses have blankets but can be thin).\n- **First aid** — blister kit, pain relief, any personal meds; consider Diamox for altitude after consulting a doctor.\n\nYou can rent or buy a lot in Kathmandu/Pokhara if you travel light.",
  },
];

function getPredefinedAnswer(userMessage: string): string | null {
  const normalized = userMessage.toLowerCase().trim();
  if (!normalized) return null;
  for (const { keywords, answer } of PREDEFINED_ANSWERS) {
    if (keywords.some((k) => normalized.includes(k))) return answer;
  }
  return null;
}

/* ─── simple markdown renderer ─── */
function renderMarkdown(text: string) {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Check if it's a bullet list
    const lines = trimmed.split("\n");
    const isList = lines.every(
      (l) => l.trim().startsWith("- ") || l.trim().startsWith("* ") || l.trim() === "",
    );

    if (isList && lines.filter((l) => l.trim()).length > 0) {
      return (
        <ul key={bi} className="list-disc list-inside space-y-0.5 my-1">
          {lines
            .filter((l) => l.trim())
            .map((l, li) => (
              <li key={li} className="text-[13px] leading-relaxed">
                {renderInline(l.trim().replace(/^[-*]\s*/, ""))}
              </li>
            ))}
        </ul>
      );
    }

    // Regular paragraph
    return (
      <p key={bi} className="text-[13px] leading-relaxed my-1">
        {lines.map((line, li) => (
          <Fragment key={li}>
            {li > 0 && <br />}
            {renderInline(line)}
          </Fragment>
        ))}
      </p>
    );
  });
}

function renderInline(text: string) {
  // Handle **bold** and *italic*
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[2]}
        </strong>,
      );
    } else if (match[3]) {
      parts.push(
        <em key={match.index} className="italic">
          {match[3]}
        </em>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}

/* ─── component ─── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Scroll to bottom on new messages */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* Close menu on outside click */
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  /* Send message */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setHasInteracted(true);
      setInput("");

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error || `API error ${res.status}`,
          );
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last.role === "assistant") {
              updated[updated.length - 1] = {
                ...last,
                content: last.content + chunk,
              };
            }
            return updated;
          });
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant" && !last.content) {
            const userMsg = updated[updated.length - 2];
            const userQuestion =
              userMsg?.role === "user" ? userMsg.content : "";
            const fallback =
              getPredefinedAnswer(userQuestion) ||
              "I’m having trouble connecting right now. Try again in a moment, or ask about things like best treks for beginners, Everest Base Camp, altitude tips, or permits — I can still help with those.";
            updated[updated.length - 1] = {
              ...last,
              content: fallback,
            };
          }
          return updated;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([]);
    setHasInteracted(false);
    setShowMenu(false);
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-50 bottom-[88px] right-6 w-[380px] h-[520px] max-md:bottom-[148px] max-md:right-2 max-md:left-2 max-md:w-auto max-md:h-[calc(100vh-220px)] flex flex-col rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center shrink-0">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Sherpa Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-gray-500 truncate">
                  Ask me anything about trekking in Nepal
                </p>
              </div>

              {/* Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-40 rounded-lg bg-card-light border border-white/10 shadow-xl overflow-hidden">
                    <button
                      onClick={clearChat}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear chat
                    </button>
                  </div>
                )}
              </div>

              {/* Minimize */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
              {messages.length === 0 && !hasInteracted && (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-forest/15 border border-forest/20 flex items-center justify-center">
                    <Mountain className="w-7 h-7 text-forest-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Welcome to Sherpa AI</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-[240px]">
                      Your trekking assistant for Nepal. Ask about routes,
                      safety, gear, or permits.
                    </p>
                  </div>

                  {/* Quick chips */}
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => {
                          setIsOpen(true);
                          sendMessage(chip);
                        }}
                        className="px-3 py-1.5 text-xs font-medium text-forest-light bg-forest/10 border border-forest/20 rounded-full hover:bg-forest/20 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      msg.role === "user"
                        ? "bg-forest text-white rounded-br-md"
                        : "bg-card-light border border-white/5 text-gray-200 rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      msg.content ? (
                        <div className="prose-sm">{renderMarkdown(msg.content)}</div>
                      ) : (
                        /* Typing indicator for empty assistant message during loading */
                        <div className="flex items-center gap-1 py-1 px-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                        </div>
                      )
                    ) : (
                      <p className="text-[13px] leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-white/5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about trekking in Nepal..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 bg-card-light border border-white/10 rounded-xl text-sm text-foreground placeholder:text-gray-500 focus:border-forest focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="shrink-0 w-10 h-10 flex items-center justify-center bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-[76px] md:bottom-6 right-6 z-50 group"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-forest/30 animate-ping" />

        {/* Button body */}
        <div className="relative w-14 h-14 rounded-full bg-forest border-2 border-forest-light/30 flex items-center justify-center shadow-lg shadow-forest/30 hover:bg-forest-light transition-colors">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageSquare className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Mountain className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI badge */}
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-amber text-black rounded-full leading-none">
            AI
          </span>
        </div>
      </motion.button>
    </>
  );
}
