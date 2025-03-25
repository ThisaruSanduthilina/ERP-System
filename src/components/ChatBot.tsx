import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, RefreshCw } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { sendChatMessage, resetChat } from "@/services/chatService";
import { toast } from "./ui/use-toast";
import { ChatWindow } from "./chat/ChatWindow";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const { currentChatId, createNewChat, addMessageToChat } = useChat();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!currentChatId) return;

    // Add user message to chat
    addMessageToChat(currentChatId, {
      text,
      isBot: false,
      timestamp: new Date(),
      type: "text"
    });

    try {
      // Send message to API and get response
      const response = await sendChatMessage(text);

      // Add bot response to chat
      addMessageToChat(currentChatId, {
        text: response,
        isBot: true,
        timestamp: new Date(),
        type: "text"
      });
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResetChat = async () => {
    try {
      setIsResetting(true);
      await resetChat();
      createNewChat(); // Create a new chat after reset
      toast({
        title: "Success",
        description: "Chat history has been reset.",
      });
    } catch (error) {
      console.error('Error resetting chat:', error);
      toast({
        title: "Error",
        description: "Failed to reset chat. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleSendAudio = (blobUrl: string) => {
    if (currentChatId) {
      addMessageToChat(currentChatId, {
        text: "🎤 Voice Message",
        isBot: false,
        timestamp: new Date(),
        mediaUrl: blobUrl,
        type: "audio"
      });
    }
  };

  const handleSendFile = (file: File) => {
    if (currentChatId) {
      const reader = new FileReader();
      reader.onload = () => {
        addMessageToChat(currentChatId, {
          text: `📎 ${file.name}`,
          isBot: false,
          timestamp: new Date(),
          mediaUrl: reader.result as string,
          type: "file"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpen = () => {
    if (!currentChatId) {
      createNewChat();
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? "inset-0"
        : "bottom-8 right-8"
    }`}>
      {isOpen ? (
        <ChatWindow
          isExpanded={isExpanded}
          onClose={handleClose}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          onSendMessage={handleSendMessage}
          onSendAudio={handleSendAudio}
          onSendFile={handleSendFile}
          onResetChat={handleResetChat}
          isResetting={isResetting}
        />
      ) : (
        <Button
          onClick={handleOpen}
          className={`rounded-full w-16 h-16 shadow-lg ${isAnimating ? 'animate-bounce hover:animate-none' : ''} relative`}
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};