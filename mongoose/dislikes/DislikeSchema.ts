import mongoose, { Schema } from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @file defines a schema for a Dislike
 */

const DislikeSchema = new mongoose.Schema<Dislike>(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "dislikes" }
);
export default DislikeSchema;
