import mongoose from "mongoose";
import type { Types } from "mongoose";
const Schema = mongoose.Schema;
import type { MessageData, UserData, ChatBoxData } from "@/package/types/chatbox"

/******* User Schema *******/
interface UserDocument extends Omit<UserData, "id" | "chatBoxes">,
  mongoose.Document {
    chatBoxes: Types.ObjectId[];
}

interface UserModel extends mongoose.Model<UserDocument> {}

const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  chatBoxes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "ChatBox",
    },
  ],
});

const UserModel = mongoose.model<UserDocument, UserModel>("User", UserSchema);

/******* Message Schema *******/
interface MessageDocument extends Omit<MessageData, "id" | "sender" | "chatBox" >,
  mongoose.Document {
    sender: Types.ObjectId;
    chatBox: Types.ObjectId;
}

interface MessageModel extends mongoose.Model<MessageDocument> {}

const MessageSchema = new Schema<MessageDocument>({
  chatBox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatBox",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  body: {
    type: String,
    required: [true, "Body field is required."],
  },
});

const MessageModel = mongoose.model<MessageDocument, MessageModel>("Message", MessageSchema);

/******* ChatBox Schema *******/
interface ChatBoxDocument extends Omit<ChatBoxData, "id" | "users" | "messages">,
  mongoose.Document {
    users: Types.ObjectId[];
    messages: Types.ObjectId[];
}

interface ChatBoxModel extends mongoose.Model<ChatBoxDocument> {}

const ChatBoxSchema = new Schema<ChatBoxDocument>({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const ChatBoxModel = mongoose.model<ChatBoxDocument, ChatBoxModel>("ChatBox", ChatBoxSchema);

export { UserModel, MessageModel, ChatBoxModel };
