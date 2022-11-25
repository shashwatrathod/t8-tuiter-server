import mongoose, { Schema } from "mongoose";
import TuitVersion from "../../models/tuits/TuitVersion";

/**
 * @file defines a schema for a Tuit's older version
 */

const TuitVersionSchema = new mongoose.Schema<TuitVersion>(
  {
    tuit: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, ref: "TuitModel", required: true },
    editedOn: { type: Date, default: Date.now },
    v: { type: Number, required: true },
  },
  { collection: "tuitVersions" }
);

export default TuitVersionSchema;
