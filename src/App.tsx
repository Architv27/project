import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ReminderPage } from './components/ReminderPage';
import { TimerPage } from './components/TimerPage';
import { SettingsPage } from './components/SettingsPage';
import type { Settings } from './types';
import "./index.css";

// In-memory fallback if localStorage isn’t available or is blocked
let inMemorySettings: Settings = {
  notificationSound: 'beep',
  darkMode: false,
  notificationVolume: 80,
  vibration: true,
  defaultInterval: 15,
};

/**
 * Safely checks if localStorage is available (not disabled/restricted in a WebView).
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

function App() {
  const [activeTab, setActiveTab] = useState('reminder');
  const [settings, setSettings] = useState<Settings>(inMemorySettings);

  // Track whether localStorage is actually usable in this environment.
  const localStorageEnabledRef = useRef<boolean>(false);

  // On mount, try loading settings from localStorage (if allowed).
  useEffect(() => {
    localStorageEnabledRef.current = canUseLocalStorage();

    if (localStorageEnabledRef.current) {
      const savedData = localStorage.getItem('userSettings');
      if (savedData) {
        inMemorySettings = JSON.parse(savedData);
      }
    }
    // Whether we got them from localStorage or not, initialize from inMemorySettings
    setSettings(inMemorySettings);
  }, []);

  // Whenever settings changes, save to localStorage (if available) and in-memory fallback
  useEffect(() => {
    // Keep our global fallback in sync with current settings
    inMemorySettings = settings;

    if (localStorageEnabledRef.current) {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Apply dark mode class whenever settings.darkMode changes
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {activeTab === 'reminder' && <ReminderPage />}
      {activeTab === 'timer' && <TimerPage />}
      
      {activeTab === 'settings' && (
        <SettingsPage
          settings={settings}
          onSettingsChange={setSettings} // Let SettingsPage update the parent
        />
      )}

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
