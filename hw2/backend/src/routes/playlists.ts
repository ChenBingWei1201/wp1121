import {
  createPlayList,
  getPlayLists,
  getPlayList,
  updatePlayList,
  deletePlayList,
} from "../controllers/playlists";
import express from "express";

const router = express.Router();

// GET /api/playlists
router.get("/", getPlayLists);
// GET /api/playlists/:id
router.get("/:id", getPlayList);
// POST /api/playlists
router.post("/", createPlayList);
// PUT /api/playlists/:id
router.put("/:id", updatePlayList);
// DELETE /api/playlists/:id
router.delete("/:id", deletePlayList);

// export the router
export default router;
