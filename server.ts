import express, {Request, Response, NextFunction} from 'express'
// import * as express from 'express';
// import { google } from 'googleapis'
// import dotenv from 'dotenv'
// const express = require('express');

const server = express();

server.use(express.static('src'))
server.use(express.json())

// ---------------------------------

server.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/dist/home.html')
})

// server.post('/', async (req: express.Request, res: express.Response) => {
//   // send(req.body.parcel);
//   res.status(200).send({ status: 'received' })
// })


server.listen(3000, () => {
  console.log('Server Listening on Port 3000')
})

