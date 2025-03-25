import React, { createContext, useContext, useState } from "react";

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: "text" | "file" | "audio";
  mediaUrl?: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  addMessageToChat: (chatId: string, message: Omit<Message, "id">) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Math.random().toString(36).substring(7),
      title: `Chat ${chats.length + 1}`,
      messages: [{ 
        id: Math.random().toString(36).substring(7),
        text: "Hello! How can I help you today?", 
        isBot: true,
        timestamp: new Date(),
        type: "text"
      }],
      createdAt: new Date()
    };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const addMessageToChat = (chatId: string, message: Omit<Message, "id">) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { ...message, id: Math.random().toString(36).substring(7) }]
        };
      }
      return chat;
    }));
  };

  return (
    <ChatContext.Provider value={{ 
      chats, 
      currentChatId, 
      createNewChat, 
      selectChat, 
      addMessageToChat 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}