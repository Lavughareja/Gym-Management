// firebase-messaging-sw.js
// Handles background push notifications when the app is not in the foreground.
// The Firebase config is passed from the main app via postMessage after registration.

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

let messagingInitialized = false;

// Listen for config sent from the main app (firebase.ts)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    if (messagingInitialized) return;
    try {
      firebase.initializeApp(event.data.config);
      const messaging = firebase.messaging();

      // Handle background messages (when app tab is NOT focused)
      messaging.onBackgroundMessage((payload) => {
        console.log('[SW] Background message received:', payload);
        const title = payload.notification?.title || 'New Notification';
        const options = {
          body: payload.notification?.body || '',
          icon: '/vite.svg',
          badge: '/vite.svg',
          data: payload.data || {},
        };
        self.registration.showNotification(title, options);
      });

      messagingInitialized = true;
      console.log('[SW] Firebase initialized via postMessage.');
    } catch (err) {
      console.error('[SW] Failed to init Firebase:', err);
    }
  }
});

// When user clicks the notification, open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.focus();
          if ('navigate' in client) client.navigate(url);
          return;
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
