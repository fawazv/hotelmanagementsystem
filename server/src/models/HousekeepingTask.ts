import mongoose, { InferSchemaType } from "mongoose";
const Schema = mongoose.Schema;

const HousekeepingTaskSchema = new Schema({
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  taskDescription: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    default: "Pending",
  },
  scheduledDate: { type: String, required: true },
});

type HousekeepingTask = InferSchemaType<typeof HousekeepingTaskSchema>;

export const HouseKeepingTask = mongoose.model<HousekeepingTask>(
  "HousekeepingTask",
  HousekeepingTaskSchema
);
