import { useState, useCallback } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useAlert = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback((alert: Omit<Alert, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: Alert = {
      ...alert,
      id,
      duration: alert.duration ?? 5000,
    };

    setAlerts(prev => [...prev, newAlert]);

    // Auto remove alert after duration
    if (newAlert.duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, newAlert.duration);
    }

    return id;
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message: string, title?: string, options?: Partial<Alert>) => {
    return addAlert({
      type: 'success',
      title,
      message,
      ...options,
    });
  }, [addAlert]);

  const showError = useCallback((message: string, title?: string, options?: Partial<Alert>) => {
    return addAlert({
      type: 'error',
      title,
      message,
      duration: 7000, // Errors stay longer
      ...options,
    });
  }, [addAlert]);

  const showWarning = useCallback((message: string, title?: string, options?: Partial<Alert>) => {
    return addAlert({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }, [addAlert]);

  const showInfo = useCallback((message: string, title?: string, options?: Partial<Alert>) => {
    return addAlert({
      type: 'info',
      title,
      message,
      ...options,
    });
  }, [addAlert]);

  return {
    alerts,
    addAlert,
    removeAlert,
    clearAllAlerts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};