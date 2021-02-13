"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Courses = new Schema({
    naziv: {
        type: String
    },
    semestar: {
        type: Number
    },
    katedra: {
        type: String
    },
    nastavnik: {
        type: String
    },
    akronim: {
        type: String
    },
    tip: {
        type: String
    },
    fondPredavanja: {
        type: Number
    },
    fondVezbe: {
        type: Number
    },
    ESPB: {
        type: Number
    },
    terPred: {
        type: String
    },
    terVezbe: {
        type: String
    },
    lab: {
        type: String
    },
    nacinPol: {
        type: String
    },
    propozicije: {
        type: String
    },
    obavestenja: {
        type: Array
    },
    nastIme: {
        type: String
    }
});
exports.default = mongoose_1.default.model("Courses", Courses, 'courses');
//# sourceMappingURL=courses.js.map