"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const index_1 = __importDefault(require("./apis/users/index"));
const index_2 = __importDefault(require("./apis/accomodations/index"));
const errorHandlers_1 = require("./errorHandlers");
const server = (0, express_1.default)();
const port = process.env.PORT || 3001;
// ****************************************************** MIDDLEWARES **********************************************
server.use((0, cors_1.default)());
server.use(express_1.default.json());
// ******************************************************* ENDPOINTS ***********************************************
server.use("/users", index_1.default);
server.use("/accomodations", index_2.default);
// ***************************************************** ERROR HANDLERS ********************************************
server.use(errorHandlers_1.unauthorizedHandler);
server.use(errorHandlers_1.forbiddenHandler);
server.use(errorHandlers_1.catchAllHandler);
server.use(errorHandlers_1.notFoundHandler);
if (process.env.MONGO_CONNECTION_URL) {
    mongoose_1.default.connect(process.env.MONGO_CONNECTION_URL);
}
else {
    throw new Error("MONGO_CONNECTION_URL is not defined");
}
mongoose_1.default.connection.on("connected", () => {
    console.log("Successfully connected to Mongo!");
    server.listen(port, () => {
        console.table((0, express_list_endpoints_1.default)(server));
        console.log(`Server is running on port ${port}`);
    });
});
