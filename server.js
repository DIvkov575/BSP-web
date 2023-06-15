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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
// const nodemailer = require("nodemailer");
var nodemailer_1 = __importDefault(require("nodemailer"));
var googleapis_1 = require("googleapis");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var server = (0, express_1.default)();
var transporter = nodemailer_1.default.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.usr,
        pass: process.env.pass,
    },
});
var auth = new googleapis_1.google.auth.GoogleAuth({
    keyFile: "google-service-cred.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});
function sendmail(input, subject) {
    var options = {
        from: process.env.usr,
        to: process.env.usr_receiving,
        subject: subject,
        text: input.join(', ')
    };
    transporter.sendMail(options, function (err, info) {
        if (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
            return;
        }
    });
}
function sendsheet(input, sheetId, sheetNum) {
    return __awaiter(this, void 0, void 0, function () {
        var googleSheets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    googleSheets = googleapis_1.google.sheets({ version: "v4", auth: auth });
                    return [4 /*yield*/, googleSheets.spreadsheets.values.append({
                            spreadsheetId: sheetId,
                            auth: auth,
                            range: sheetNum + "!A:E",
                            valueInputOption: "RW",
                            requestBody: {
                                values: [input]
                            },
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function send(content) {
    var SHEET_ID = process.env.sheet_id_1;
    var date = new Date();
    var input = (content + ', ' + date).split(', ');
    var subject = 'trial lesson sign up';
    var sheetNum = 'trialsignup';
    sendmail(input, subject);
    sendsheet(input, SHEET_ID, sheetNum);
    console.log(input);
}
server.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
// server.use(express.json())
// ---------------------------------
server.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
server.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req.body.parcel);
        send("asdfasdf");
        // send(req.body.parcel);
        res.status(200).send({ status: 'received' });
        console.log("sent");
        return [2 /*return*/];
    });
}); });
server.listen(3004, function () {
    console.log('Server Listening on Port 3000');
});
