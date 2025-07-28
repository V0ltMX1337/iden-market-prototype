import React, { createContext, useContext } from 'react';
import { useAlert } from '@/hooks/useAlert';
import AlertContainer from '@/components/ui/AlertContainer';
import type { Alert } from '@/hooks/useAlert';

interface AlertContextType {
  alerts: Alert[];
  showSuccess: (message: string, title?: string, options?: Partial<Alert>) => string;
  showError: (message: string, title?: string, options?: Partial<Alert>) => string;
  showWarning: (message: string, title?: string, options?: Partial<Alert>) => string;
  showInfo: (message: string, title?: string, options?: Partial<Alert>) => string;
  removeAlert: (id: string) => void;
  clearAllAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const alertHook = useAlert();

  return (
    <AlertContext.Provider value={alertHook}>
      {children}
      <AlertContainer
        alerts={alertHook.alerts}
        onRemove={alertHook.removeAlert}
        onClearAll={alertHook.clearAllAlerts}
      />
    </AlertContext.Provider>
  );
};