import type { ResponseToolkit, Request } from "@hapi/hapi";
import type { Bookings } from "../types/types.js";
import { unAuthBookingsStore } from "../models/mongo/unAuthBookingsStore.js";
import { authBookingsStore } from "../models/mongo/authBookingsStore.js";
import Boom from "@hapi/boom";

export const api = {
    login: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const { username, password } = request.payload as { username: string; password: string };

            if (username === process.env.ADMIN && password === process.env.ADMINPASSWORD) {
                return h.response({ login: true }).code(200);
            } else {
                /* Boom.unauthorized("Invalid credentials"); */
                return h.response({ login: false, message: "Invalid credentials" }).code(203);
            }
        },
    },
    getStatus: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            console.log("Status check received");
            return h.response({ status: true }).code(200);
        },
    },
    getUnauthBookings: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const bookings = await unAuthBookingsStore.find();
            return h.response(bookings).code(200);
        },
    },
    getAuthBookings: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const bookings = await authBookingsStore.find();
            return h.response(bookings).code(200);
        },
    },
    createBooking: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const booking: Bookings = request.payload as Bookings;
            console.log(`Creating booking: ${JSON.stringify(booking)}`);
            if (!booking || !booking.name || !booking.date) {
                return Boom.badRequest("Invalid booking data");
            }
            let newBooking = await unAuthBookingsStore.create(booking);
            console.log(`id: ${newBooking?._id}`);
            if (!newBooking) {
                return Boom.internal("Failed to create booking");
            }
            return h.response({confirm: true, message: 'Booking has been sent for approval', id: newBooking._id}).code(200);
        },
    },
    acceptBooking: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const payload = request.payload as { bookingId?: string };
            const id = payload.bookingId;
            console.log(`Accepting booking with ID: ${id}`);
            if (!id) {
                return Boom.badRequest("Booking ID is required");
            }
            const booking = await unAuthBookingsStore.findOne(id);
            if (!booking) {
                return Boom.notFound("Booking not found");
            }
            await authBookingsStore.accept(booking);
            await unAuthBookingsStore.reject(id);
            return h.response({ message: "Booking accepted", confirm: true }).code(200);
        },
    },
    rejectBooking: {
        auth: false,
        handler: async function (request: Request, h: ResponseToolkit) {
            const payload = request.payload as { bookingId?: string };
            const id = payload.bookingId;
            if (!id) {
                return Boom.badRequest("Booking ID is required");
            }
            const result = id ? await unAuthBookingsStore.reject(id) : null;
            if (!result) {
                return Boom.notFound("Booking not found");
            }
            return h.response({ message: "Booking rejected" }).code(200);
        },
    },
};