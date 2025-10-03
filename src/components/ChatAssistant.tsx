import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { sendChatMessage } from '../services/chatService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  onOpenProject?: (projectSlug: string) => void;
  onOpenWindow?: (windowId: string) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  onOpenProject,
  onOpenWindow,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Shirin's assistant! Ask me about his projects or work. 😊",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'assistant' as const,
        content: m.content,
      }));

      const response = await sendChatMessage(input, history);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Handle actions
      if (response.shouldOpenProject && onOpenProject) {
        setTimeout(() => {
          onOpenProject(response.shouldOpenProject!);
        }, 500);
      }

      if (response.shouldOpenWindow && onOpenWindow) {
        setTimeout(() => {
          onOpenWindow(response.shouldOpenWindow!);
        }, 500);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div
        className="px-2 py-1.5 border-b-2 flex items-center gap-2"
        style={{
          background: 'linear-gradient(180deg, #0997ff 0%, #0053ee 100%)',
          borderColor: '#003399',
        }}
      >
        <Bot size={16} className="text-white" />
        <span className="text-white font-bold text-xs">Chat with Assistant</span>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-2 space-y-2"
        style={{
          backgroundColor: '#f0f0f0',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-1.5 ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: message.role === 'user' ? '#0053ee' : '#7f7f7f',
              }}
            >
              {message.role === 'user' ? (
                <User size={12} className="text-white" />
              ) : (
                <Bot size={12} className="text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className="max-w-[75%] rounded-lg px-2 py-1.5 shadow-sm"
              style={{
                backgroundColor: message.role === 'user' ? '#d1e7ff' : '#ffffff',
                border: '1px solid #999',
              }}
            >
              <p className="text-xs text-gray-900 leading-snug break-words">
                {message.content}
              </p>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-1.5">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#7f7f7f' }}
            >
              <Bot size={12} className="text-white" />
            </div>
            <div
              className="rounded-lg px-2 py-1.5"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #999',
              }}
            >
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className="border-t-2 p-1.5 flex gap-1.5"
        style={{
          backgroundColor: '#e8e8e8',
          borderColor: '#999',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 px-2 py-1.5 border-2 rounded text-xs"
          style={{
            borderColor: '#7f9db9',
            backgroundColor: '#ffffff',
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-3 py-1.5 rounded flex items-center gap-1.5 font-bold text-xs disabled:opacity-50"
          style={{
            background: 'linear-gradient(180deg, #0997ff 0%, #0053ee 100%)',
            color: 'white',
            border: '1px solid #003399',
          }}
        >
          <Send size={12} />
          Send
        </button>
      </div>
    </div>
  );
};
