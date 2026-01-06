
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
       // event.waitUntil(syncPendingQR());
    }
});

// const syncPendingQR = async () => {
//     const pending = await getPendingQRCodes();

//     for (const qr of pending) {
//         if (!qr.completed) {
//             try {
//                 const res = await fetch("http://localhost:3001/api/scans", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(qr),
//                 });
//                 if (res.ok) {
//                     if (qr.id != undefined) {
//                         await markAsSent(qr.id);
//                     }
//                 }
//             } catch (err) {
//                 console.log("Offline, will retry later", err);
//             }
//         };
//     }
// };
