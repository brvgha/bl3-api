import type { AnyObject, Collection, Types } from "mongoose";

export type Db = {
    authBookingsStore: any;
    unAuthBookingsStore: any;
    collection?: Collection<AnyObject>;
};

export type Bookings = {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
};

