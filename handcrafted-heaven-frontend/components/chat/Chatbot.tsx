"use client";

import React, { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send } from "lucide-react";

// Strict type contract for our message arrays
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

// Fixed Interface: 'reply' is a guaranteed string upon a successful response
interface ChatApiReply {
  reply: string;
  error?: string;
}

export default function Chatbot(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Strongly typed array state for our conversation tracking
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi! I am Haven Guide, your live platform expert. Looking for the highest-rated crafts or popular artisan collections today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll logic targeting the specific element reference type
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText: string = input.trim();
    setInput(""); // Clear input quickly for premium responsive UX

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Connect to your local Express backend sub-route file path
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const data: ChatApiReply = await response.json();

      if (response.ok && data.reply) {
        // TypeScript is happy now because data.reply is strictly typed as a string
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I'm having trouble fetching live marketplace data right now. Please try again shortly!",
          },
        ]);
      }
    } catch (error) {
      console.error("Frontend failed to connect to backend router:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Network error. Please make sure your Express backend server is up and running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING CHAT BALLOON TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* FLOATING CHAT INTERFACE WINDOW */}
      {isOpen && (
        <div className="flex h-[500px] w-80 flex-col rounded-2xl border border-gray-100 bg-white shadow-2xl transition-all sm:w-96">
          {/* HEADER LAYER */}
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
              <div>
                <h3 className="font-semibold text-sm leading-tight">
                  Haven Guide
                </h3>
                <span className="text-xs text-amber-100">
                  Marketplace Agent
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-amber-100 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* CHAT BUBBLE OVERFLOW PANEL */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3.5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap shadow-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* THREE-DOT LOADING SKELETON ANIMATION */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white border border-gray-100 px-4 py-3.5 shadow-sm">
                  <div className="flex space-x-1.5 items-center h-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* BOTTOM SUBMISSION ROW */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-gray-100 p-3 bg-white rounded-b-2xl flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Ask about trending items or product metrics..."
              className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-sm focus:border-amber-500 focus:outline-none transition-colors text-gray-800 bg-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-2 text-white shadow-md hover:opacity-95 disabled:opacity-40 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
