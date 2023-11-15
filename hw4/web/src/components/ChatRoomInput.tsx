"use client";
import { useChat } from "@/context/chat";
import { useUser } from "@/context/user";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      });
      return;
    }
    if (!me) {
      toast({
        title: "Error",
        description: "Username required!",
        variant: "destructive",
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
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="bg-black text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
}

export default ChatRoomInput;
