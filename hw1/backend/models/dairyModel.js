import mongoose from "mongoose";

const dairySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true
    },
    tag: {
      type: String,
      require: true
    },
    emo: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true,
  }
)

const DairyModel = mongoose.model("Dairy", dairySchema);

export default DairyModel;

// Create a schema
// const todoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     completed: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   // The second argument is an options object.
//   // In this case, we want to rename _id to id and remove __v
//   {
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id.toString();
//         delete ret._id;
//         delete ret.__v;
//       },
//     },
//     // This option is to make sure that when a new document is created,
//     // the timestamps will be added automatically.
//     // You can comment this out to see the difference.
//     timestamps: true,
//   },
// );

// // Create a model
// const TodoModel = mongoose.model("Todo", todoSchema);
