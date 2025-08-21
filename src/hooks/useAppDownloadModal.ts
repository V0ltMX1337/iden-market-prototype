import { useState, useEffect } from "react";

const COOKIE_NAME = "app_download_modal_shown";
const COOKIE_EXPIRES_DAYS = 30;

export const useAppDownloadModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasShown = getCookie(COOKIE_NAME);
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setCookie(COOKIE_NAME, "true", COOKIE_EXPIRES_DAYS);
  };

  return {
    isOpen,
    closeModal,
  };
};

function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}