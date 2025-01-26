import React from 'react';
import { Clock, Timer, Settings } from 'lucide-react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:top-0 md:bottom-auto border-t md:border-t-0 md:border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('reminder')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
              activeTab === 'reminder' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
            }`}
          >
            <Clock size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">Reminder</span>
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
              activeTab === 'timer' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
            }`}
          >
            <Timer size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">Timer</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'text-blue-600 dark:text-blue-400 scale-110' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
            }`}
          >
            <Settings size={20} className="sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
}