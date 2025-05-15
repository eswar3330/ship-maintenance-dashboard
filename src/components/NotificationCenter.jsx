import React, { useContext } from 'react';
import { NotificationsContext } from '../contexts/NotificationsContext';

const NotificationCenter = () => {
  const { notifications, removeNotification } = useContext(NotificationsContext);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 w-80 max-h-[80vh] overflow-y-auto space-y-2 z-50">
      {notifications.map(({ id, message, type }) => (
        <div 
          key={id} 
          className={`p-4 rounded shadow-md flex justify-between items-center
            ${
              type === 'info' ? 'bg-blue-100 text-blue-700' :
              type === 'success' ? 'bg-green-100 text-green-700' :
              type === 'error' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}
        >
          <span>{message}</span>
          <button 
            onClick={() => removeNotification(id)} 
            className="ml-4 font-bold hover:text-gray-900"
            aria-label="Dismiss notification"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
