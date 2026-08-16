import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight, Minimize2, Trash2, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isFallback?: boolean;
}

interface VisitorChatboxProps {
  onOpenProposalModal?: (topic: string) => void;
  onScrollToScopePlanner?: () => void;
}

const INITIAL_SUGGESTIONS = [
  'What are Bursa Malaysia Scope 1-3 requirements?',
  'How does MFRS handle carbon liabilities?',
  'How does TNB OCR automated extraction work?',
  'How can I request an advisory proposal?',
];

export const VisitorChatbox: React.FC<VisitorChatboxProps> = ({
  onOpenProposalModal,
  onScrollToScopePlanner,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        'Welcome to Koh I-Lyn & Co. I am your C-Suite Advisory Assistant. How can I assist you today with Bursa Malaysia ESG compliance, MFRS accounting, or C-Suite data analytics?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = (customMessage || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!customMessage) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          userContext: {
            page: 'Koh I-Lyn & Co Advisory Portal',
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback: data.isFallback,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Koh I-Lyn is available directly for C-Suite consultations. Would you like to request an official proposal or launch our interactive Scope Planner?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          'Conversation history reset. How can Koh I-Lyn & Co assist your organization today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      
      {/* --- EXPANDED CHAT CONTAINER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto w-[calc(100vw-2.5rem)] sm:w-[410px] h-[550px] max-h-[82vh] bg-[#ffffff] border border-[#d4af37]/60 rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.22)] flex flex-col overflow-hidden mb-3 backdrop-blur-md relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ffffff] via-[#fdf6e7] to-[#faedd0] p-4 border-b border-[#ebd7a7] flex items-center justify-between relative shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#ffffff] border border-[#d4af37]/70 flex items-center justify-center text-[#825e0e] shadow-sm">
                    <Bot className="w-5 h-5 text-[#cba135]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#cba135] border-2 border-[#ffffff]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm text-[#1c1917]">
                      Koh I-Lyn Advisory AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#faedd0] text-[#7a5910] border border-[#edd59b] font-semibold">
                      Gemini 3.6
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786a59] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#cba135]" />
                    <span>FCCA & Sustainability Concierge</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg text-[#8a7b69] hover:text-[#825e0e] hover:bg-[#f5e9d2] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize Chat"
                  className="p-1.5 rounded-lg text-[#8a7b69] hover:text-[#1c1917] hover:bg-[#f5e9d2] transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-[#fdfbf7]">
              
              {/* Privacy/Greeting Notice */}
              <div className="bg-[#ffffff] border border-[#ebd7a7] rounded-xl p-3 text-[11px] text-[#554c41] flex items-start gap-2.5 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#cba135] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1c1917]">C-Suite Executive AI Assistant:</span> Ask about Bursa ESG reporting, MFRS accounting standards, TNB utility invoice OCR, or custom advisory engagements.
                </div>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-mono text-[#8a7b69]">
                      {msg.role === 'user' ? 'You' : 'Advisory AI'} • {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#fbf2dc] to-[#f5e2b7] text-[#1c1917] border border-[#e8ce90] rounded-tr-none font-medium'
                        : 'bg-[#ffffff] text-[#2c261e] border border-[#ebd8b0] rounded-tl-none relative group'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Action buttons embedded in assistant replies */}
                    {msg.role === 'assistant' && (
                      <div className="mt-3 pt-2.5 border-t border-[#ebd8b0] flex flex-wrap gap-2">
                        {onOpenProposalModal && (
                          <button
                            onClick={() => onOpenProposalModal('Inquiry via Visitor AI Chat')}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#fcf5e3] hover:bg-[#faedd0] text-[#7a5910] border border-[#edd59b] flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Request Proposal</span>
                            <ArrowRight className="w-3 h-3 text-[#cba135]" />
                          </button>
                        )}
                        {onScrollToScopePlanner && (
                          <button
                            onClick={() => {
                              onScrollToScopePlanner();
                              setIsOpen(false);
                            }}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#ffffff] hover:bg-[#faf4e6] text-[#6a4f12] border border-[#e5cb87] flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Scope Planner</span>
                            <ExternalLink className="w-3 h-3 text-[#cba135]" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#825e0e] bg-[#ffffff] p-3 rounded-2xl border border-[#ebd8b0] w-fit shadow-2xs">
                  <Bot className="w-4 h-4 text-[#cba135] animate-pulse" />
                  <span className="font-mono text-[11px]">Koh I-Lyn AI is analyzing...</span>
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cba135] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cba135] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cba135] animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 3 && (
              <div className="p-3 bg-[#ffffff] border-t border-[#ebd8b0] space-y-1.5">
                <span className="text-[10px] font-mono text-[#825e0e] font-semibold uppercase tracking-wider block">
                  Suggested Enquiries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={isLoading}
                      className="text-[11px] text-[#4a4237] bg-[#fbf6ec] hover:bg-[#faeed3] border border-[#ebd7a7] hover:border-[#cba135] px-2.5 py-1 rounded-lg text-left transition-all duration-150 disabled:opacity-50 cursor-pointer"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-[#fdfaf4] border-t border-[#ebd7a7]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Koh I-Lyn AI..."
                  disabled={isLoading}
                  className="flex-1 bg-[#ffffff] border border-[#ebd8b0] rounded-xl px-3.5 py-2 text-xs text-[#1c1917] placeholder-[#9a8c7b] focus:outline-none focus:border-[#cba135] focus:ring-1 focus:ring-[#cba135] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-9 h-9 rounded-xl gold-gradient-btn flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#1a1506]" />
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-[#8a7b69] font-mono">
                Powered by Gemini 3.6 Flash • Koh I-Lyn & Co Advisory
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- COLLAPSED FLOATING TRIGGER BUTTON --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#ffffff] via-[#fefaf0] to-[#fbf2de] border border-[#d4af37]/80 text-[#1c1917] shadow-xl hover:border-[#b88a1b] transition-all cursor-pointer"
      >
        {/* Unread / Pulse Indicator */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cba135] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#cba135]" />
          </span>
        )}

        <div className="w-7 h-7 rounded-full bg-[#ffffff] border border-[#d4af37]/60 flex items-center justify-center text-[#825e0e] shadow-2xs">
          {isOpen ? <X className="w-4 h-4 text-[#cba135]" /> : <MessageSquare className="w-4 h-4 text-[#cba135]" />}
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-xs font-display font-bold text-[#1c1917] flex items-center gap-1.5">
            <span>Visitor Advisory Chat</span>
            <span className="w-2 h-2 rounded-full bg-[#cba135] animate-pulse" />
          </div>
          <div className="text-[10px] text-[#825e0e] font-mono">Ask Koh I-Lyn AI</div>
        </div>
      </motion.button>

    </div>
  );
};
