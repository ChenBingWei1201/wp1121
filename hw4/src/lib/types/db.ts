export type User = {
  id: string;
  username: string;
  provider: "github" | "credentials";
};

export type Chatroom = {
  id: string;
  name: string;
};

export type Message = {
  id: string;
  content: string;
  senderId: User["id"];
  timestamp: Date;
};
