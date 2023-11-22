"use client";

import { useState, createContext, useContext } from "react";

import client from "@/client/client";
import { useToast } from "@/components/ui/use-toast";

export type AMessage = {
  name: string;
  to: string;
  body: string;
};

type Data1 = (string | { name: string; to: string; body: string })[];
type Data2 = (string | { name: string; to: string })[];

export type ChatContext = {
  status: { type: string; msg: string };
  messages: AMessage[];
  sendMessage: (msg: AMessage) => void;
  clearMessages: () => void;
  startChat: (name: string, to: string) => void;
};

const ChatContext = createContext<ChatContext>({
  status: { type: "", msg: "" },
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
  startChat: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function ChatProvider({ children }: Props) {
  // const client = new WebSocket("ws://localhost:4000");

  const [messages, setMessages] = useState<AMessage[]>([]);
  const [status, setStatus] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });
  const { toast } = useToast();

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data); // is [] not {}
    switch (task) {
      case "init":
        setMessages(payload);
        break;
      case "output":
        setMessages(() => [...messages, ...payload]);
        // setMessages((ms) => ms.slice(0, -1));
        break;
      case "status":
        setStatus(payload);
        break;
      case "cleared":
        setMessages([]);
        break;
      default:
        break;
    }
  };

  const sendData = (data: Data1 | Data2) => {
    client.send(JSON.stringify(data));
  };

  const sendMessage = (msg: AMessage) => {
    const { name, to, body } = msg;
    if (!name || !to || !body) {
      toast({
        title: "Error",
        description: "Please add your friend to start a chat!",
        variant: "destructive",
        color: "red",
      });
      return;
    } else {
      setMessages([...messages, { name, to, body }]);
      sendData(["MESSAGE", { name, to, body }]);
      toast({
        title: "Success",
        description: "Messages send!",
        color: "green",
      });
    }
  };

  const clearMessages = () => {
    toast({
      title: "Success",
      description: "Messages cleared!",
      color: "green",
    });
    sendData(["clear"]);
  };

  const startChat = (name: string, to: string) => {
    if (!name || !to)
      toast({
        title: "Error",
        description: "Name or to is required!",
        variant: "destructive",
        color: "red",
      });
    else sendData(["CHAT", { name, to }]);
  };

  return (
    <ChatContext.Provider
      value={{
        status,
        messages,
        sendMessage,
        clearMessages,
        startChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
