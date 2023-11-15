"use client"

import { useChat } from '@/context/chat';
import { Input } from 'antd';
import { useState, useRef, useEffect } from 'react';
import Message from '@/components/Message';
import Title from '@/components/Title';
import ChatModal from '@/components/ChatModal';
import { useUser } from '@/context/user'
import { useToast } from '@/components/ui/use-toast';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatBoxWrapper, ChatBoxesWrapper, FootRef } from './_components/Wrapper';


export default function Chat() {
  const { messages, /*displayStatus, */sendMessage, startChat } = useChat();
  const { me } = useUser();
  const [body, setBody] = useState<string>("");
  const [msgSent, setMsgSent] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>(""); // 設定為目前被點選的 chatbox
  const [modalOpen, setModalOpen] = useState<boolean>(false); // 控制Modal的開關
  const [chatBoxes, setChatBoxes] = useState<any>([]); // displayed  chat boxes
  const [friend, setFriend] = useState<string>(""); // store the person to whom I send messages 
  const { toast } = useToast();
  const displayChat = (chat: any) => {
    return (
      (chat.length === 0) ? (
        <p style={{ color: '#ccc' }}> No messages... </p>
      ) : (
          <ChatBoxWrapper>
            {chat.map(({name, body}: {name: string, body: string}, i: string) => (
              <Message isMe={(name === me)} message={body} key={i}></Message>
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

  const createChatBox = (friend: string) => {
    if (chatBoxes.some(({key}: {key: string}) => key === friend)) {
      throw new Error(friend +"'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    setChatBoxes([...chatBoxes, { 
      label: friend, 
      children: chat,
      key: friend 
    }]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey: string, activeKey: string) => {
    const index = chatBoxes.findIndex(({key}: {key: string}) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({key}: {key: string}) => key !== targetKey);
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
      const index = chatBoxes.findIndex(({key}: {key: string}) => key === activeKey);
      const chat = extractChat(friend);
      const newChatBoxes = [...chatBoxes.slice(0, index), {label: activeKey, children: chat, key: activeKey}, ...chatBoxes.slice(index+1,)];
      setChatBoxes(newChatBoxes);
      setMsgSent(true);
    }
  }, [messages]);

  return (
      <>
        <Title name={me}></Title>
        <>
          <ChatBoxesWrapper
            tabBarStyle={{height: '36px'}}
            type='editable-card'
            activeKey={activeKey}
            onChange={(key) => {
              setFriend(key);
              setActiveKey(key);
              startChat(me, key);
            }}
            onEdit={(targetKey: any, action: string) => { // 按下 '+' 後會觸發 onEdit, 傳入 action = 'add'
                if (action === "add")  // 開啟⼀個 Modal, 讓使⽤者填入 new chatbox label
                  setModalOpen(true);
                else if (action === "remove") // 按下 'x' 後會觸發 onEdit, 傳入 action = 'remove'
                  setActiveKey(removeChatBox(targetKey, activeKey)); // 按下 'x' 後會觸發 onEdit, 傳入 action = 'remove'
            }}
            items={chatBoxes}
          >
            {/* <FootRef ref={msgFooter}/> */}
          </ChatBoxesWrapper>
          <ChatModal
            open={modalOpen}
            onCreate={({ name }: { name: string }) => { // 按下 Create 後的動作
                setFriend(name);
                startChat(me, name);
                setActiveKey(createChatBox(name));
                setModalOpen(false);
            }} // can send message to myself
            onCancel={() => setModalOpen(false)} // 按下 Cancel 後的動作
          />
        </>
        <Input.Search
          enterButton="Send"
          style={{ background: "#097fed", borderRadius: "0.5rem"}}
          placeholder="Type a message here..."

          value={body}
          onChange={(e) => setBody(e.target.value)}
          onSearch={(msg) => {
            if (!msg) {
              toast({
                title: "Error",
                description: "Name or to is required!",
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

  )
}
