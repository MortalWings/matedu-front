'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from '@/components/ui/notification';

interface NotificationData {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (notification: Omit<NotificationData, 'id'>) => void;
  showError: (message: string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback((notification: Omit<NotificationData, 'id'>) => {
    const id = Date.now().toString();
    const newNotification: NotificationData = {
      ...notification,
      id,
    };
    
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showError = useCallback((message: string, title = 'Error') => {
    showNotification({ type: 'error', title, message });
  }, [showNotification]);

  const showSuccess = useCallback((message: string, title = 'Éxito') => {
    showNotification({ type: 'success', title, message });
  }, [showNotification]);

  const showInfo = useCallback((message: string, title = 'Información') => {
    showNotification({ type: 'info', title, message });
  }, [showNotification]);

  const showWarning = useCallback((message: string, title = 'Advertencia') => {
    showNotification({ type: 'warning', title, message });
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showError,
        showSuccess,
        showInfo,
        showWarning,
      }}
    >
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
