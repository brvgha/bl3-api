import path from "path";
import { api } from "./api/bl3-api.js";


export const routes: any = [
    {
        method: 'GET' as const,
        path: '/status',
        config: api.getStatus
    },
    {
        method: 'GET' as const,
        path: '/get-unauth-bookings',
        config: api.getUnauthBookings
    },
    {
        method: 'GET' as const,
        path: '/get-auth-bookings',
        config: api.getAuthBookings
    },
    {
        method: 'POST' as const,
        path: '/create-booking',
        config: api.createBooking
    },
    {
        method: 'POST' as const,
        path: '/accept-booking',
        config: api.acceptBooking
    },
    {
        method: 'POST' as const,
        path: '/reject-booking',
        config: api.rejectBooking
    },
    {
        method: 'POST' as const,
        path: '/login',
        config: api.login
    },
]