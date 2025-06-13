"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const articles_1 = __importDefault(require("./routes/articles"));
const detect_1 = __importDefault(require("./routes/detect"));
const drizzle_1 = require("./plugins/drizzle");
const auth_1 = __importDefault(require("./routes/auth"));
const api_1 = __importDefault(require("./routes/api"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new hapi_1.Server({
            port: 4000,
            host: 'localhost',
            routes: {
                cors: { origin: ['*'] },
            },
        });
        yield (0, drizzle_1.setupDrizzle)(server);
        (0, dashboard_1.default)(server);
        (0, articles_1.default)(server);
        (0, detect_1.default)(server);
        (0, auth_1.default)(server);
        (0, api_1.default)(server);
        yield server.start();
        console.log(`Server running at: ${server.info.uri}`);
    });
}
startServer().catch((err) => {
    console.error(err);
    process.exit(1);
});
