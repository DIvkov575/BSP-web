"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import nodemailer from 'nodemailer'
var express_1 = __importDefault(require("express"));
// import * as express from 'express';
// import { google } from 'googleapis'
// import dotenv from 'dotenv'
// const express = require('express');
var server = (0, express_1.default)();
// const transporter = nodemailer.createTransport({
//   service: 'hotmail',
//   auth: {
//     user: process.env.usr,
//     pass: process.env.pass,
//   },
// })
// const auth = new google.auth.GoogleAuth({
//   keyFile: "google-service-cred.json",
//   scopes: "https://www.googleapis.com/auth/spreadsheets",
// });
// function sendMail(input:string[], subject:string) {
//   const options = {
//     from: process.env.usr,
//     to: process.env.usr_receiving,
//     subject,
//     text: input.join(', ')
//   }
//   transporter.sendMail(options, (err, info) => {
//     if (err) {
//       // tslint:disable-next-line:no-console
//       console.log(err)
//       return;
//     }
//   })
// }
//
// async function sendSheet(input:string[], sheetId:string, sheetNum:string){
//   const client = await auth.getClient();
//   const googleSheets = google.sheets({ version: "v4", auth: client });
//   await googleSheets.spreadsheets.values.append({
//       spreadsheetId: sheetId,
//       auth,
//       range: sheetNum + "!A:E",
//       valueInputOption: "RAW",
//       requestBody: {
//         values: [input]
//       },
//     })
// }
//
// function send(content: JSON){
//   const SHEET_ID = process.env.SHEET_ID_1;
//   let subject;
//   let sheetNum;
//   const date = new Date();
//   const input = (content + ', ' + date).split(', ')
//
//   if (input[0] === "freeTrial") {
//     subject = 'trial lesson sign up';
//     sheetNum = 'trialSignUp'
//   }
//   else if (input[0] === "1on1SignUp") {
//     subject = '1on1 bsc signup';
//     sheetNum = '1on1SignUp'
//   }
//   else if (input[0] === "contact") {
//     subject = 'contact bsc';
//     sheetNum = 'contact'
//   }
//   else if (input[0] === "signUp") {
//     subject = 'group sign up bsc';
//     sheetNum = 'signUps'
//   }
//   else {throw new Error('first input not equal to freetrial/signup')}
//
//   sendMail(input, subject)
//   sendSheet(input, SHEET_ID, sheetNum)
//
//   // tslint:disable-next-line:no-console
//   console.log(input)
// }
//
server.use(express_1.default.static('src'));
server.use(express_1.default.json());
// ---------------------------------
server.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/home.html');
});
// server.post('/', async (req: express.Request, res: express.Response) => {
//   // send(req.body.parcel);
//   res.status(200).send({ status: 'received' })
// })
server.listen(3000, function () {
    console.log('Server Listening on Port 3000');
});
