import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from "@/contexts/ChatContext";
import { MessageCircle, X, Maximize2, Minimize2, Plus, RefreshCw } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
  onSendMessage: (text: string) => void;
  onSendAudio: (blobUrl: string) => void;
  onSendFile: (file: File) => void;
  onResetChat: () => void;
  isResetting: boolean;
}

export const ChatWindow = ({
  isExpanded,
  onClose,
  onToggleExpand,
  onSendMessage,
  onSendAudio,
  onSendFile,
  onResetChat,
  isResetting
}: ChatWindowProps) => {
  const { chats, currentChatId, createNewChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  return (
    <Card className={`transition-all duration-300 ${
      isExpanded 
        ? "w-full h-full rounded-none"
        : "w-96 h-[600px]"
    } flex flex-col overflow-hidden`}>
      <div className="p-3 border-b flex justify-between items-center bg-primary text-primary-foreground shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">RamaDBK Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={createNewChat}
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onResetChat}
            disabled={isResetting}
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            <RefreshCw className={`h-4 w-4 ${isResetting ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpand} 
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="current" className="flex-1 flex flex-col min-h-0">
        <TabsList className="px-4 py-2 shrink-0 sticky top-[57px] bg-white z-10">
          <TabsTrigger value="current">Current Chat</TabsTrigger>
          <TabsTrigger value="history">Chat History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="flex-1 flex flex-col p-0 m-0 h-full">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="mt-auto border-t">
            <ChatInput 
              onSendMessage={onSendMessage}
              onSendAudio={onSendAudio}
              onSendFile={onSendFile}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="flex-1 p-4 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {chats.map((chat) => (
                <Card key={chat.id} className="p-4 cursor-pointer hover:bg-accent">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">{chat.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.messages[chat.messages.length - 1]?.text || "No messages"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};