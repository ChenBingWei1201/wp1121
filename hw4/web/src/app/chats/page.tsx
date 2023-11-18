"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";

import ChatModal from "@/components/ChatModal";
import Message from "@/components/Message";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useChat } from "@/context/chat";
import type { AMessage } from "@/context/chat";
import { useUser } from "@/context/user";

import InputForm from "./_components/InputForm";
import {
  ChatBoxWrapper,
  ChatBoxesWrapper,
  FootRef,
} from "./_components/Wrapper";

type ChatBoxType = {
  label: string;
  children: JSX.Element;
  key: string;
};

export default function Chat() {
  const { messages, startChat } = useChat();
  const { me } = useUser();
  const [msgSent, setMsgSent] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [chatBoxes, setChatBoxes] = useState<ChatBoxType[]>([]);
  const [friend, setFriend] = useState<string>("");

  const msgFooter = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    } as ScrollIntoViewOptions);
  };

  const displayChat = (chat: AMessage[]) => {
    return chat.length === 0 ? (
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <ChatBoxWrapper>
        {chat.map(({ name, body }, i) => (
          <Message isMe={name === me} message={body} key={i}></Message>
        ))}
        <FootRef ref={msgFooter}></FootRef>
      </ChatBoxWrapper>
    );
  };

  const extractChat = (friend: string) => {
    const ch = displayChat(
      messages.filter(({ name }) => name === friend || name === me),
    );
    return ch;
  };

  const createChatBox = (friend: string) => {
    if (chatBoxes.some(({ key }: { key: string }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    setChatBoxes([
      ...chatBoxes,
      {
        label: friend,
        children: chat,
        key: friend,
      },
    ]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (
    targetKey:
      | string
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>,
    activeKey: string,
  ) => {
    const index = chatBoxes.findIndex(
      ({ key }: { key: string }) => key === activeKey,
    );
    const newChatBoxes = chatBoxes.filter(
      ({ key }: { key: string }) => key !== targetKey,
    );
    setChatBoxes(newChatBoxes);

    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1].key
        : activeKey
      : "";
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent, chatBoxes]);

  useEffect(() => {
    if (chatBoxes.length !== 0) {
      const index = chatBoxes.findIndex(
        ({ key }: { key: string }) => key === activeKey,
      );
      const chat = extractChat(friend);
      const newChatBoxes = [
        ...chatBoxes.slice(0, index),
        { label: activeKey, children: chat, key: activeKey },
        ...chatBoxes.slice(index + 1),
      ];
      setChatBoxes(newChatBoxes);
      setMsgSent(true);
    }
  }, [messages, activeKey, friend, chatBoxes, extractChat]);

  return (
    <>
      <Title />
      <>
        <ChatBoxesWrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key: string) => {
            setFriend(key);
            setActiveKey(key);
            startChat(me, key);
          }}
          onEdit={(
            targetKey:
              | string
              | React.MouseEvent<Element, MouseEvent>
              | React.KeyboardEvent<Element>,
            action: string,
          ) => {
            if (action === "add") setModalOpen(true);
            else if (action === "remove")
              setActiveKey(removeChatBox(targetKey, activeKey));
          }}
          items={chatBoxes}
        ></ChatBoxesWrapper>
        <ChatModal
          open={modalOpen}
          onCreate={({ name }: { name: string }) => {
            setFriend(name);
            startChat(me, name);
            setActiveKey(createChatBox(name));
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        />
      </>
      <InputForm setMsgSent={setMsgSent} activeKey={activeKey} />
      <Link href={`/auth/signout`}>
        <Button
          type={"submit"}
          className="hover:bg-slate-200"
          style={{ background: "#097fed", margin: "1rem" }}
        >
          Sign Out
        </Button>
      </Link>
    </>
  );
}
