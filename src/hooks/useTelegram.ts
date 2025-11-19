import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  colorScheme: "light" | "dark";
  initDataUnsafe: {
    user?: TelegramUser;
  };
  showAlert: (message: string, callback?: () => void) => void;
  openTelegramLink: (url: string) => void;
  HapticFeedback: {
    notificationOccurred: (type: "error" | "success" | "warning") => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegram = () => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (telegram) {
      telegram.ready();
      telegram.expand();
      setTg(telegram);
      setUser(telegram.initDataUnsafe.user || null);
      
      // Apply theme
      document.body.className = telegram.colorScheme === "dark" ? "dark" : "";
    }
  }, []);

  return { tg, user };
};
