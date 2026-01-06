import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { addQRCode, getPendingQRCodes, markAsSent, QRData } from "@/lib/indexedDB";

// Load QR scanner only on client
const QrReader = dynamic(
    () => import('react-qr-reader').then((mod) => mod.QrReader),
    { ssr: false }
);

export default function ScanPage() {
    const [status, setStatus] = useState<string>("");
    const [online, setOnline] = useState<boolean>(navigator.onLine);
    const [scannedQRCodes, setScannedQRCodes] = useState<QRData[]>([]);
    const [isClient, setIsClient] = useState(false);

    const sendToServer = async (qr: QRData) => {
        console.log("sento server")
        try {
            const res = await fetch("http://localhost:3001/api/scans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(qr),
            });
            if (res.ok) {

                if (qr.id != undefined) {
                    await markAsSent(qr.id);
                }

                setScannedQRCodes((prev) => {
                    return prev.map((item) =>
                        item.id === qr.id ? { ...item, completed: true } : item
                    );
                });

                setStatus(`Sent QR code: ${qr.code}`);
            }
        } catch (err) {
            console.log("Offline, will retry later", err);
            setStatus(`Failed to send QR code: ${qr.code}, saved offline`);
        }
    };

    const handleScan = async (data: string | null) => {
        if (!data) return;
        setStatus(`Scanned: ${data}`);
        const qr = await addQRCode(data);
        setScannedQRCodes((prev) => [...prev, qr]);

        if (navigator.onLine) {
            await sendToServer(qr);
        }
    };

    const syncPending = async () => {
        if (!navigator.onLine) return;
        const pending = await getPendingQRCodes();

        for (const qr of pending) {
            if (!qr.completed) await sendToServer(qr);
        }
    };

    useEffect(() => {
        setIsClient(true);

        // const handleOnline = async () => {
        //     setOnline(true);
        //     setStatus("Back online! Syncing pending QR codes...");
        //     await syncPending();
        // };

        // const handleOffline = () => {
        //     setOnline(false)
        //     setStatus("Back offline");
        // };

        const checkInternet = async () => {
            try {
                await fetch("http://localhost:3001/api/scans",
                    {
                        cache: "no-store",
                        method: "GET",
                    });
                setOnline(true);
                setStatus("Back online! Syncing pending QR codes...");
                await syncPending();
            } catch {
                setOnline(false);
                setStatus("Offline");
            }
        };

        window.addEventListener("online", checkInternet);
        window.addEventListener("offline", () => {
            setOnline(false);
            setStatus("Offline");
        });

        checkInternet();

        return () => {
            window.removeEventListener("online", checkInternet);
            window.removeEventListener("offline", checkInternet);
        };

    }, []);

    if (!isClient) return null;

    return (
        <div style={{ padding: "1rem" }}>
            <h1>QR Code Scan Page</h1>
            <p>Status: {status}</p>
            <p>
                Network status:{" "}
                <strong style={{ color: online ? "green" : "red" }}>
                    {online ? "Online" : "Offline"}
                </strong>
            </p>

            <div style={{ margin: "1rem 0", width: "300px" }}>
                <QrReader
                    onResult={(result) => {
                        if (result) handleScan(result.getText());
                    }}
                    constraints={{ facingMode: "environment" }}
                />
            </div>

            <h2>Scanned QR Codes:</h2>
            <ul>
                {scannedQRCodes.map((qr, idx) => (
                    <li key={idx}>
                        {qr.code} - {new Date(qr.timestamp).toLocaleTimeString()} -{" "}
                        <strong style={{ color: qr.completed ? "green" : "orange" }}>
                            {qr.completed ? "completed" : "Pending"}
                        </strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}
