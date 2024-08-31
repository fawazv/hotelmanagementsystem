import mongoose, { InferSchemaType } from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, unique: true, required: true },
  roomType: {
    type: String,
    enum: ["Single", "Double", "Suite"],
    required: true,
  },
  rate: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

type Room = InferSchemaType<typeof RoomSchema>;

export const Room = mongoose.model<Room>("Room", RoomSchema);
