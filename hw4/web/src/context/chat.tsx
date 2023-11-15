"use client"
import { useState/*, useEffect*/, createContext, useContext } from "react";
// import { message } from 'antd'
import { useToast } from "@/components/ui/use-toast";

export type Message = {
    name: string;
    to: string;
    body: string;
};

export type ChatContext = {
    status: { type: string; msg: string };
    // displayStatus: (s: { type: string; msg: string }) => void;
    messages: Message[];
    sendMessage: (msg: Message) => void;
    clearMessages: () => void;
    startChat: (name: string, to: string) => void;
};

// 1. define context
const ChatContext = createContext<ChatContext>({
  status: {type: "", msg: ""},
  // displayStatus: () => {},
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
  startChat: () => {},
})

type Props = {
    children: React.ReactNode;
};

// 2. define context provider
export function ChatProvider ({ children }: Props) {
  const client = new WebSocket('ws://localhost:4000');

  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<{ type: string; msg: string }>({type: "", msg: ""});
  const { toast } = useToast();

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [ task, payload ] = JSON.parse(data); // is [] not {}
    switch (task) {
      case "init": 
        setMessages(payload);
        break;
      case "output":
        setMessages(() => [...messages, ...payload]);
        break;
      case "status":
        setStatus(payload);
        break;
      case "cleared":
        setMessages([]);
        break;
      default:
        break;
    };
  };

  const sendData = async (data: any) => {
    await client.send(JSON.stringify(data));
  };

  const sendMessage = (msg: Message) => {
    const { name, to , body } = msg;
    if (!name || !to || !body) {
      toast({
        title: "Error",
        description: "Your name, friend, or message are required!",
        variant: "destructive",
        color: "red",
      });
      return;
    }
    else {
      setMessages([...messages, { name, to , body }]); // msg = { name, to , body }
      sendData(["MESSAGE", { name, to , body }]);
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

  // const displayStatus = (s: { type: string; msg: string }) => {
  //   if(s.msg) {
  //     const { type, msg } = s;
  //     const content = { content: msg, duration: 0.75 };
  //     switch (type) {
  //       case 'success':
  //         message.success(content);
  //         break;
  //       case 'error':
  //         message.error(content);
  //         break;
  //       case 'info':
  //         message.info(content);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }

  const startChat = async (name: string, to: string) =>  {
    if (!name || !to)
      toast({
        title: "Error",
        description: "Name or to is required!",
        variant: "destructive",
        color: "red",
      });
    else
      await sendData(["CHAT", { name, to }]);
  }
  
  return (
    <ChatContext.Provider
      value={{
        status, messages,
        sendMessage, clearMessages, startChat
        }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// 3. Define Context Consumer
export const useChat = () => useContext(ChatContext);
