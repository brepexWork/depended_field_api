"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_route_1 = __importDefault(require("./routes/create-route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const jsonBodyMiddleWare = express_1.default.json();
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)());
const port = 2525;
app.use(jsonBodyMiddleWare);
app.use(create_route_1.default);
app.listen(port, () => {
    console.log('Server success starter in port : ' + port);
});
