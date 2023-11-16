import dotenv from "dotenv-defaults";
import mongoose from "mongoose";

export default {
  connect: () => {
    dotenv.config();
    if (!process.env.MONGO_URL) {
      console.error("Missing MONGO_URL!!!");
      process.exit(1);
    }
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then(() => console.log("mongo db connection created"));
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:"),
    );
  },
};
