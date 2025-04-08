// pages/api/counter.js
import { NextApiRequest, NextApiResponse } from 'next';

let counter = 0;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const intervalId = setInterval(() => {
      res.write(`data: ${counter}\n\n`);
    }, 1000);

    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else if (req.method === 'POST') {
    counter++;
    return res.status(200).json({ counter });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
