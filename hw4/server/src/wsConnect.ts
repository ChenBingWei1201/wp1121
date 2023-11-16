import { ChatBoxModel, MessageModel, UserModel } from "./models/chatbox.ts";

const sendData = (data: any, ws: any) => {
  ws.send(JSON.stringify(data));
};

const sendStatus = (payload: any, ws: any) => {
  sendData(["status", payload], ws);
};

const broadcastMessage = (
  wss: any,
  data: any,
  status: { type: string; msg: string },
) => {
  wss.clients.forEach((client: any) => {
    sendData(data, client);
    sendStatus(status, client);
  });
};

const chatBoxes: any = {};

const makeName = (name: string, to: string) => {
  return [name, to].sort().join("_");
};

const validateChatBox = async (chatBoxName: string, participants: any[]) => {
  let box = await ChatBoxModel.findOne({ name: chatBoxName });
  const user1: any = await UserModel.findOne({ _id: participants[0] });
  const user2: any = await UserModel.findOne({ _id: participants[1] });

  if (!box) {
    box = await new ChatBoxModel({
      name: chatBoxName,
      users: participants,
    }).save();
    user1.chatBoxes = [...user1.chatBoxes, box._id];
    await user1.save();

    if (user1.name !== user2.name) {
      user2.chatBoxes = [...user2.chatBoxes, box._id];
      await user2.save();
    }
  }
  return box.populate(["users", { path: "messages", populate: "sender" }]);
};

const validateUser = async (name: string) => {
  let user = await UserModel.findOne({ name: name });
  if (!user) {
    user = new UserModel({ name: name });
    try {
      await user.save();
    } catch (e) {
      throw new Error("User addition error: " + e);
    }
  }
  return user._id;
};

//rack
const refreshChatBox = async (chatBoxName: string, body: string) => {
  const existing: any = await ChatBoxModel.findOne({ name: chatBoxName });
  if (existing) {
    existing.messages = [...existing.messages, body];

    try {
      await existing.save();
    } catch (e) {
      throw new Error("Update message failed: " + e);
    }
  }
};

type Payload = {
  name: string;
  to: string;
  body?: string;
};

export default {
  onMessage: (wss: any, ws: any) => async (byteString: any) => {
    const { data } = byteString;
    const [task, payload]: [string, Payload] = JSON.parse(data);
    switch (task) {
      case "CHAT": {
        const { name, to } = payload;
        const chatBoxName: string = makeName(name, to);

        if (!chatBoxes[chatBoxName]) chatBoxes[chatBoxName] = new Set();

        chatBoxes[chatBoxName].add(ws);

        if (ws.box !== "" && chatBoxes[ws.box]) chatBoxes[ws.box].delete(ws);

        ws.box = chatBoxName;
        const Name = await validateUser(name);
        const To = await validateUser(to);

        let initData: any = [];
        const chatBox = await validateChatBox(chatBoxName, [Name, To]);
        const chatMessages: any = chatBox.messages;

        chatMessages.map((cM: any) => {
          const m: Payload = {
            name: cM.sender.name,
            to: (
              chatBox.users.filter((user: any) => {
                if (cM.sender.name === to) return user.name !== to;
                else return user.name === to;
              })[0] as any
            ).name,
            body: cM.body,
          };
          initData = [...initData, m];
        });

        sendData(["init", initData], ws);
        break;
      }
      case "MESSAGE": {
        const { name, to, body } = payload;
        const chatBoxName = makeName(name, to);
        const message: any = new MessageModel({
          chatBox: (await ChatBoxModel.findOne({ name: chatBoxName }))?._id,
          sender: (await UserModel.findOne({ name: name }))?._id,
          body: body,
        });

        refreshChatBox(chatBoxName, message);

        try {
          await message.save();
        } catch (e: any) {
          throw new Error(e);
        }

        broadcastMessage(wss, ["output", [payload]], {
          type: "success",
          msg: "Message sent.",
        });
        break;
      }
      // case 'CLEAR':{
      //   const { name, to, body } = payload;

      // broadcastMessage(ws, ['cleared'], { type: 'info', msg: 'Message cache cleared.' });
      //   break;
      // }
      default:
        break;
    }
  },
};
