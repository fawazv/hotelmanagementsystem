import mongoose, { InferSchemaType } from "mongoose";
const Schema = mongoose.Schema;

const BillSchema = new mongoose.Schema({
  reservationId: {
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  guestId: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
  totalAmount: { type: Number, required: true },
  items: [{ description: String, amount: Number }],
  createdAt: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false },
});

type Bill = InferSchemaType<typeof BillSchema>;

export const Bill = mongoose.model<Bill>("Bill", BillSchema);
