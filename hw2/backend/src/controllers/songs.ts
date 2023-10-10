// Get songs
// Path: backend/src/controllers/songs.ts
import PlayListModel from "../models/playlist";
import SongModel from "../models/song";
import { genericErrorHandler } from "../utils/errors";
import type {
  CreateSongPayload,
  CreateSongResponse,
  GetSongResponse,
  GetSongsResponse,
  UpdateSongPayload,
  UpdateSongResponse,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all songs
export const getSongs = async (_: Request, res: Response<GetSongsResponse>) => {
  try {
    const dbSongs = await SongModel.find({});
    const songs = dbSongs.map((song) => ({
      id: song.id as string,
      name: song.name,
      singer: song.singer,
      link: song.link,
      playListID: song.playListID.toString(),
    }));

    return res.status(200).json(songs);
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

// Get a card
export const getSong = async (
  req: Request<{ id: string }>,
  res: Response<GetSongResponse | { error: string }>,
) => {
  try {
    const { id } = req.params;

    const song = await SongModel.findById(id);
    if (!song) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).json({
      id: song.id as string,
      name: song.name,
      singer: song.singer,
      link: song.link,
      playListID: song.playListID.toString(),
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Create a card
export const createSong = async (
  req: Request<never, never, CreateSongPayload>,
  res: Response<CreateSongResponse | { error: string }>,
) => {
  try {
    const { name, singer, link, playListID } = req.body;

    // Check if the list exists
    const playList = await PlayListModel.findById(playListID);
    if (!playList) {
      return res.status(404).json({ error: "playlist id is not valid" });
    }

    const song = await SongModel.create({
      name,
      singer,
      link,
      playListID,
    });

    // Add the song to the list
    playList.songs.push(song._id);
    await playList.save();

    return res.status(201).json({
      id: song.id as string,
    });
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

// Update a card
export const updateSong = async (
  req: Request<{ id: string }, never, UpdateSongPayload>,
  res: Response<UpdateSongResponse | { error: string }>,
) => {
  // Create mongoose transaction
  const session = await SongModel.startSession();
  session.startTransaction();
  // In `updateCard` function, 2 database operations are performed:
  // 1. Update the card
  // 2. Update the list
  // If one of them fails, we need to rollback the other one.
  // To do that, we need to use mongoose transaction.

  try {
    const { id } = req.params;
    const { name, singer, link, playListID } = req.body;

    // Check if the card exists
    const oldSong = await SongModel.findById(id);
    if (!oldSong) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // If the user wants to update the list_id, we need to check if the list exists
    if (playListID) {
      // Check if the list exists
      const playlistExists = await PlayListModel.findById(playListID);
      if (!playlistExists) {
        return res.status(404).json({ error: "play list ID is not valid" });
      }
    }

    const newSong = await SongModel.findByIdAndUpdate(
      id,
      {
        name: name,
        singer: singer,
        link: link,
        playListID: playListID,
      },
      { new: true },
    );

    if (!newSong) {
      return res.status(404).json({ error: "id is not valid" });
    }

    // If the user wants to update the playListId, we need to update the list as well
    if (playListID) {
      // Remove the song from the old list
      const oldList = await PlayListModel.findById(oldSong.playListID);
      if (!oldList) {
        return res.status(404).json({ error: "list id is not valid" });
      }
      oldList.songs = oldList.songs.filter(
        (songId) => songId.toString() !== id,
      ); // the
      await oldList.save();

      // Add the card to the new list
      const newList = await PlayListModel.findById(playListID);
      if (!newList) {
        return res.status(404).json({ error: "list_id is not valid" });
      }
      newList.songs.push(newList.id);
      await newList.save();
    }

    // Commit the transaction
    // This means that all database operations are successful
    await session.commitTransaction();

    return res.status(200).send("OK");
  } catch (error) {
    // Rollback the transaction
    // This means that one of the database operations is failed
    await session.abortTransaction();
    genericErrorHandler(error, res);
  }
};

// Delete a song
export const deleteSong = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  // Create mongoose transaction
  const session = await SongModel.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const deleteSong = await SongModel.findByIdAndDelete(id);
    if (!deleteSong) {
      return res.status(404).json({ msg: "id is not valid!" });
    }

    const playList = await PlayListModel.findById(deleteSong.playListID);

    if (!playList) {
      return res.status(404).json({ msg: "play list not found!" });
    }

    playList.songs = playList.songs.filter(
      (songId) => id !== songId.toString(),
    );
    await playList.save();

    // Commit the transaction
    session.commitTransaction();

    return res.status(200).send("OK");
  } catch (error) {
    session.abortTransaction();
    genericErrorHandler(error, res);
  }
};
