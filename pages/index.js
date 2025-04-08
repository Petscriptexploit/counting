// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('/api/counter');

    eventSource.onmessage = (event) => {
      setCounter(parseInt(event.data));
    };

    eventSource.onerror = () => {
      console.log('Error occurred');
    };

    eventSource.onopen = () => {
      console.log('Connection established');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleIncrement = async () => {
    const response = await fetch('/api/counter', { method: 'POST' });
    const data = await response.json();
    setCounter(data.counter);
  };

  return (
    <div>
      <button onClick={handleIncrement}>Click me!</button>
      <p>Counter: {counter}</p>
    </div>
  );
}
