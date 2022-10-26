import { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @file defines a schema for a Bookmark
 */

const BookmarkSchema = new Schema<Bookmark>(
  {
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
  },
  {
    collection: "bookmarks",
  }
);

export default BookmarkSchema;
