import { useEffect } from 'react';

export function useOfflineSync(online: boolean) {

  useEffect(() => {
    if (online && 'serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(sw => {
        const registration = sw as ServiceWorkerRegistration & { sync: any };
        registration.sync.register('sync-qr').catch(console.error);
      });
    }
  }, [online]);
}
