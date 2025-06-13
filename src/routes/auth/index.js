"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerAuthRoutes;
const handler_1 = require("./handler");
function registerAuthRoutes(server) {
    server.route([
        { method: 'POST', path: '/auth/register', handler: handler_1.registerHandler },
        { method: 'POST', path: '/auth/login', handler: handler_1.loginHandler },
    ]);
}
