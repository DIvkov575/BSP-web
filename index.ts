// const express = require("express");
import nodemailer from 'nodemailer'
import express from 'express'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()
const server = express()

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.usr,
    pass: process.env.pass,
  },
})

const auth = new google.auth.GoogleAuth({
  keyFile: "bsp-web-373303-66e2e656f6c6.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

server.use(express.static('src'))
server.use(express.json())

// ---------------------------------

server.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/home.html')
})

server.post('/group', async (req, res) => {
  // Send Info
  // const input = req.body.parcel
  const date = new Date();
  const input = (req.body.parcel + ', ' + date).split(', ')
  let SHEET_ID;
  let subject;
  if (input[0] === "freeTrial") {
    subject = 'new trial lesson sign up'
    SHEET_ID = process.env.SHEET_ID_2
  }
  else if (input[0] === "signUp") {
    subject = 'new signup'
    SHEET_ID = process.env.SHEET_ID_1
  }
  // Send Email Notification
  const options = {
    from: process.env.usr,
    to: process.env.usr_receiving,
    subject,
    text: input.join(', ')
  }
  transporter.sendMail(options, (err, info) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(err)
      return
    }
    // tslint:disable-next-line:no-console
    // console.log(info.response)
  })

  // Update Google Sheet
const client = await auth.getClient();
const googleSheets = google.sheets({ version: "v4", auth: client });
// const input_split = input.split(", ")
await googleSheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    auth,
    range: "Sheet1!A:E",
    valueInputOption: "RAW",
    requestBody: {
      values: [input]
    },
  })

  // notifications and status stuff
  // tslint:disable-next-line:no-console
  console.log(input)
  res.status(200).send({ status: 'received' })
})

server.get('/group', (req, res) => {
  res.sendFile(__dirname + '/src/group.html')
})

server.get('/questions', (req, res) => {
  res.sendFile(__dirname + '/src/questions.html')
})

server.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Server Listening on Port 3000')
})

