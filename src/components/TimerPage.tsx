import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import type { TimerState } from '../types';

export function TimerPage() {
  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    seconds: 0,
    isPaused: false,
  });

  useEffect(() => {
    let interval: number;
    if (timer.isRunning && !timer.isPaused) {
      interval = window.setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          seconds: prev.seconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.isPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimer((prev) => ({ ...prev, isRunning: true, isPaused: false }));
  };

  const handlePause = () => {
    setTimer((prev) => ({ ...prev, isPaused: true }));
  };

  const handleResume = () => {
    setTimer((prev) => ({ ...prev, isPaused: false }));
  };

  const handleStop = () => {
    setTimer({ isRunning: false, seconds: 0, isPaused: false });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-2">
      {/* 
        This container (relative) so we can position wave/circle absolutely inside it. 
        "max-w-md w-full" ensures it doesn’t exceed 768px on large screens but 
        still shrinks for smaller devices.
      */}
      <div className="relative w-full max-w-md flex justify-center">
        {/* Wave Layer */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 0, pointerEvents: 'none' }}
        >
          <div className="animate-wave" style={{ width: '60vw', height: '60vw' }} />
        </div>

        {/* Breathe Circle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 1, pointerEvents: 'none' }}
        >
          <div
            className="rounded-full animate-breathe"
            style={{ width: '40vw', height: '40vw' }}
          />
        </div>

        {/* Timer UI (Foreground) */}
        <div className="relative z-10 text-center pt-12 pb-10 px-4 w-full">
          <h1 className="text-4xl sm:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 font-mono tracking-wider break-all">
            {formatTime(timer.seconds)}
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-mono mb-6 sm:mb-8">
            {new Date().toLocaleTimeString()}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {!timer.isRunning ? (
              <button
                onClick={handleStart}
                className="col-span-2 flex items-center justify-center space-x-2 py-3 sm:py-4 px-4 sm:px-6 bg-teal-400 hover:bg-teal-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={20} className="sm:w-6 sm:h-6" />
                <span>Start</span>
              </button>
            ) : (
              <>
                {timer.isPaused ? (
                  <button
                    onClick={handleResume}
                    className="flex items-center justify-center space-x-2 py-3 sm:py-4 px-4 sm:px-6 bg-teal-400 hover:bg-teal-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Play size={20} className="sm:w-6 sm:h-6" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex items-center justify-center space-x-2 py-3 sm:py-4 px-4 sm:px-6 bg-amber-400 hover:bg-amber-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Pause size={20} className="sm:w-6 sm:h-6" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center space-x-2 py-3 sm:py-4 px-4 sm:px-6 bg-rose-400 hover:bg-rose-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Square size={20} className="sm:w-6 sm:h-6" />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Keyframes (using "vw" so shapes scale to screen width) */}
      <style>
        {`
          /* WAVE ANIMATION */
          @keyframes waveLight {
            0% {
              border-radius: 50%;
              background-color: #fde7f7;
              transform: scale(1);
            }
            33% {
              border-radius: 45% 55% 48% 52%;
              background-color: #fce1f3;
              transform: scale(1.05) rotate(2deg);
            }
            66% {
              border-radius: 55% 45% 52% 48%;
              background-color: #fbdaf0;
              transform: scale(1.1) rotate(-1deg);
            }
            100% {
              border-radius: 50%;
              background-color: #fde7f7;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes waveDark {
            0% {
              border-radius: 50%;
              background-color: #4b5563;
              transform: scale(1);
            }
            33% {
              border-radius: 45% 55% 48% 52%;
              background-color: #52525b;
              transform: scale(1.05) rotate(2deg);
            }
            66% {
              border-radius: 55% 45% 52% 48%;
              background-color: #3f3f46;
              transform: scale(1.1) rotate(-1deg);
            }
            100% {
              border-radius: 50%;
              background-color: #4b5563;
              transform: scale(1) rotate(0deg);
            }
          }

          .animate-wave {
            animation: waveLight 8s ease-in-out infinite;
          }
          .dark .animate-wave {
            animation: waveDark 8s ease-in-out infinite;
          }

          /* BREATHING CIRCLE */
          @keyframes breatheLight {
            0%, 100% {
              transform: scale(1);
              background-color: #a5f3fc; /* teal-200 */
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            }
            50% {
              transform: scale(1.1);
              background-color: #67e8f9; /* teal-300 */
              box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
            }
          }

          @keyframes breatheDark {
            0%, 100% {
              transform: scale(1);
              background-color: #334155; 
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            }
            50% {
              transform: scale(1.1);
              background-color: #1e293b; 
              box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
            }
          }

          .animate-breathe {
            animation: breatheLight 6s ease-in-out infinite;
          }
          .dark .animate-breathe {
            animation: breatheDark 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
