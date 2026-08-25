'use client';

import React, { useState } from 'react';
import { Mail, SendHorizonal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulated API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 800);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8">
      {/* Main Banner Container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10 md:px-10 py-8 bg-[#E9F7F1] rounded-3xl border border-gray-100 shadow-sm transition-all duration-300">
        
        {/* Left Side: Illustration, Text, and Mail Icon */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
          
          {/* Illustration Stack */}
          {/* <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
        
            <div className="absolute top-0 right-3 z-10">
              <svg 
                className="w-20 h-24 md:w-24 md:h-28 text-[#00AA55]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13v2m0 0a1 1 0 001 1h4a1 1 0 001-1v-2" stroke="#00AA55" strokeOpacity="0.5"/>
              </svg>
            </div>
            
           
            <div className="absolute top-4 right-0 z-20">
              <div className="bg-[#FFC845] w-12 h-14 md:w-14 md:h-16 rounded-lg shadow-md flex flex-col items-center justify-center -rotate-12 border-4 border-white">
                <span className="text-lg md:text-xl font-bold text-[#444]">%</span>
                <span className="text-[10px] md:text-xs font-semibold text-[#444]">SAVE</span>
              </div>
            </div>
            
            
            <div className="absolute -top-1 -left-2 z-0">
              <div className="w-4 h-4 bg-[#FFC845] rounded-full rotate-45 border-4 border-white opacity-90"></div>
            </div>
            <div className="absolute bottom-6 left-2 z-0">
              <div className="w-3 h-3 bg-[#1FE0A0] rounded-full rotate-12 border-2 border-white"></div>
            </div>
          </div> */}

<Image
  src="/images/NewsletterSection-image.png"
  alt="Best deals"
  width={180}
  height={130}
  className="h-auto w-[180px] object-contain"
/>





          {/* Text and Mail Icon Group */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center md:text-left justify-center md:justify-start">
              {/* Envelope Icon */}
              <div className="flex items-center justify-center w-10 h-10 border border-[#00AA55] rounded-full p-2.5 bg-white/50">
                <Mail className="w-full h-full text-[#00AA55]" />
              </div>
              
              {/* Title Text */}
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                Get the <span className="text-[#00AA55]">Best Deals</span> First!
              </h2>
            </div>
            
            {/* Subtitle Text */}
            <p className="text-sm md:text-base text-gray-700 mt-1 max-w-sm">
              Subscribe to our newsletter and never miss amazing offers.
            </p>
          </div>
        </div>

        {/* Right Side: Form / Success Message with Animated Transition */}
        <div className="w-full max-w-lg min-h-[60px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              /* Input Form State */
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 w-full"
              >
                <div className="relative flex-grow w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    disabled={isLoading}
                    className="w-full px-5 py-4 pl-12 bg-white rounded-full border border-gray-100 placeholder:text-gray-400 text-gray-800 focus:ring-2 focus:ring-[#1FE0A0] focus:border-transparent outline-none transition"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#00AA55] hover:bg-[#008F48] text-white rounded-full font-semibold whitespace-nowrap shadow-md transition-all duration-150 hover:shadow-lg w-full sm:w-auto disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                     <div className='cursor-pointer flex items-center gap-2'>
                         <SendHorizonal className="h-5 w-5 -rotate-45" />
                      <span>Subscribe</span>
                     </div>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success Message State */
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex items-center gap-3 bg-white px-6 py-4 rounded-full border border-[#00AA55]/20 shadow-md text-[#00AA55] w-full justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                >
                  <CheckCircle2 className="w-7 h-7 text-[#00AA55]" />
                </motion.div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Thank you for subscribing!</h4>
                  <p className="text-xs text-gray-500">We have sent a confirmation to <span className="font-medium text-gray-700">{email}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default NewsletterBanner;