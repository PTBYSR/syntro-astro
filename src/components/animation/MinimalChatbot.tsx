'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const conversation = [
  { id: 1, type: 'user', text: 'Enwere m mmejọ n’ụgwọ m.' }, // I have a failed transaction
  { id: 2, type: 'ai', text: 'Kedu ID nke azụmahịa gị?' },   // What is your transaction id?
  { id: 3, type: 'user', text: 'TX12345.' },
  { id: 4, type: 'ai', text: 'Daalụ! Anyị ga-enyocha ya ma kwuo gị okwu.' }, // Thanks! We will check and get back
];

export default function MinimalChatbot() {
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < conversation.length) {
        setDisplayed(prev => [...prev, conversation[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500); // messages appear every 1.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-4 rounded-2xl shadow-lg">
      <AnimatePresence>
        {displayed.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`my-2 p-3 rounded-xl max-w-xs ${
              msg.type === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
