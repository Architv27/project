import React from 'react';
import { Volume2, Moon, Vibrate, Clock } from 'lucide-react';
import type { Settings } from '../types';

interface SettingsPageProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export function SettingsPage({ settings, onSettingsChange }: SettingsPageProps) {
  const handleChange = (key: keyof Settings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 p-4 pb-24 md:pb-4 md:pt-20">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transform transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
            Settings
          </h1>

          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <label className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="flex items-center space-x-2 sm:space-x-3 text-gray-700 dark:text-gray-300">
                  <Volume2 size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-medium">Notification Sound</span>
                </span>
                <select
                  value={settings.notificationSound}
                  onChange={(e) => handleChange('notificationSound', e.target.value)}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:border-green-500 dark:hover:border-green-400 focus:ring-2 focus:ring-green-500"
                >
                  <option value="beep">Beep</option>
                  <option value="bell">Bell</option>
                  <option value="chime">Chime</option>
                </select>
              </label>
            </div>

            <div className="group">
              <label className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="flex items-center space-x-2 sm:space-x-3 text-gray-700 dark:text-gray-300">
                  <Clock size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-medium">Default Interval</span>
                </span>
                <select
                  value={settings.defaultInterval}
                  onChange={(e) => handleChange('defaultInterval', parseInt(e.target.value))}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:border-green-500 dark:hover:border-green-400 focus:ring-2 focus:ring-green-500"
                >
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </label>
            </div>

            <div className="group">
              <label className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="flex items-center space-x-2 sm:space-x-3 text-gray-700 dark:text-gray-300">
                  <Volume2 size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-medium">Volume</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.notificationVolume}
                  onChange={(e) => handleChange('notificationVolume', parseInt(e.target.value))}
                  className="w-24 sm:w-32 accent-green-600 dark:accent-green-400"
                />
              </label>
            </div>

            <div className="group">
              <label className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="flex items-center space-x-2 sm:space-x-3 text-gray-700 dark:text-gray-300">
                  <Moon size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-medium">Dark Mode</span>
                </span>
                <div className="relative inline-block w-12 sm:w-14 h-6 sm:h-7">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleChange('darkMode', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors ${
                      settings.darkMode ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 sm:w-5 h-4 sm:h-5 rounded-full transition-transform transform ${
                      settings.darkMode ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </div>
              </label>
            </div>

            <div className="group">
              <label className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="flex items-center space-x-2 sm:space-x-3 text-gray-700 dark:text-gray-300">
                  <Vibrate size={20} className="sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  <span className="text-sm sm:text-base font-medium">Vibration</span>
                </span>
                <div className="relative inline-block w-12 sm:w-14 h-6 sm:h-7">
                  <input
                    type="checkbox"
                    checked={settings.vibration}
                    onChange={(e) => handleChange('vibration', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors ${
                      settings.vibration ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 sm:w-5 h-4 sm:h-5 rounded-full transition-transform transform ${
                      settings.vibration ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}