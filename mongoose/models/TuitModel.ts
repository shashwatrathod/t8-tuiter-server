import mongoose from "mongoose";
import TuitSchema from "../schemas/TuitSchema";

const TuitModel = mongoose.model("TuitModel", TuitSchema);

export default TuitModel;
