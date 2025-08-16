import Mongoose from "mongoose";
import type { Bookings } from "../../types/types.js";

const { Schema } = Mongoose;

const unAuthBookingsSchema = new Schema<Bookings>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
});

export const unAuthBookingsMongoose = Mongoose.model("unAuthBookings", unAuthBookingsSchema);
