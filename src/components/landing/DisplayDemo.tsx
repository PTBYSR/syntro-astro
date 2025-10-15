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
  const chatScrollRef = useRef(null);
  const flowScrollRef = useRef(null);

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

  const runSimulation = async () => {
    setIsRunning(true);
    setDisplayedSteps([]);
    setActiveFlow([]);

    for (let i = 0; i < conversation.length; i++) {
      const step = conversation[i];

      // User message
      setDisplayedSteps(prev => [...prev, { id: step.id, type: 'user', text: step.user }]);
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Typing effect
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsTyping(false);

      // Step-by-step reasoning flow reveal
      for (const reasoning of step.flow) {
        setActiveFlow(prev => [...prev, reasoning]);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Agent reply
      setDisplayedSteps(prev => [...prev, { id: step.id, type: 'agent', text: step.agent }]);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Tool usage
      setDisplayedSteps(prev => [...prev, { id: step.id, type: 'tool', text: step.tool }]);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    setIsRunning(false);
  };

  const userMessages = displayedSteps.filter(s => s.type === 'user');
  const agentMessages = displayedSteps.filter(s => s.type === 'agent');
  const toolMessages = displayedSteps.filter(s => s.type === 'tool');

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className=" max-w-7xl mx-auto flex justify-center  flex-col lg:flex-row">
        
        {/* Left - Chat */}
        <div className="flex-1 flex flex-col items-center px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-base text-lg mb-6">
              Watch how AI handles a flight change request
            </p>

            {/* Toggle */}
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
          </div>

          {/* Chat Container */}
          <div className="bg-accent-950 min-w-[400px] rounded-[34px] max-w-[500px]  shadow-xl overflow-hidden mb-6 ">
            {/* Chat Header */}
            <div className=" px-6 py-4">
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <div>

                  <img src="/min-logo.png" alt="Omo Logo" className="w-[90px]" />
                  </div>
                  {/* <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div> */}
                  
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
              {displayedSteps.length === 0 && !isRunning && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {/* <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-slate-500 text-lg font-medium mb-2">Ready to see it in action?</p>
                  <p className="text-slate-400 text-sm">Click the button below to start</p> */}
                </div>
              )}

              <AnimatePresence>
                {conversation.map((conv) => {
                  const hasUser = userMessages.find(m => m.id === conv.id);
                  const hasAgent = agentMessages.find(m => m.id === conv.id);
                  const hasTool = toolMessages.find(m => m.id === conv.id);

                  return (
                    <div key={`msg-${conv.id}`} className=" space-y-3 mt-3">
                      
                      {/* User Message */}
                      {hasUser && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end flex-col items-end gap-2">
                          <div className='mt-3 flex items-center gap-2'><img src='/dad.png' className='w-5 h-5' /> <div className='text-xs'>John</div></div>
                          <div className="bg-base-100 text-white px-5 py-3 rounded-[20px] max-w-[200px]  shadow-md">
                            <p className="font- text-start text-sm text-base-950 leading-relaxed">{conv.user}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Agent Message */}
                      {hasAgent && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <div className="flex items-start gap-2 flex-col">
                            <div className='mt-3 flex items-center gap-2'><img src='/sakura.png' className='w-6 h-6' /> <div className='text-xs'>Sakura AI</div></div>
                            {/* <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div> */}
                            <div className="space-y-2 flex-1">
                              <div className="bg-base-700 px-7 py-4  rounded-[20px] max-w-[200px] text-start shadow-sm">
                                <p className="text-sm leading-relaxed text-white">{conv.agent}</p>
                              </div>

                              {/* Tool Badge */}
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

                {/* Typing Indicator */}
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

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`px-10 py-4 rounded-full font-semibold text-lg text-base-950 transition-all ${
                isRunning
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-main-400 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              {isRunning ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Running Demo...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Demo
                </span>
              )}
            </button>
            <p className="text-slate-500 text-sm mt-4">
              See how AI resolves customer requests in real-time
            </p>
          </div>
        </div>

        {/* Right - AI Reasoning Flow */}
        {/* <div className="w-full lg:w-96 bg-white rounded-2xl h-[500px]  shadow-xl p-6">
          <h3 className="text-lg text-base-950 font-semibold mb-4">Sakura's Reasoning</h3>
          <div ref={flowScrollRef} className="h-[350px] overflow-y-auto pr-2 scrollbar-hide">
            <motion.ul layout className="space-y-3">
              {activeFlow.map((step, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1 h-1 bg-base-950 rounded-full mt-1" />
                  <p className="text-xs text-base-950">{step}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div> */}
      </div>
    </div>
  );
}
