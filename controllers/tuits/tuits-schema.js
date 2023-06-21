import mongoose from "mongoose";

const date = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const schema = mongoose.Schema(
  {
    tuit: String,
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    disliked: Boolean,
    replies: Number,
    retuits: Number,
    tuit: { type: String, default: "Dummy Tuit" },
    topic: { type: String, default: "Space" },
    username: { type: String, default: "NASA" },
    handle: { type: String, default: "@nasa" },
    time: {
      type: String,
      default:
        date.getDate().toString() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear().toString(),
    },
    image: { type: String, default: "nasa.png" },
    title: { type: String, default: "This is a dummy title" },
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    dislikes: { type: Number, default: 0 },
    disliked: { type: Boolean, default: false },
    replies: { type: Number, default: 0 },
    retuits: { type: Number, default: 0 },
  },
  { collection: "tuits" }
);

export default schema;