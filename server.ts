import express, {Request, Response} from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

require('dotenv').config();
const server = express();
const SHEET_ID: string = process.env["SHEET_ID_1"];
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env["usr"],
    pass: process.env["pass"],
  },
})
const auth = new google.auth.GoogleAuth({
  keyFile: "google-service-cred.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

async function sendmail(input:string[]) {
  const options = {
    from: process.env["usr"],
    to: process.env["usr_receiving"],
    subject: "lesson sign up",
    text: input.join(', ')
  }
  transporter.sendMail(options, (err: Error | null, info: nodemailer.SentMessageInfo) => {
    if (err) {console.log(err.message); return;} 
  })
}

async function sendsheet(input:string[], sheetId:string) {
  const googleSheets = google.sheets({ version: "v4", auth: auth});
  await googleSheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      auth,
      range: 'signUps'+ "!A:D",
      valueInputOption: "RAW",
      requestBody: {
        values: [input]
      },
    })
}



server.use(express.static(path.join(__dirname, 'dist')));
server.use(express.json())


server.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/dist/index.html')
})

server.post('/', async (req: any, res: express.Response) => {
  res.status(200).send({ status: 'received' })
  let content = req.body.parcel;
  const date: Date = new Date();
  const input : string[] = (content + ', ' + date).split(', ');
  sendmail(input)
  // sendsheet(input, SHEET_ID)
})

const port = 3000;
server.listen(port, () => {
  console.log('Server Listening on Port ' + port);
})
