"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    indexNumber: {
        type: String
    },
    type: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    status: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    website: {
        type: String
    },
    about: {
        type: String
    },
    degree: {
        type: String
    },
    room: {
        type: Number
    },
    slika: {
        type: String
    },
    courses: {
        type: Array
    },
});
exports.default = mongoose_1.default.model("User", User, 'user');
//# sourceMappingURL=user.js.map