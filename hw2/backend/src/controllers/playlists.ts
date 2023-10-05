import SongModel from "../models/song";
import PlayListModel from "../models/playlist";
import { genericErrorHandler } from "../utils/errors";
import type {
  SongData,
  CreatePlayListPayload,
  CreatePlayListResponse,
  GetPlayListsResponse,
  PlayListData,
  UpdatePlayListPayload,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all playlists
export const getPlayLists = async (_: Request, res: Response<GetPlayListsResponse>) => {
  try {
    const playlists = await PlayListModel.find({});

    // Return only the id and name of the list
    const listsToReturn = playlists.map((list) => {
      return {
        id: list._id,
        name: list.name,
        description: list.description
      };
    });

    return res.status(200).json(listsToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a playlist
export const getPlayList = async (
  req: Request<{ id: string }>,
  res: Response<PlayListData | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const playlist = await PlayListModel.findById(id).populate("songs");
    if (!playlist) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).json({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      songs: playlist.songs as unknown as SongData[],
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a list
export const createPlayList = async (
  req: Request<never, never, CreatePlayListPayload>,
  res: Response<CreatePlayListResponse>,
) => {
  try {
    const { id } = await PlayListModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a playlist
export const updatePlayList = async (
  req: Request<{ id: string }, never, UpdatePlayListPayload>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Update the list
    const newList = await PlayListModel.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
      },
      { new: true },
    );

    // If the list is not found, return 404
    if (!newList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Delete a list
export const deletePlayList = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // Create a transaction
  const session = await PlayListModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // Delete the list
    const deletedPlayList = await PlayListModel.findByIdAndDelete(id);// nonsense

    // If the list is not found, return 404
    if (!deletedPlayList) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // Delete all the songs in the playlist
    deletedPlayList.songs.forEach(async (songId) => {
      await SongModel.findByIdAndDelete(songId);
    });

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).send("OK");
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    genericErrorHandler(error, res);
  }
};
