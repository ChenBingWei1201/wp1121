/* self-defined schema type*/
export type UserData = {
  id: string;
  name: string;
  chatBoxes: ChatBoxData[];
};

export type MessageData = {
  id: string;
  sender: UserData;
  body: string;
  chatBox: ChatBoxData;
}

export type ChatBoxData= {
  id: string;
  name: string;
  users: UserData[];
  messages: MessageData[];
}


