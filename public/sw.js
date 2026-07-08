const WATER_MESSAGES = [
  "Stay hydrated! Take a sip 💦",
  "Your body needs water — drink up!",
  "Hydration check! Have some water 🚰",
  "Time for a water break! 💧",
  "Keep the water flowing! 🌊"
];

let timeoutIds = [];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SCHEDULE_REMINDERS") {
    // Clear existing timeouts
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds = [];

    const { times } = event.data;
    if (!times || !times.length) return;

    const now = Date.now();

    times.forEach((timeStr) => {
      const targetTime = new Date(timeStr).getTime();
      const delay = targetTime - now;

      // Only schedule if it's in the future
      if (delay > 0) {
        const id = setTimeout(() => {
          const randomMsg = WATER_MESSAGES[Math.floor(Math.random() * WATER_MESSAGES.length)];
          self.registration.showNotification("💧 Time to Drink Water!", {
            body: randomMsg,
            icon: "/logo.png",
            badge: "/logo.png",
            vibrate: [200, 100, 200],
            requireInteraction: true,
            data: { url: "/" }
          });
        }, delay);
        timeoutIds.push(id);
      }
    });
  } else if (event.data && event.data.type === "CANCEL_REMINDERS") {
    timeoutIds.forEach((id) => clearTimeout(id));
    timeoutIds = [];
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  // Focus the window/tab or open a new one
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data.url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
