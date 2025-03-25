import { Message } from "@/contexts/ChatContext";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "audio":
        return (
          <audio controls src={message.mediaUrl} className="max-w-full">
            Your browser does not support the audio element.
          </audio>
        );
      case "file":
        return (
          <div className="flex flex-col">
            <span>{message.text}</span>
            <a 
              href={message.mediaUrl} 
              download 
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download File
            </a>
          </div>
        );
      default:
        return message.text;
    }
  };

  return (
    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
        message.isBot
          ? "bg-secondary text-secondary-foreground"
          : "bg-primary text-primary-foreground"
      }`}>
        {renderMessage(message)}
      </div>
    </div>
  );
};