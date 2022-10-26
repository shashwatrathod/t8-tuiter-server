import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";

/**
 * @file Implements mongoose model to CRUD
 * documents in the tuit collection
 */
const TuitModel = mongoose.model("TuitModel", TuitSchema);

export default TuitModel;
