"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./routes/router");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
/* Front config */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express_1.default.static(__dirname + '/public'));
/* Data processing config */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
/* Router configs */
app.use('/', router_1.router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});
