import type { Db } from "../types/types.js";
import { connectMongo } from "../models/mongo/connect.js";

export const db: Db = {
    authBookingsStore: null,
    unAuthBookingsStore: null,
};

export function connectDb(dbType: string) {
    switch (dbType) {
        case "mongo":
            connectMongo(db);
            break;
        default:
    }
}