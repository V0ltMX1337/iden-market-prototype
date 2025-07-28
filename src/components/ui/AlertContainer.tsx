import { useEffect } from 'react';
import { Alert, AlertType } from '@/hooks/useAlert';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AlertItemProps {
  alert: Alert;
  onRemove: (id: string) => void;
}

const AlertItem = ({ alert, onRemove }: AlertItemProps) => {
  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: 'CheckCircle',
          iconColor: 'text-green-600',
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: 'XCircle',
          iconColor: 'text-red-600',
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: 'AlertTriangle',
          iconColor: 'text-yellow-600',
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'Info',
          iconColor: 'text-blue-600',
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: 'Info',
          iconColor: 'text-gray-600',
        };
    }
  };

  const styles = getAlertStyles(alert.type);

  useEffect(() => {
    if (alert.duration && alert.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(alert.id);
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert.id, alert.duration, onRemove]);

  return (
    <div
      className={`
        relative flex items-start space-x-3 p-4 border rounded-lg shadow-lg
        backdrop-blur-sm transform transition-all duration-300 ease-in-out
        hover:shadow-xl animate-in slide-in-from-right-5 fade-in-0
        ${styles.container}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon 
          name={styles.icon as any} 
          className={`w-5 h-5 ${styles.iconColor}`} 
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {alert.title && (
          <h4 className="text-sm font-semibold mb-1">
            {alert.title}
          </h4>
        )}
        <p className="text-sm leading-relaxed">
          {alert.message}
        </p>
        
        {/* Action button */}
        {alert.action && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={alert.action.onClick}
              className={`
                text-xs border-current hover:bg-current hover:text-white
                transition-colors duration-200
              `}
            >
              {alert.action.label}
            </Button>
          </div>
        )}
      </div>

      {/* Close button */}
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(alert.id)}
          className="h-6 w-6 p-0 hover:bg-black/10 rounded-full"
        >
          <Icon name="X" className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar for duration */}
      {alert.duration && alert.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-current opacity-30 rounded-b-lg animate-pulse"
            style={{
              animation: `shrink ${alert.duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
};

interface AlertContainerProps {
  alerts: Alert[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
}

const AlertContainer = ({ alerts, onRemove, onClearAll }: AlertContainerProps) => {
  if (alerts.length === 0) return null;

  return (
    <>

      
      {/* Alert container */}
      <div className="fixed top-4 right-4 z-[9999] w-full max-w-sm space-y-3">
        {/* Clear all button */}
        {alerts.length > 1 && onClearAll && (
          <div className="flex justify-end mb-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onClearAll}
              className="text-xs bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Icon name="X" className="w-3 h-3 mr-1" />
              Закрыть все
            </Button>
          </div>
        )}

        {/* Alert items */}
        <div className="space-y-3 max-h-screen overflow-y-auto">
          {alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AlertContainer;