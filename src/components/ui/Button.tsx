'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function GradientButton({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'px-10 py-4 rounded-2xl font-semibold text-lg text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105';

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${
        disabled || isLoading
          ? 'bg-slate-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
      } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-3">
          <motion.svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
          Running...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
