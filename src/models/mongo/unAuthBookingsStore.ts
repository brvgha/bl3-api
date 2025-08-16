import type { Bookings } from "../../types/types.js";
import { unAuthBookingsMongoose } from "./unAuthBookings.js";

export const unAuthBookingsStore = {
    async find() {
        return await unAuthBookingsMongoose.find().lean();
    },
    async findOne(id: string) {
        return id ? await unAuthBookingsMongoose.findOne({ _id: id }).lean() : null;
    },
    async create(booking: Bookings) {
        console.log(`Creating unAuth booking: ${JSON.stringify(booking)}`);
        const newBooking = new unAuthBookingsMongoose(booking);
        if (!newBooking) {
            console.error("Failed to create unAuth booking");
            return null;
        }
        console.log(`New unAuth booking created: ${JSON.stringify(newBooking)}`);
        let savedBooking = await newBooking.save();
        console.log(`Saved unAuth booking: ${JSON.stringify(savedBooking)}`);
        console.log(`Saved unAuth booking ID: ${savedBooking._id}`);
        return savedBooking;
    },
    async reject(id: string) {
        return id ? await unAuthBookingsMongoose.deleteOne({ _id: id }) : null;
    }

}