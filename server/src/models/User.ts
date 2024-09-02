import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  name: { type: String, required: true },
  contactDetails: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});
export type IUser = InferSchemaType<typeof UserSchema>;
export const User = mongoose.model<IUser>("User", UserSchema);
