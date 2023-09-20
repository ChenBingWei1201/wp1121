import DairyModel from "../models/dairyModel.js";

// Get all dairies
export const getDairies = async (req, res) => {
  try {
    // Find all dairies
    const dairies = await DairyModel.find({});

    // Return dairies
    return res.status(200).json(dairies);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};
// Get a dairy
export const getDairy = async (req, res) => {
  try {
    const { id } = req.params;
    // Find a specific dairy
    const dairy = await DairyModel.findById(id);
    return res.status(200).json(dairy);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Create a dairy
export const createDairy = async (req, res) => {
  const { date, tag, emo, content, dairyID } = req.body;

  // Check date, tag, mood, content
  if (!date || !tag || !emo || !content) {
    return res
      .status(400)
      .json({ message: "Date, tag, mood, and content are required!" });
  }

  const existedDairy = await DairyModel.findById(dairyID);
  if (existedDairy)
    return res.status(200).json(existedDairy);
  else {
    // Create a new dairy
    try {
      const newDairy = await DairyModel.create({
        date,
        tag,
        emo,
        content,
      });
      return res.status(201).json(newDairy);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// Update a dairy
export const updateDairy = async (req, res) => {
  const { id } = req.params;
  const { date, tag, emo, content } = req.body;

  try {
    // Check if the id is valid
    const existedDairy = await DairyModel.findById(id);
    if (!existedDairy) {
      return res.status(404).json({ message: "Dairy not found!" });
    }

    // Update the dairy
    if (date !== undefined) existedDairy.date = date;
    if (tag !== undefined) existedDairy.tag = tag;
    if (emo !== undefined) existedDairy.emo = emo;
    if (content !== undefined) existedDairy.content = content;

    // Save the updated dairy
    await existedDairy.save();

    // Rename _id to id
    // existedDairy.id = existedDairy._id;
    // delete existedDairy._id;
    // console.log(existedDairy.content);
    return res.status(200).json(existedDairy);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a dairy
export const deleteDairy = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedDairy = await DairyModel.findById(id);
    if (!existedDairy) {
      return res.status(404).json({ message: "Dairy not found!" });
    }
    // Delete the dairy
    await DairyModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Dairy deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
