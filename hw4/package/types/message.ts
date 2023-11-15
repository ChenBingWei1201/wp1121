import { User } from "./user";

export type Message = {
  content: string;
  senderId: User["name"];
  timestamp: Date;
};
