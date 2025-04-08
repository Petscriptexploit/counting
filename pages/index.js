// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('/api/counter')
      .then(response => response.json())
      .then(data => setCounter(data.counter));
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
