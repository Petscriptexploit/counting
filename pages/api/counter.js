// pages/api/counter.js
import { NextApiRequest, NextApiResponse } from 'next';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 3000 });

let counter = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'increment') {
      counter++;
      ws.send(JSON.stringify({ counter }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ counter });
  } else if (req.method === 'POST') {
    counter++;
    return res.status(200).json({ counter });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
