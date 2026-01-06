self.addEventListener("install", (event) => {
  console.log("SW installing...");
});

self.addEventListener("activate", (event) => {
  console.log("SW activating...");
});

// Intercept fetch requests and log URLs (scan example)
self.addEventListener("fetch", (event) => {
  console.log("SW fetch:", event.request.url);
  // fallback to network
  event.respondWith(fetch(event.request));
});
