import mongoose from "mongoose";

const dairySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    tag: {
      type: String,
      require: true,
    },
    emo: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const DairyModel = mongoose.model("Dairy", dairySchema);

export default DairyModel;
