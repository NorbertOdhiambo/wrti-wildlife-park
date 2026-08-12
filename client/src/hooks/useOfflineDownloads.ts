/**
 * Offline Downloads controller.
 *
 * Style reminder: this hook drives source-defined download states while the
 * page remains responsible for the exact Stitch layout and presentation.
 */

import { useCallback, useEffect, useState } from 'react';
import { useOfflineStore } from '@/stores/offline.store';
import type { OfflineDownloadPackage } from '@/services/offline-downloads';

const DOWNLOAD_TICK_MS = 1000;
const DOWNLOAD_STEP = 1;

export function useOfflineDownloads() {
  const packages = useOfflineStore((state) => state.downloadPackages);
  const setPackages = useOfflineStore((state) => state.setDownloadPackages);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const setIsOnline = useOfflineStore((state) => state.setIsOnline);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setIsOnline]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPackages(
        useOfflineStore.getState().downloadPackages.map((pkg) => {
          if (pkg.status === 'preparing') {
            return { ...pkg, status: 'downloading', progress: Math.max(pkg.progress, 5) };
          }

          if (pkg.status === 'downloading') {
            const progress = Math.min(100, pkg.progress + DOWNLOAD_STEP);
            return {
              ...pkg,
              progress,
              status: progress === 100 ? 'downloaded' : 'downloading',
              progressDetail: progress === 100 ? undefined : pkg.progressDetail,
            };
          }

          if (pkg.status === 'removing') {
            return { ...pkg, status: 'not-downloaded', progress: 0, progressDetail: undefined };
          }

          return pkg;
        })
      );
    }, DOWNLOAD_TICK_MS);

    return () => window.clearInterval(interval);
  }, [setPackages]);

  const updatePackage = useCallback(
    (id: string, next: Partial<OfflineDownloadPackage>) => {
      setPackages(
        useOfflineStore.getState().downloadPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, ...next } : pkg
        )
      );
    },
    [setPackages]
  );

  const startDownload = useCallback(
    (id: string) => {
      if (!isOnline) {
        setMessage('An internet connection is required to download field data.');
        return false;
      }

      setMessage(null);
      updatePackage(id, { status: 'preparing', progress: 0, progressDetail: undefined });
      return true;
    },
    [isOnline, updatePackage]
  );

  const cancelDownload = useCallback(
    (id: string) => {
      setMessage(null);
      updatePackage(id, { status: 'not-downloaded', progress: 0, progressDetail: undefined });
    },
    [updatePackage]
  );

  const removeDownload = useCallback(
    (id: string) => {
      setMessage(null);
      updatePackage(id, { status: 'removing' });
    },
    [updatePackage]
  );

  return {
    packages,
    isOnline,
    message,
    clearMessage: () => setMessage(null),
    startDownload,
    cancelDownload,
    removeDownload,
  };
}
