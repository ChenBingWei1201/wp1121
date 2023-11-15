import { ChatBoxModel, MessageModel, UserModel } from './models/chatbox.ts'

// let sD = 0
const sendData = (data: any, ws: any) => {
  // sD += 1;
  ws.send(JSON.stringify(data));
  //-----------debug------------//
  // if (data[0] === "init")
  //   console.log("init", sD);
  // else if (data[0] === "status")
  //   console.log("status", sD)
  // else if (data[0] === "output")
  //   console.log("output" ,sD);
}

const sendStatus = (payload: any, ws: any) => {
  sendData(["status", payload], ws);
}

const broadcastMessage = (wss: any, data: any, status: {type: string, msg: string}) => { // the biggest problem!!!
  wss.clients.forEach((client: any) => { // 8 things in wss.clients, so it will run 8 times!!!
    sendData(data, client);         // and generate two messages for success 
    sendStatus(status, client);
  });
};

const chatBoxes: any = {}; // 在 global scope 將 chatBoxes 宣告成空物件

// Utility function to ensure uniqueness of chatbox name
const makeName = (name: string, to: string) => {
  return [name, to].sort().join("_");
}

// To check out a chatbox with { chatBoxName, [sender, receiver] }
const validateChatBox = async (chatBoxName: string, participants: any[]) => {
  let box = await ChatBoxModel.findOne({ name: chatBoxName });
  const user1: any = await UserModel.findOne({ _id: participants[0] });
  const user2: any = await UserModel.findOne({ _id: participants[1] });

  if (!box) {
    box = await new ChatBoxModel({ name: chatBoxName, users: participants }).save();
    user1.chatBoxes = [...user1.chatBoxes, box._id];
    await user1.save();

    if (user1.name !== user2.name) { // can send message to myself
      user2.chatBoxes = [...user2.chatBoxes, box._id];
      await user2.save();
    }
  } // first new ChatBoxModel
  return box.populate(["users", { path: "messages", populate: "sender" }]);
};

// To add user
const validateUser = async (name: string) => { // problem: users should store chatBoxes(' name) where they participated.
  let user = await UserModel.findOne({ name: name });
  if (!user) {
    user = new UserModel({ name: name });  // , chatBoxes: [await ChatBoxModel.findOne({ name: makeName(name, to)})._id] 
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
  const existing: any = (await ChatBoxModel.findOne({ name: chatBoxName }));
  if (existing) {
    existing.messages = [...existing.messages, body];
    // await ChatBoxModel.deleteOne({ name: chatBoxName });
    try {
      await existing.save(); // update messages in specific chat box.
    } catch (e) {
      throw new Error("Update message failed: " + e);
    }
  }
}
///

type Payload = {
  name: string,
  to: string,
  body?: string
}

export default {
  onMessage: (wss: any, ws: any) => (
    async (byteString: any) => {
      const { data } = byteString;
      const [task, payload]: [string, Payload] = JSON.parse(data);
      switch (task) {
        case 'CHAT': {
          const { name, to } = payload;
          const chatBoxName: string = makeName(name, to); // generate new chatbox name
          // 如果不曾有過 chatBoxName 的對話，將 chatBoxes[chatBoxName] 設定為 empty Set
          if (!chatBoxes[chatBoxName])
            chatBoxes[chatBoxName] = new Set(); // make new record for chatbox
          // 將 ws client 加入 chatBoxes[chatBoxName]
          chatBoxes[chatBoxName].add(ws); // add this open connection into chatbox

          if (ws.box !== "" && chatBoxes[ws.box])
            // user(ws) was in another chatbox
            chatBoxes[ws.box].delete(ws);

          ws.box = chatBoxName;
          const Name = await validateUser(name); 
          const To = await validateUser(to);
          
          let initData: any = [];
          const chatBox = (await validateChatBox(chatBoxName, [Name, To]));
          const chatMessages: any= chatBox.messages;

          chatMessages.map((cM: any) => {
            const m: Payload = {
              name: cM.sender.name,
              to: ((chatBox.users.filter((user: any) => {
                if (cM.sender.name === to)
                  return user.name !== to;
                else
                  return user.name === to;
              }))[0] as any).name,
              body: cM.body
            };
            initData = [...initData, m];
          });
          
          // Respond to client
          // console.log(initData);
          sendData(['init', initData], ws); // success!
          break;
        }
        case 'MESSAGE':{
          const { name, to, body } = payload;
          const chatBoxName = makeName(name, to);
          const message: any = new MessageModel({ // new message
            chatBox: (await ChatBoxModel.findOne({ name: chatBoxName }))?._id, 
            sender: (await UserModel.findOne({ name: name }))?._id,
            body: body // correct
          });

          refreshChatBox(chatBoxName, message); // add new message into chatBox

          try {
            await message.save();
          } catch (e: any) {
            throw new Error(e);
          }

          // sendData(["output", [payload]], ws);
          // sendStatus({ 
          //   type: "success", 
          //   msg: "Message sent." 
          // }, ws);
          broadcastMessage(wss, ["output", [payload]], { type: "success", msg: "Message sent." });
          break;
        }
        // case 'CLEAR':{
        //   const { name, to, body } = payload;

        //   // broadcastMessage(ws, ['cleared'], { type: 'info', msg: 'Message cache cleared.' });
        //   break;
        // }
        default:
          break;
      }
    }
  )
}
