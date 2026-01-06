self.addEventListener('install', event => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  self.clients.claim();
});

self.addEventListener('sync', event => {
  if (event.tag === 'sync-qr') {
    event.waitUntil(syncPendingQR());
  }
});
