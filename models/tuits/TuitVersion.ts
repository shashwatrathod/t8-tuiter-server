import { ObjectId } from "mongoose";

/**
 * @typedef TuitVersion represents a past version of an edited tuit
 *
 * @property {string} tuit the text of the tuit before an edit was made
 * @property {ObjectId} ref mongo _id of the original tuit in tuits collection
 * @property {number} v version number of the tuit before an edit was made
 * @property {Date} editedOn timestamp of the edit
 */
export default interface TuitVersion {
  tuit?: String;
  ref?: ObjectId;
  v?: number;
  editedOn?: Date;
}
