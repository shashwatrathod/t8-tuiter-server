import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @file Implements mongoose schema for users
 */
const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      default: `testusername${Date.now()}`,
    },
    password: {
      type: String,
      required: true,
      default: `testpassword${Date.now()}`,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: { type: String, required: true, default: `testemail${Date.now()}` },
    profilePhoto: {
      type: String,
      default: null,
    },
    headerImage: {
      type: String,
      default: null,
    },
    biography: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    accountType: {
      type: String,
      enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
      default: "PERSONAL",
    },
    maritalStatus: {
      type: String,
      enum: ["MARRIED", "SINGLE", "WIDOWED"],
      default: "SINGLE",
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    salary: { type: Number, default: 50000 },
  },
  { collection: "users" }
);

export default UserSchema;
