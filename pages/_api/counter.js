import { NextApiRequest, NextApiResponse } from 'next';

let counter = 0;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.json({ counter });
  } else if (req.method === 'POST') {
    counter++;
    return res.json({ counter });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
