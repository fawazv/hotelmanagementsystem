import mongoose, { InferSchemaType } from "mongoose";

const GuestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactDetails: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

type Guest = InferSchemaType<typeof GuestSchema>;

export const Guest = mongoose.model<Guest>("Guest", GuestSchema);
