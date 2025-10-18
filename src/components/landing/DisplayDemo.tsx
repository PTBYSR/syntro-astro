'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const conversation = [
  {
    id: 1,
    user: 'How far, I wan move my flight to tomorrow.',
    agent: "Sure, what's your booking reference?",
    tool: 'Booking system query',
    flow: [
      "Receive user request",
      "Identify intent: flight reschedule",
      "Request booking reference for verification"
    ]
  },
  {
    id: 2,
    user: 'ABX123.',
    agent: 'Got it. Tomorrow 10 AM okay?',
    tool: 'Flight schedule check',
    flow: [
      "Retrieve booking info from system",
      "Check available flight slots",
      "Propose suitable alternative time"
    ]
  },
  {
    id: 3,
    user: 'E de sharp',
    agent: 'Done. New ticket sent to your email.',
    tool: 'Booking updated',
    flow: [
      "Update flight schedule",
      "Generate new ticket",
      "Send ticket confirmation to user"
    ]
  },
  {
    id: 4,
    user: 'You sabi, thanks!',
    agent: "You're welcome!",
    tool: 'Resolved',
    flow: [
      "Confirm completion",
      "End conversation"
    ]
  }
];

export default function FlightSimulationPage() {
  const [displayedSteps, setDisplayedSteps] = useState([]);
  const [activeFlow, setActiveFlow] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAgentTools, setShowAgentTools] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // ✅ prevents re-triggering
  const chatScrollRef = useRef(null);
  const flowScrollRef = useRef(null);
  const containerRef = useRef(null); // ✅ reference to detect when in view

  // Auto-scroll chat and reasoning panels
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [displayedSteps, isTyping]);

  useEffect(() => {
    if (flowScrollRef.current) {
      flowScrollRef.current.scrollTop = flowScrollRef.current.scrollHeight;
    }
  }, [activeFlow]);

  // ✅ Run simulation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          runSimulation();
        }
      },
      { threshold: 0.5 } // triggers when 50% visible
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [hasStarted]);

  const runSimulation = async () => {
  setIsRunning(true);
  setDisplayedSteps([]);
  setActiveFlow([]);

  for (let i = 0; i < conversation.length; i++) {
    const step = conversation[i];

    // User message
    setDisplayedSteps(prev => [...prev, { id: step.id, type: 'user', text: step.user }]);
    await new Promise(resolve => setTimeout(resolve, 600));

    // Typing indicator
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsTyping(false);

    // Agent reasoning flow
    for (const reasoning of step.flow) {
      setActiveFlow(prev => [...prev, reasoning]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Agent reply
    setDisplayedSteps(prev => [...prev, { id: step.id, type: 'agent', text: step.agent }]);
    await new Promise(resolve => setTimeout(resolve, 600));

    // Tool used
    setDisplayedSteps(prev => [...prev, { id: step.id, type: 'tool', text: step.tool }]);
    await new Promise(resolve => setTimeout(resolve, 700));
  }

  setIsRunning(false);

  // ✅ Add 2-second delay before restarting the simulation
  await new Promise(resolve => setTimeout(resolve, 800));

  // Reset state
  setDisplayedSteps([]);
  setActiveFlow([]);
  setIsTyping(false);

  // Restart simulation (loop)
  runSimulation();
};


  const userMessages = displayedSteps.filter(s => s.type === 'user');
  const agentMessages = displayedSteps.filter(s => s.type === 'agent');
  const toolMessages = displayedSteps.filter(s => s.type === 'tool');

  return (
    <div ref={containerRef} className="md:min-h- p-4 md:p-8 relative">
      <div className=' w-screen h-full absolute top-0 left-0'></div>
      <div className="max-w-7xl mx-auto flex justify-center flex-col lg:flex-row">
        
        {/* Left - Chat */}
        <div className="flex-1 flex flex-col items-center px-4">
          {/* <div className="text-center mb-8">
            <p className="text-base text-lg mb-6">
              Watch how Sakura handles a flight change request
            </p>

            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-sm text-slate-600">Show AI Tools</span>
              <button
                onClick={() => setShowAgentTools(!showAgentTools)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  showAgentTools ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    showAgentTools ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div> */}

          {/* Chat Container */}
          <div className="bg-base-950 min-w-[350px] rounded-[34px] max-w-[500px] shadow-xl overflow-hidden md:mb-6">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img src="/min-logo.png" alt="Omo Logo" className="w-[90px]" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm">Online</span>
                </div>
              </div>
            </div>

            <div className="border-b border-white w-3/4 mx-auto mt-2" />

            {/* Chat Messages */}
            <div ref={chatScrollRef} className="h-[350px] overflow-y-auto p-6 space-y-4 bg-base-950 scrollbar-hide">
              <AnimatePresence>
                {conversation.map((conv) => {
                  const hasUser = userMessages.find(m => m.id === conv.id);
                  const hasAgent = agentMessages.find(m => m.id === conv.id);
                  const hasTool = toolMessages.find(m => m.id === conv.id);

                  return (
                    <div key={`msg-${conv.id}`} className="space-y-3 mt-3">
                      {hasUser && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end flex-col items-end gap-2">
                          <div className='mt-3 flex items-center gap-2'><img src='/dad.png' className='w-5 h-5' /> <div className='text-xs'>John</div></div>
                          <div className="bg-base-100 text-white px-5 py-3 rounded-[20px] max-w-[200px] shadow-md">
                            <p className="text-sm text-base-950 leading-relaxed">{conv.user}</p>
                          </div>
                        </motion.div>
                      )}

                      {hasAgent && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="flex items-start gap-2 flex-col">
                            <div className='mt-3 flex items-center gap-2'><img src='/sakura.png' className='w-6 h-6' /> <div className='text-xs'>Sakura AI</div></div>
                            <div className="space-y-2 flex-1">
                              <div className="bg-base-700 px-7 py-4 rounded-[20px] max-w-[200px] text-start shadow-sm">
                                <p className="text-sm leading-relaxed text-white">{conv.agent}</p>
                              </div>

                              {hasTool && showAgentTools && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2 pl-2">
                                  <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                                  </svg>
                                  <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
                                    {conv.tool}
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-start gap-3">
                    <img src='/sakura.png' className='w-6 h-6' />
                    <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl rounded-tl-md shadow-sm">
                      <div className="flex gap-1.5">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 bg-slate-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
