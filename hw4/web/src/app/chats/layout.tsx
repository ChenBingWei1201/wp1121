"use client";

import React from "react";

import { ChatProvider } from "@/context/chat";

import { Wrapper } from "./_components/Wrapper";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <ChatProvider>
      <Wrapper>{children}</Wrapper>
    </ChatProvider>
  );
};

export default layout;
