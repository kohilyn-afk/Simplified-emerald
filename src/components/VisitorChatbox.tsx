import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight, Minimize2, Trash2, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TreeSectionDivider } from './TreeSilhouettes';

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
            className="pointer-events-auto w-[calc(100vw-2.5rem)] sm:w-[410px] h-[550px] max-h-[82vh] bg-[#0c2117] border border-[#e5b958]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-3 backdrop-blur-md relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#112d1f] via-[#143625] to-[#0d2318] p-4 border-b border-[#1f4a33] flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-[#1c4832] border border-[#e5b958]/50 flex items-center justify-center text-[#90d0a7] shadow-inner">
                    <Bot className="w-5 h-5 text-[#f3d38c]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#34d399] border-2 border-[#0c2117]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm text-[#f2faf5]">
                      Koh I-Lyn Advisory AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#e5b958]/15 text-[#f3d38c] border border-[#e5b958]/30 font-semibold">
                      Gemini 3.6
                    </span>
                  </div>
                  <p className="text-[11px] text-[#90d0a7] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#34d399]" />
                    <span>FCCA & Sustainability Concierge</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg text-[#90d0a7]/70 hover:text-[#f3d38c] hover:bg-[#1a402d] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize Chat"
                  className="p-1.5 rounded-lg text-[#90d0a7] hover:text-[#f2faf5] hover:bg-[#1a402d] transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-[#091710]/80">
              
              {/* Privacy/Greeting Notice */}
              <div className="bg-[#122e20]/60 border border-[#1f4d36] rounded-xl p-3 text-[11px] text-[#a3c9b3] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#e5b958] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#f2faf5]">C-Suite Executive AI Assistant:</span> Ask about Bursa ESG reporting, MFRS accounting standards, TNB utility invoice OCR, or custom advisory engagements.
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
                    <span className="text-[10px] font-mono text-[#78a58a]">
                      {msg.role === 'user' ? 'You' : 'Advisory AI'} • {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#1d4832] to-[#153a27] text-[#f2faf5] border border-[#2b6144] rounded-tr-none'
                        : 'bg-[#10271c] text-[#e2f1e8] border border-[#1e4632] rounded-tl-none relative group'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>

                    {/* Action buttons embedded in assistant replies */}
                    {msg.role === 'assistant' && (
                      <div className="mt-3 pt-2.5 border-t border-[#1a3d2a] flex flex-wrap gap-2">
                        {onOpenProposalModal && (
                          <button
                            onClick={() => onOpenProposalModal('Inquiry via Visitor AI Chat')}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#e5b958]/15 hover:bg-[#e5b958]/25 text-[#f3d38c] border border-[#e5b958]/40 flex items-center gap-1.5 transition-all"
                          >
                            <span>Request Proposal</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                        {onScrollToScopePlanner && (
                          <button
                            onClick={() => {
                              onScrollToScopePlanner();
                              setIsOpen(false);
                            }}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#183d2a] hover:bg-[#204f37] text-[#90d0a7] border border-[#27593e] flex items-center gap-1.5 transition-all"
                          >
                            <span>Scope Planner</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#90d0a7] bg-[#10271c] p-3 rounded-2xl border border-[#1e4632] w-fit">
                  <Bot className="w-4 h-4 text-[#f3d38c] animate-pulse" />
                  <span className="font-mono text-[11px]">Koh I-Lyn AI is analyzing...</span>
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#90d0a7] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#90d0a7] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#90d0a7] animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 3 && (
              <div className="p-3 bg-[#0c2117] border-t border-[#1f4a33] space-y-1.5">
                <span className="text-[10px] font-mono text-[#90d0a7] font-semibold uppercase tracking-wider block">
                  Suggested Enquiries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {INITIAL_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={isLoading}
                      className="text-[11px] text-[#c3e3d0] bg-[#122e20] hover:bg-[#1a3d2c] border border-[#235239] hover:border-[#e5b958]/40 px-2.5 py-1 rounded-lg text-left transition-all duration-150 disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-[#0a1e14] border-t border-[#1f4a33]">
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
                  className="flex-1 bg-[#122c1f] border border-[#235239] rounded-xl px-3.5 py-2 text-xs text-[#f2faf5] placeholder-[#6b967e] focus:outline-none focus:border-[#e5b958] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#1d4832] to-[#153a27] border border-[#e5b958]/50 hover:border-[#e5b958] text-[#f3d38c] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-[#5d856d] font-mono">
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
        className="pointer-events-auto relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0e2a1d] via-[#143c29] to-[#0c2317] border border-[#e5b958]/60 text-[#f2faf5] shadow-2xl gold-glow hover:border-[#e5b958] transition-all"
      >
        {/* Unread / Pulse Indicator */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5b958] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#e5b958]" />
          </span>
        )}

        <div className="w-7 h-7 rounded-full bg-[#1b432e] border border-[#e5b958]/40 flex items-center justify-center text-[#f3d38c]">
          {isOpen ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-xs font-display font-bold text-[#f2faf5] flex items-center gap-1.5">
            <span>Visitor Advisory Chat</span>
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          </div>
          <div className="text-[10px] text-[#90d0a7] font-mono">Ask Koh I-Lyn AI</div>
        </div>
      </motion.button>

    </div>
  );
};
