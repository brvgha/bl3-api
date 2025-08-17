'use strict';

import { connect } from "http2";
import { routes } from "./routes.js";
import * as Hapi from '@hapi/hapi';
import { connectDb } from "./models/db.js";

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: '0.0.0.0',
        routes: {cors: { origin: ['*'] } }
    });

    server.route(routes);
    connectDb('mongo');

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();