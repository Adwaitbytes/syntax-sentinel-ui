import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { CyberButton } from "@/components/ui/cyber-button";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationSystem({ notifications, onMarkAsRead, onClearAll }: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Info className="h-4 w-4 text-primary" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      <CyberButton
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-warning text-warning-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse-glow">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </CyberButton>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <GlassCard className="max-h-96 overflow-hidden">
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-primary">Notifications</h3>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <CyberButton
                      variant="outline"
                      size="sm"
                      onClick={onClearAll}
                    >
                      Clear All
                    </CyberButton>
                  )}
                  <CyberButton
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </CyberButton>
                </div>
              </div>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border/20">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/20 ${
                        !notification.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium text-primary truncate">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-warning rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/60 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    type: Notification["type"],
    title: string,
    message: string
  ) => {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [notification, ...prev]);
    
    // Also show toast
    toast({
      title,
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    clearAll,
  };
}