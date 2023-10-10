import type { PlayListData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

interface PlayListDocument
  extends Omit<PlayListData, "id" | "songs">,
    mongoose.Document {
  songs: Types.ObjectId[];
}

interface PlayListModel extends mongoose.Model<PlayListDocument> {}

const PlayListSchema = new mongoose.Schema<PlayListDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const PlayList = mongoose.model<PlayListDocument, PlayListModel>(
  "PlayList",
  PlayListSchema,
);

export default PlayList;
