import { openDB } from "idb";

export type QRData = {
    id: number;
    code: string;
    timestamp: number;
    completed: boolean;
};

const DB_NAME = "qr-scan-db";
const STORE_NAME = "qr_codes";
const DB_VERSION = 4
const INDEX_NAME = "completed"
const KEY_PATH = "completed"

export async function getDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            let store;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            } else {
                store = transaction.objectStore(STORE_NAME);
            }

            if (!store.indexNames.contains(INDEX_NAME)) {
                store.createIndex(INDEX_NAME, KEY_PATH, { unique: false });
            }
        },
    });
}

export async function addQRCode(code: string) {
    const db = await getDB();
    const qr = {
        code,
        timestamp: Date.now(),
        completed: false,
    };

    const id = await db.add(STORE_NAME, qr);
    return { ...qr, id: id as number};
}

export async function getPendingQRCodes(): Promise<QRData[]> {
    const db = await getDB();
    const all = await db.getAll(STORE_NAME);

    return all.filter((x) => !x.completed);
}

export async function markAsSent(id: number) {
    const db = await getDB();
    const item = await db.get(STORE_NAME, id);
    if (item) {
        item.completed = true;
        await db.put(STORE_NAME, item);
    }
}