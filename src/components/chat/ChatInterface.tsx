import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface ChatInterfaceProps {
  recipientName: string;
  recipientAvatar?: string;
  vehicleId?: string;
  onClose: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "user1",
    text: "Hi, is this car still available?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "read",
  },
  {
    id: "2",
    senderId: "user2",
    text: "Yes, it is! Would you like to schedule a viewing?",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: "read",
  },
];

export default function ChatInterface({
  recipientName,
  recipientAvatar,
  vehicleId,
  onClose,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user1",
      text: newMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl flex flex-col h-[600px] z-50">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            {recipientAvatar ? (
              <img
                src={recipientAvatar}
                alt={recipientName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                👤
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold">{recipientName}</h3>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === "user1" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${message.senderId === "user1" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
            >
              <p>{message.text}</p>
              <div
                className={`text-xs mt-1 ${message.senderId === "user1" ? "text-blue-100" : "text-gray-500"}`}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
