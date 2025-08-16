import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { unAuthBookingsStore } from "./unAuthBookingsStore.js";
import { authBookingsStore } from "./authBookingsStore.js";
// Update the import path if necessary, or create the types file if missing
// Update the import path if necessary, or create the types file if missing
import type { Db } from "../../types/types.js";
import { seedData } from "./seed-data.js";

const seedLib = mongooseSeeder.default;


async function seed() {
    const seeder = seedLib(Mongoose);
    const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
    console.log(dbData);
}

export function connectMongo(db: Db) {
    dotenv.config();

    Mongoose.set("strictQuery", true);
    Mongoose.connect(process.env.db as string);
    const mongoDb = Mongoose.connection;

    db.unAuthBookingsStore = unAuthBookingsStore;
    db.authBookingsStore = authBookingsStore;

    mongoDb.on("error", (err: Error) => {
        console.log(`database connection error: ${err}`);
    });

    mongoDb.on("disconnected", () => {
        console.log("database disconnected");
    });

    mongoDb.once("open", function () {
        console.log(`database connected to ${mongoDb.name} on ${mongoDb.host}`);
        seed();
    });
}

