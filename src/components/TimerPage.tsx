import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Square } from 'lucide-react';
import type { TimerState } from '../types';

export function TimerPage() {
  const [timer, setTimer] = useState<TimerState>({
    isRunning: false,
    seconds: 0,
    isPaused: false
  });

  useEffect(() => {
    let interval: number;
    
    if (timer.isRunning && !timer.isPaused) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          seconds: prev.seconds + 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isRunning, timer.isPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimer(prev => ({ ...prev, isRunning: true, isPaused: false }));
  };

  const handlePause = () => {
    setTimer(prev => ({ ...prev, isPaused: true }));
  };

  const handleResume = () => {
    setTimer(prev => ({ ...prev, isPaused: false }));
  };

  const handleStop = () => {
    setTimer(prev => ({ ...prev, isRunning: false, isPaused: false }));
  };

  const handleReset = () => {
    setTimer({ isRunning: false, seconds: 0, isPaused: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 pb-24 md:pb-4 md:pt-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 font-mono tracking-wider break-all">
              {formatTime(timer.seconds)}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {!timer.isRunning ? (
              <button
                onClick={handleStart}
                className="col-span-2 flex items-center justify-center space-x-2 py-2.5 sm:py-4 px-4 sm:px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={20} className="sm:w-6 sm:h-6" />
                <span>Start</span>
              </button>
            ) : (
              <>
                {timer.isPaused ? (
                  <button
                    onClick={handleResume}
                    className="flex items-center justify-center space-x-2 py-2.5 sm:py-4 px-4 sm:px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Play size={20} className="sm:w-6 sm:h-6" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex items-center justify-center space-x-2 py-2.5 sm:py-4 px-4 sm:px-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Pause size={20} className="sm:w-6 sm:h-6" />
                    <span>Pause</span>
                  </button>
                )}
                <button
                  onClick={handleStop}
                  className="flex items-center justify-center space-x-2 py-2.5 sm:py-4 px-4 sm:px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Square size={20} className="sm:w-6 sm:h-6" />
                  <span>Stop</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center space-x-2 py-2.5 sm:py-4 px-4 sm:px-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <RefreshCw size={20} className="sm:w-6 sm:h-6" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}