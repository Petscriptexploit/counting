// pages/index.js
import { useState, useEffect } from 'react';
import WebSocket from 'ws';

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:3000/api/counter';
    const wsOptions = {
      // options
    };

    const ws = new WebSocket(wsUrl, wsOptions);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCounter(data.counter);
    };

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    setWs(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleIncrement = async () => {
    ws.send(JSON.stringify({ type: 'increment' }));
  };

  return (
    <div>
      <button onClick={handleIncrement}>Click me!</button>
      <p>Counter: {counter}</p>
    </div>
  );
}
