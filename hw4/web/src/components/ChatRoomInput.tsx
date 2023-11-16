"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useChat } from "@/context/chat";
import { useUser } from "@/context/user";

import { useToast } from "./ui/use-toast";

function ChatRoomInput() {
  const { toast } = useToast();
  const { sendMessage } = useChat();
  const { me } = useUser();
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (!me) {
      toast({
        title: "Error",
        description: "Username required!",
        variant: "destructive",
        color: "red",
      });
      router.push("/");
      return;
    }
  }, [me, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      toast({
        title: "Error",
        description: "Message content required!",
        variant: "destructive",
        color: "red",
      });
      return;
    }
    if (!me) {
      toast({
        title: "Error",
        description: "Username required!",
        variant: "destructive",
        color: "red",
      });
      return;
    }
    sendMessage({ body: content, name: me, to: "all" }); // bug!
    setContent("");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-md flex-1 rounded-md border border-gray-300 p-1 outline-none transition duration-200 ease-in-out focus:border-gray-600"
      />
      <button
        type="submit"
        className="rounded-lg bg-black px-2 py-1 text-sm text-white transition duration-200 ease-in-out hover:bg-gray-700"
      >
        Send
      </button>
    </form>
  );
}

export default ChatRoomInput;
