import mongoose, { InferSchemaType } from "mongoose";
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  guestId: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  status: { type: String, enum: ["Booked", "Cancelled"], default: "Booked" },
  totalPrice: { type: Number },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
});

type Reservation = InferSchemaType<typeof ReservationSchema>;

export const Reservation = mongoose.model<Reservation>(
  "Reservation",
  ReservationSchema
);
