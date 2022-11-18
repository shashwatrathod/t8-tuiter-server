/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";

const LikeModel = mongoose.model("DislikeModel", DislikeSchema);
export default LikeModel;
