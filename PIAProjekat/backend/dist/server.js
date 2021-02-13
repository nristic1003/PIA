"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./model/user"));
const notification_1 = __importDefault(require("./model/notification"));
const courses_1 = __importDefault(require("./model/courses"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/pia');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Uspesna konekcija");
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/notification').get((req, res) => {
    notification_1.default.find({}, (err, notification) => {
        if (err)
            console.log(err);
        else
            res.json(notification);
    });
});
router.route('/getZaposleni').get((req, res) => {
    user_1.default.find({ type: 'z' }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/getZaposleniByUsername').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ username: username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/getPredmeti').post((req, res) => {
    let katedra = req.body.katedra;
    const userRegex = new RegExp(katedra, 'i');
    courses_1.default.find({ katedra: userRegex }, (err, courses) => {
        if (err)
            console.log(err);
        else
            res.json(courses);
    });
});
router.route('/getPredmetByAkronim').post((req, res) => {
    let akronim = req.body.akronim;
    const userRegex = new RegExp(akronim, 'i');
    courses_1.default.findOne({ akronim: userRegex }, (err, courses) => {
        if (err)
            console.log(err);
        else
            res.json(courses);
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map