"use client";
// import { MessagesContext } from "@/context/message";
// import { UserContext } from "@/context/me";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Message, useChat } from "@/context/chat";
import AMessage from "./Message";
import { useUser } from "@/context/user";
import Avatar from "./Avatar";
import styled from 'styled-components';
import { useRef } from "react";

const ChatBoxWrapper = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px
`;


function ChatRoomMessages() {
  const { messages, displayStatus, sendMessage, startChat } = useChat();
  const { me, setMe } = useUser();
  const [body, setBody] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [activeKey, setActiveKey] = useState(""); // 設定為目前被點選的 chatbox
  const [modalOpen, setModalOpen] = useState(false); // 控制Modal的開關
  const [chatBoxes, setChatBoxes] = useState([]); // displayed  chat boxes
  const [friend, setFriend] = useState(""); // store the person to whom I send messages 
  const router = useRouter();

  const displayChat = (chat: Message[]) => {
    return (
      (chat.length === 0) ? (
        <p style={{ color: '#ccc' }}> No messages... </p>
      ) : (
          <ChatBoxWrapper>
            {chat.map(({name, body}, i) => (
              <AMessage isMe={(name === me)} message={body} key={i}></AMessage>
              ))
            }
            <FootRef ref={msgFooter}></FootRef>
          </ChatBoxWrapper>
        )
    );
  }

  const extractChat = (friend: string) => { // call it two times
    const ch = displayChat(messages.filter(({name}) => ((name === friend) || (name === me))));
    return ch;
  }

  useEffect(() => {
    if (!me) {
      router.push("/");
      return;
    }
  }, [me, router]);

  const removeChatBox = (targetKey: string, activeKey: string) => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBoxes);

    return ( // 判斷刪除 targetKey 後，如何更新 activeKey
      activeKey ? 
        activeKey === targetKey ?
          index === 0 ?
          "" : chatBoxes[index-1].key
        : activeKey
      : ""
      );
  }

  // 超過視窗⾼度的留⾔可以⾃動上捲
  const msgFooter = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView
    ({ behavior: 'smooth', block: "start" } as ScrollIntoViewOptions);
  }

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    if (chatBoxes.length !== 0) {
      const index = chatBoxes.findIndex(({key}) => key === activeKey);
      const chat = extractChat(friend);
      const newChatBoxes: any = [...chatBoxes.slice(0, index), {label: activeKey, children: chat, key: activeKey}, ...chatBoxes.slice(index+1,)];
      setChatBoxes(newChatBoxes);
      setMsgSent(true);
    }
  }, [messages]);

  return (
    <div className="px-2 pt-4">
      {messages?.map((message, index) => {
        const isSender = message.senderId === me?.displayId;
        return (
          <div key={index} className="w-full pt-1">
            <div
              className={`flex flex-row items-end gap-2 ${
                isSender && "justify-end"
              }`}
            >
              {!isSender && (
                <Avatar
                  displayId={message.senderId}
                  classname="bg-black text-white w-8 h-8"
                />
              )}
              <div
                className={`max-w-[60%] rounded-2xl px-3 py-1 leading-6 ${
                  isSender ? "bg-black text-white" : " bg-gray-200 text-black"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatRoomMessages;
