export interface TimeRange {
  startTime: string;
  endTime: string;
  interval: number;
}

export interface TimerState {
  isRunning: boolean;
  seconds: number;
  isPaused: boolean;
}

export interface Settings {
  notificationSound: string;
  darkMode: boolean;
  notificationVolume: number;
  vibration: boolean;
  defaultInterval: number;
}