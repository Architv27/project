import React, { useState, useEffect, useRef } from 'react';
import { Bell, Clock, AlertCircle } from 'lucide-react';
import type { TimeRange } from '../types';

// Simple in-memory fallback in case localStorage is not available
let inMemorySettings: TimeRange & { isActive: boolean } = {
  startTime: '',
  endTime: '',
  interval: 15,
  isActive: false,
};

/**
 * Safely checks if localStorage is available (not disabled/restricted in the WebView).
 */
function canUseLocalStorage() {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function ReminderPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    startTime: '',
    endTime: '',
    interval: 15,
  });
  const [isActive, setIsActive] = useState(false);
  const [nextReminder, setNextReminder] = useState<string | null>(null);

  // Tracks whether localStorage is available in the current environment (WebView).
  const localStorageEnabledRef = useRef<boolean>(false);

  // Keep track of the "minute mark" where we last played the notification.
  // This ensures we only play once per qualifying interval.
  const lastBeepMinuteRef = useRef<number | null>(null);

  useEffect(() => {
    // Check once if localStorage is available.
    localStorageEnabledRef.current = canUseLocalStorage();

    // If available, load saved settings from localStorage (if present).
    if (localStorageEnabledRef.current) {
      const savedData = localStorage.getItem('reminderSettings');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setTimeRange({
          startTime: parsedData.startTime || '',
          endTime: parsedData.endTime || '',
          interval: parsedData.interval || 15,
        });
        setIsActive(!!parsedData.isActive);
      }
    } else {
      // If localStorage is not available, load from inMemorySettings
      setTimeRange({
        startTime: inMemorySettings.startTime,
        endTime: inMemorySettings.endTime,
        interval: inMemorySettings.interval,
      });
      setIsActive(inMemorySettings.isActive);
    }
  }, []);

  // Whenever timeRange or isActive changes, save the current settings.
  useEffect(() => {
    if (localStorageEnabledRef.current) {
      localStorage.setItem(
        'reminderSettings',
        JSON.stringify({ ...timeRange, isActive })
      );
    } else {
      inMemorySettings = { ...timeRange, isActive };
    }
  }, [timeRange, isActive]);

  useEffect(() => {
    let intervalId: number;

    if (isActive) {
      intervalId = window.setInterval(() => {
        const now = new Date();
        // Current time in 24-hour format (e.g., "09:15:03")
        const current = now.toLocaleTimeString('en-US', { hour12: false });
        const { startTime, endTime, interval } = timeRange;

        // If current time is between the user-defined range:
        if (current >= startTime && current <= endTime) {
          const hour = now.getHours();
          const minutes = now.getMinutes();
          const totalMinutes = hour * 60 + minutes;

          // If we've hit the multiple (e.g., every "interval" minutes)
          if (totalMinutes % interval === 0) {
            // Only play audio if we haven't already played it this interval
            if (lastBeepMinuteRef.current !== totalMinutes) {
              new Audio('/notification.wav')
                .play()
                .catch((err) => {
                  console.warn(
                    'Audio playback failed (possibly due to iOS/Android restrictions):',
                    err
                  );
                });

              lastBeepMinuteRef.current = totalMinutes;
            }
          }

          // Calculate next reminder time
          const nextMinutes = Math.ceil(minutes / interval) * interval;
          const nextTime = new Date(now);
          nextTime.setMinutes(nextMinutes);
          nextTime.setSeconds(0);
          setNextReminder(nextTime.toLocaleTimeString());
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, timeRange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActive(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 pb-24 md:pb-4 md:pt-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="relative">
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 dark:text-blue-400 animate-pulse-slow" />
              {isActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Interval Reminder
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Start Time
                </label>
                <input
                  type="time"
                  value={timeRange.startTime}
                  onChange={(e) =>
                    setTimeRange((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  End Time
                </label>
                <input
                  type="time"
                  value={timeRange.endTime}
                  onChange={(e) =>
                    setTimeRange((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Interval (minutes)
                </label>
                <select
                  value={timeRange.interval}
                  onChange={(e) =>
                    setTimeRange((prev) => ({
                      ...prev,
                      interval: parseInt(e.target.value, 10),
                    }))
                  }
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400"
                >
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isActive ? 'Reminder Active' : 'Start Reminder'}
            </button>

            {isActive && (
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Stop Reminder
              </button>
            )}
          </form>

          {isActive && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 dark:bg-gray-700 rounded-lg transform transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Reminder active from {timeRange.startTime} to {timeRange.endTime}
                </p>
              </div>
              {nextReminder && (
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Next reminder at {nextReminder}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
