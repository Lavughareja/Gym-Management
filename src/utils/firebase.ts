import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { AxiosInstance } from '../axios/axiosInstance';

// Fill these from: Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY             || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN         || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID          || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET      || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID              || '',
};

// VAPID key from Firebase Console > Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';

let messagingInstance: ReturnType<typeof getMessaging> | null = null;
let firebaseApp: ReturnType<typeof initializeApp> | null = null;

const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.messagingSenderId &&
    VAPID_KEY
  );
};

const getMessagingInstance = () => {
  if (!isFirebaseConfigured()) return null;
  if (messagingInstance) return messagingInstance;
  try {
    if (!firebaseApp) {
      firebaseApp = initializeApp(firebaseConfig);
    }
    messagingInstance = getMessaging(firebaseApp);
    return messagingInstance;
  } catch (err) {
    console.warn('[FCM] Firebase init failed:', err);
    return null;
  }
};

/**
 * Request notification permission from the user and register the FCM token with the backend.
 * Call this after the user logs in.
 */
export const requestNotificationPermission = async (): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.warn('[FCM] Firebase not configured. Skipping push notification setup.');
    return;
  }
  if (!('Notification' in window)) {
    console.warn('[FCM] This browser does not support notifications.');
    return;
  }
  if (!('serviceWorker' in navigator)) {
    console.warn('[FCM] Service workers not supported.');
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('[FCM] Notification permission denied or dismissed.');
      return;
    }

    // Register the service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    // Send Firebase config to service worker so it can initialize Firebase in background
    if (registration.active) {
      registration.active.postMessage({ type: 'FIREBASE_CONFIG', config: firebaseConfig });
    } else {
      // Wait for the SW to become active
      navigator.serviceWorker.ready.then((reg) => {
        reg.active?.postMessage({ type: 'FIREBASE_CONFIG', config: firebaseConfig });
      });
    }

    const messaging = getMessagingInstance();
    if (!messaging) return;

    const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
    if (!token) {
      console.warn('[FCM] No registration token available.');
      return;
    }

    // Avoid re-registering the same token
    const savedToken = localStorage.getItem('fcm_token');
    if (savedToken === token) return;

    // Register token with backend
    await AxiosInstance.post('/notifications/register-token', { token });
    localStorage.setItem('fcm_token', token);
    console.log('[FCM] Token registered with backend.');

    // Handle foreground messages (when app is open and focused)
    onMessage(messaging, (payload) => {
      console.log('[FCM] Foreground message received:', payload);
      if (Notification.permission === 'granted' && payload.notification) {
        const notif = new Notification(payload.notification.title || 'New Notification', {
          body: payload.notification.body || '',
          icon: '/vite.svg',
        });
        notif.onclick = () => {
          const url = payload.data?.url;
          if (url) window.location.href = url;
          notif.close();
        };
      }
    });
  } catch (error) {
    console.error('[FCM] Failed to register push notification token:', error);
  }
};

/**
 * Remove the FCM token from the backend when the user logs out.
 */
export const removeFcmToken = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('fcm_token');
    if (!token) return;
    await AxiosInstance.delete('/notifications/remove-token', { data: { token } });
    localStorage.removeItem('fcm_token');
    console.log('[FCM] Token removed from backend.');
  } catch (error) {
    console.error('[FCM] Failed to remove FCM token:', error);
  }
};
