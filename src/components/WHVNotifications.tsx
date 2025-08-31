import React, { useState } from 'react';
import { ArrowLeft, Heart, User, Bell, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
}

const WhvNotifications: React.FC = () => {
  const navigate = useNavigate();
  const [alertNotifications, setAlertNotifications] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'Match & Like Activity',
      message: 'An employer liked your profile.',
      isRead: false,
    },
    {
      id: '2',
      type: 'Match & Like Activity',
      message: 'You have a new mutual match with Kangafarm.',
      isRead: false,
    },
    {
      id: '3',
      type: 'Profile Update',
      message: 'Your WHV profile was updated successfully.',
      isRead: true,
    },
    {
      id: '4',
      type: 'Reminder',
      message: 'Update your availability to attract more employers.',
      isRead: false,
    },
    {
      id: '5',
      type: 'System Notification',
      message: 'Welcome to RegionalMate! Complete your WHV profile to start matching.',
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Match & Like Activity':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'Profile Update':
        return <User className="w-5 h-5 text-green-500" />;
      case 'Reminder':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'System Notification':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* iPhone 16 Pro Max frame */}
      <div className="w-[430px] h-[932px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-background rounded-[48px] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>

          {/* Main content container */}
          <div className="w-full h-full flex flex-col relative bg-gray-200">
            {/* Header */}
            <div className="px-6 pt-16 pb-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 bg-white rounded-xl shadow-sm mr-4"
                  onClick={() => navigate('/whv/dashboard')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              {/* Turn Notifications On/Off Setting */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Turn Notifications On/Off</h3>
                    <p className="text-sm text-gray-500">You will be notified about important updates</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      {alertNotifications ? 'ON' : 'OFF'}
                    </span>
                    <Switch
                      checked={alertNotifications}
                      onCheckedChange={setAlertNotifications}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <div className="flex items-start">
                      {/* Icon */}
                      <div className="mr-4 mt-1 flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-semibold text-gray-900">{notification.type}</h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full ml-2"></div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{notification.message}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhvNotifications;
