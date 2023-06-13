import express, {Request, Response} from 'express';
import path from 'path';
// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config()
const server = express();
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.usr,
    pass: process.env.pass,
  },
})

const auth = new google.auth.GoogleAuth({
  keyFile: "google-service-cred.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

function sendmail(input:string[], subject:string) {
  const options = {
    from: process.env.usr,
    to: process.env.usr_receiving,
    subject,
    text: input.join(', ')
  }
  transporter.sendMail(options, (err: Error | null, info: nodemailer.SentMessageInfo) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(err)
      return;
    }
  })
}

async function sendsheet(input:string[], sheetId:string, sheetNum:string){
  // const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: auth});
  await googleSheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      auth,
      range: sheetNum + "!A:E",
      valueInputOption: "RW",
      requestBody: {
        values: [input]
      },
    })
}

function send(content: any){
  const SHEET_ID = <string> process.env.sheet_id_1;
  const date: Date = new Date();
  const input = (content + ', ' + date).split(', ');
  let subject = 'trial lesson sign up';
  let sheetNum = 'trialsignup';

  sendmail(input, subject)
  sendsheet(input, SHEET_ID, sheetNum)

  console.log(input)
}

server.use(express.static(path.join(__dirname, 'dist')));
// server.use(express.json())

// ---------------------------------

server.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/dist/index.html')
})

server.post('/', async (req: express.Request, res: express.Response) => {
  console.log(req.body.parcel);
  send("asdfasdf");
  // send(req.body.parcel);
  res.status(200).send({ status: 'received' })
  console.log("sent");
})


server.listen(3004, () => {
  console.log('Server Listening on Port 3000')
})

