import mongoose from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @file defines a schema for a Bookmark
 */

const TuitSchema = new mongoose.Schema<Tuit>(
  {
    tuit: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now },
    image: String,
    youtube: String,
    avatarLogo: String,
    stats: {
      replies: { type: Number, default: 0 },
      retuits: { type: Number, default: 0 },
      likes: { type: Number, default: 0, min: 0 },
      dislikes: { type: Number, default: 0, min: 0 },
    },
    v: { type: Number, default: 1 },
  },
  { collection: "tuits" }
);
export default TuitSchema; 