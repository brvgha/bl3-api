import type { Bookings } from "../../types/types.js";
import { authBookingsMongoose } from "./authBookings.js";

export const authBookingsStore = {
    async find() {
        return await authBookingsMongoose.find().lean();
    },
    async findOne(id: string) {
        return id ? await authBookingsMongoose.findOne({ _id: id }).lean() : null;
    },
    async accept(booking: Bookings) {
        const newBooking = new authBookingsMongoose(booking);
        return await newBooking.save();
    }

}