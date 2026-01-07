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
        console.log('[SW] sync-qr');
        event.waitUntil(syncPendingQR());
    }
});

const DB_NAME = "qr-scan-db";
const STORE_NAME = "qr_codes";
const DB_VERSION = 4
const INDEX_NAME = "completed"
const KEY_PATH = "completed"

const syncPendingQR = async () => {
    const db = await openDB();

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const allRecords = await store.getAll();
    const pending = allRecords.filter(item => !item.completed);

    console.log("[SW] Pending QR:", pending);

    for (const qr of pending) {
        try {
            const res = await fetch("/api/scans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(qr),
            });

            if (res.ok) {
                qr.completed = true;
                store.put(qr);
            }
        } catch (err) {
            console.log("[SW] Still offline, retry later", err);
        }
    }

    await tx.done;
};

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });

                store.createIndex("completed", "completed", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};
