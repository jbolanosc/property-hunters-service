"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function startConnection() {
    const db = await mongoose_1.connect(process.env.MONGODB_URI || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(db => console.log("Database Connected"))
        .catch(err => console.log("error " + err));
}
exports.startConnection = startConnection;
//# sourceMappingURL=database.js.map