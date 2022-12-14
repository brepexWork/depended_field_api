"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_route_1 = __importDefault(require("./routes/test-route"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('true');
});
app.use(test_route_1.default);
app.listen(port, () => {
    console.log('Server success starter in port : ' + port);
});
