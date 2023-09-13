import {
  createDairy,
  getDairies,
  updateDairy,
  deleteDairy,
} from "../controllers/dairy.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/dairies prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/dairies
router.get("/", getDairies);
// POST /api/dairies
router.post("/", createDairy);
// PUT /api/dairies/:id
router.put("/:id", updateDairy);
// DELETE /api/dairies/:id
router.delete("/:id", deleteDairy);

// export the router
export default router;
