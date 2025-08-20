import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [alertNotifications, setAlertNotifications] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'Match and Like Activity',
      message: 'Outback Winery liked your profile.',
      isRead: false
    },
    {
      id: '2', 
      type: 'Match and Like Activity',
      message: 'Kangafarm liked you back — it\'s a match',
      isRead: false
    },
    {
      id: '3',
      type: 'Like Milestone',
      message: 'You\'ve received 5 likes — keep it going.',
      isRead: false
    },
    {
      id: '4',
      type: 'Visa Expiry Reminder',
      message: 'Your WHV visa is expiring in 30 days. Update your details if renewed.',
      isRead: true
    },
    {
      id: '5',
      type: 'Profile Updated', 
      message: 'Your WHV profile has been successfully updated.',
      isRead: true
    },
    {
      id: '6',
      type: 'Welcome Message',
      message: 'Welcome to RegionalMate! Complete your profile and start connecting with Regional Employers.',
      isRead: true
    }
  ]);

  const handleNotificationClick = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
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
                  onClick={() => navigate('/whv-dashboard')}
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 px-6 overflow-y-auto">
              
              {/* Alert Notification Setting */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alert Notification</h3>
                    <p className="text-sm text-gray-500">You will be notified for new notifications</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">ON</span>
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
                      {/* Status Dot */}
                      <div className={`w-3 h-3 rounded-full mr-4 mt-1 flex-shrink-0 ${
                        notification.isRead ? 'bg-gray-400' : 'bg-orange-500'
                      }`}></div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {notification.type}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {notification.message}
                        </p>
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

export default Notifications;