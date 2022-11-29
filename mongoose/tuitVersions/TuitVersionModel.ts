import { model } from "mongoose";
import TuitVersionSchema from "./TuitVersionSchema";

const TuitVersionModel = model("TuitVersionModel", TuitVersionSchema);

export default TuitVersionModel;
