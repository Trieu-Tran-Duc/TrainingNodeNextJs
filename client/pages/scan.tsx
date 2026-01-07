import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { addQRCode, getPendingQRCodes, markAsSent, QRData } from "@/lib/indexedDB";
import { useNetworkStatus } from "@/lib/useNetworkStatus";
import { useOfflineSync } from "@/lib/useOfflineSync";

// const QrReader = dynamic(() => import("react-qr-reader").then(mod => mod.QrReader), {
//     ssr: false,
// });

const BarcodeScanner = dynamic(
    () => import("react-qr-barcode-scanner"),
    { ssr: false }
);

export default function ScanPage() {
    const [status, setStatus] = useState<string>("");
    const [scannedQRCodes, setScannedQRCodes] = useState<QRData[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [scanning, setScanning] = useState(false);

    const online = useNetworkStatus();
    useOfflineSync(online);

    const sendToServer = async (qr: QRData) => {

        try {
            const res = await fetch("/api/scans", {
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

            const code = await addQRCode(qr.code);
            setScannedQRCodes((prev) => [...prev, code]);

            setStatus(`Failed to send QR code: ${qr.code}, saved offline`);
        }
    };

    const handleScan = async (data: string | null) => {
        if (!data) return;
        setStatus(`Scanned: ${data}`);

        const qr = await addQRCode(data);
        setScannedQRCodes((prev) => [...prev, qr]);

        if (online) {
            await sendToServer(qr);
        } else {
            setStatus(`Offline, QR code saved locally`);
        }
    };

    const syncPending = async () => {
        if (!online) return;
        const pending = await getPendingQRCodes();

        for (const qr of pending) {
            if (!qr.completed) await sendToServer(qr);
        }
    };

    useEffect(() => {
        setIsClient(true);
        syncPending();
    }, [online]);

    const extractTextFromResult = (result: any): string | null => {
        if (!result) return null;

        if (typeof result === "string") return result;
        if (typeof result.text === "string") return result.text;
        if (typeof result.getText === "function") return result.getText();

        return null;
    };
    const handleStartScan = () => {
        setScanning((prev) => !prev);
    };
    if (!isClient) return null;

    return (
        <div style={{ padding: "1rem" }}>
            <button
                onClick={handleStartScan}
                style={{
                    padding: "6px 14px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: `1px solid ${scanning ? "#dc3545" : "#0d6efd"}`,
                    color: scanning ? "#dc3545" : "#0d6efd",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                }}
            >
                {scanning ? "SCAN COMPLETED" : "SCAN STARTED"}
            </button>

            <p>Status: {status}</p>
            <p>
                Network status:{" "}
                <strong style={{ color: online ? "green" : "red" }}>
                    {online ? "Online" : "Offline"}
                </strong>
            </p>
            {scanning && (
                <div style={{ margin: "1rem 0", width: "300px" }}>
                    <BarcodeScanner
                        onUpdate={(err, result) => {
                            if (err) {
                                return;
                            }
                            if (result) {
                                var qrText = extractTextFromResult(result)
                                if (qrText) {
                                    handleScan(qrText);
                                    setScanning(false)
                                }
                            }
                        }}
                        onError={(err) => console.error(err)}
                        videoConstraints={{ facingMode: "environment" }}
                        width={800}
                        height={800}
                    />
                </div>
            )}
            <h2>Scanned Barcode:</h2>
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
