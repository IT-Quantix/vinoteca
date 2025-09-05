import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private notificationIdCounter = 0;

  notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  showNotification(message: string, type: Notification['type'] = 'info', duration: number = 3000): void {
    const notification: Notification = {
      id: ++this.notificationIdCounter,
      message,
      type,
      duration
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    if (duration > 0) {
      timer(duration).subscribe(() => {
        this.removeNotification(notification.id);
      });
    }
  }

  removeNotification(id: number): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  success(message: string, duration?: number): void {
    this.showNotification(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.showNotification(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.showNotification(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.showNotification(message, 'warning', duration);
  }
}