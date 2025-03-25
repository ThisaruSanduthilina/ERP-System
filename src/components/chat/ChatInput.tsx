import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Paperclip, Mic, StopCircle } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import { toast } from "../ui/use-toast";
import { sendChatMessage } from "@/services/chatService";
import { useChat } from "@/contexts/ChatContext";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendAudio: (url: string) => void;
  onSendFile: (file: File) => void;
}

export const ChatInput = ({ onSendMessage, onSendAudio, onSendFile }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      onSendAudio(blobUrl);
      setIsRecording(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };


  const handleSendMessage = async (text: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { currentChatId, addMessageToChat } = useChat();
  
    if (!currentChatId) return;
  
    // Add user message locally
    addMessageToChat(currentChatId, {
      text,
      isBot: false,
      timestamp: new Date(),
      type: "text"
    });
  
    try {
      const botResponse = await sendChatMessage(text);
      // Add bot response to the chat
      addMessageToChat(currentChatId, {
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        type: "text"
      });
    } catch (error) {
      // Handle error, e.g., show toast or add error message to chat
    }
  };



  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      onSendFile(file);
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,application/pdf,.doc,.docx"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleVoiceRecord}
          className={isRecording ? "bg-red-100" : ""}
        >
          {isRecording ? (
            <StopCircle className="h-4 w-4 text-red-500" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};