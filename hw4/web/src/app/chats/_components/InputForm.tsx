import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { Input } from "antd";

import { useToast } from "@/components/ui/use-toast";
import { useChat } from "@/context/chat";
import { useUser } from "@/context/user";

export default function InputForm({
  setMsgSent,
  activeKey,
}: {
  setMsgSent: Dispatch<SetStateAction<boolean>>;
  activeKey: string;
}) {
  const [body, setBody] = useState<string>("");
  const { toast } = useToast();
  const { me } = useUser();
  const { sendMessage } = useChat();

  return (
    <Input.Search
      enterButton="Send"
      style={{ background: "#097fed", borderRadius: "0.5rem" }}
      placeholder="Type a message here..."
      value={body}
      onChange={(e) => setBody(e.target.value)}
      onSearch={(msg) => {
        if (!msg) {
          toast({
            title: "Error",
            description: "message body required!",
            variant: "destructive",
            color: "red",
          });
          return;
        }
        sendMessage({ name: me, to: activeKey, body: msg });
        setBody("");
        setMsgSent(true);
      }}
    ></Input.Search>
  );
}
