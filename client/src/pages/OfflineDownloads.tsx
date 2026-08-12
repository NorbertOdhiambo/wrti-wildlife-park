/**
 * Offline Downloads — Stitch implementation.
 *
 * Style reminder: preserve the source's pale blue-green dotted texture, Libre
 * Caslon green headings, Plus Jakarta Sans labels, compact source cards,
 * exact package copy, and mobile-first responsive grids. The corrupted Stitch
 * screenshot is intentionally ignored; the HTML is authoritative.
 */

import { useMemo } from 'react';
import { Icon } from '@/design-system/icons';
import { useOfflineDownloads } from '@/hooks/useOfflineDownloads';
import type {
  OfflineDownloadPackage,
  OfflineDownloadStatus,
} from '@/services/offline-downloads';
import './OfflineDownloads.css';

function isActiveStatus(status: OfflineDownloadStatus) {
  return status === 'preparing' || status === 'queued' || status === 'downloading';
}

function statusLabel(pkg: OfflineDownloadPackage) {
  if (pkg.status === 'preparing') return 'Preparing...';
  if (pkg.status === 'downloading') return 'Downloading...';
  if (pkg.status === 'queued') return 'Queued';
  if (pkg.status === 'removing') return 'Removing...';
  return 'Downloaded';
}

function accentClass(accent: OfflineDownloadPackage['accent']) {
  return `offline-downloads-card__icon--${accent}`;
}

export default function OfflineDownloads() {
  const {
    packages,
    isOnline,
    message,
    clearMessage,
    startDownload,
    cancelDownload,
    removeDownload,
  } = useOfflineDownloads();

  const activePackages = useMemo(() => packages.filter((pkg) => isActiveStatus(pkg.status)), [packages]);
  const regionPackages = useMemo(
    () => packages.filter((pkg) => !isActiveStatus(pkg.status)),
    [packages]
  );

  const handleRemove = (pkg: OfflineDownloadPackage) => {
    if (window.confirm(`Remove ${pkg.name} from offline downloads?`)) {
      removeDownload(pkg.id);
    }
  };

  return (
    <div className="offline-downloads-page">
      <main className="offline-downloads-page__main">
        <section className="offline-downloads-intro" aria-labelledby="offline-downloads-title">
          <h1 id="offline-downloads-title">Manage Field Data</h1>
          <p>
            Download high-resolution maps and species databases for use in remote park areas without internet access.
          </p>
          <div className="offline-downloads-storage" aria-label="Available Storage">
            <div className="offline-downloads-storage__identity">
              <div className="offline-downloads-storage__icon" aria-hidden="true">
                <Icon name="sd_storage" size={24} fill />
              </div>
              <div>
                <div className="offline-downloads-label">Available Storage</div>
                <div className="offline-downloads-muted">14.2 GB Free of 64 GB</div>
              </div>
            </div>
            <div
              className="offline-downloads-storage__progress"
              role="progressbar"
              aria-label="Storage used"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={78}
            >
              <span />
            </div>
          </div>
        </section>

        {message && (
          <div className="offline-downloads-message" role="alert">
            <span>{message}</span>
            <button type="button" onClick={clearMessage} aria-label="Dismiss message">
              <Icon name="close" size={18} />
            </button>
          </div>
        )}

        <section className="offline-downloads-section" aria-labelledby="active-downloads-title">
          <h2 id="active-downloads-title">Active Downloads</h2>
          {activePackages.length > 0 && (
            <div className="offline-downloads-active-grid">
              {activePackages.map((pkg) => (
                <ActiveDownloadCard key={pkg.id} pkg={pkg} onCancel={() => cancelDownload(pkg.id)} />
              ))}
            </div>
          )}
        </section>

        <section className="offline-downloads-section offline-downloads-section--regions" aria-labelledby="regions-title">
          <h2 id="regions-title">Map Regions &amp; Data Packs</h2>
          <div className="offline-downloads-region-grid">
            {regionPackages.map((pkg) => (
              <RegionCard
                key={pkg.id}
                pkg={pkg}
                onDownload={() => startDownload(pkg.id)}
                onRemove={() => handleRemove(pkg)}
                onUpdate={() => startDownload(pkg.id)}
              />
            ))}
          </div>
        </section>

        {!isOnline && (
          <p className="offline-downloads-network-note" role="status">
            You are offline. Downloaded field data remains available on this device.
          </p>
        )}
      </main>
    </div>
  );
}

interface ActiveDownloadCardProps {
  pkg: OfflineDownloadPackage;
  onCancel: () => void;
}

function ActiveDownloadCard({ pkg, onCancel }: ActiveDownloadCardProps) {
  const isQueued = pkg.status === 'queued';
  const progressLabel = isQueued
    ? '0%'
    : `${pkg.progress}%${pkg.progressDetail ? ` (${pkg.progressDetail})` : ''}`;

  return (
    <article className="offline-downloads-active-card">
      <div className="offline-downloads-active-card__topline">
        <div className="offline-downloads-package-identity">
          <div className={`offline-downloads-card__icon ${accentClass(pkg.accent)}`} aria-hidden="true">
            <Icon name={pkg.icon} size={22} fill={pkg.presentation === 'active-species'} />
          </div>
          <div>
            <h3>{pkg.name}</h3>
            <p>{pkg.sizeLabel}</p>
          </div>
        </div>
        <button type="button" className="offline-downloads-icon-button" onClick={onCancel} aria-label={`Cancel ${pkg.name} download`}>
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="offline-downloads-progress-block">
        <div className="offline-downloads-progress-copy">
          <span className={isQueued ? 'offline-downloads-muted' : 'offline-downloads-progress-status'}>
            {statusLabel(pkg)}
          </span>
          <span className="offline-downloads-muted">{progressLabel}</span>
        </div>
        <div
          className="offline-downloads-progress-track"
          role="progressbar"
          aria-label={`${pkg.name} download progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pkg.progress}
        >
          <span style={{ width: `${pkg.progress}%` }} />
        </div>
      </div>
    </article>
  );
}

interface RegionCardProps {
  pkg: OfflineDownloadPackage;
  onDownload: () => void;
  onRemove: () => void;
  onUpdate: () => void;
}

function RegionCard({ pkg, onDownload, onRemove, onUpdate }: RegionCardProps) {
  const isDownloaded = pkg.status === 'downloaded';
  const isRemoving = pkg.status === 'removing';
  const isPreparing = pkg.status === 'preparing';

  return (
    <article className="offline-downloads-region-card">
      <div className={`offline-downloads-region-card__visual offline-downloads-region-card__visual--${pkg.presentation}`}>
        {pkg.imageUrl ? (
          <img src={pkg.imageUrl} alt={pkg.imageAlt ?? ''} />
        ) : (
          <Icon name={pkg.icon} size={48} fill={pkg.presentation === 'region-species'} />
        )}
        {pkg.presentation === 'region-image' && <span className="offline-downloads-region-card__scrim" aria-hidden="true" />}
        {isDownloaded && (
          <span className="offline-downloads-status-pill">
            <Icon name="check_circle" size={14} fill />
            Downloaded
          </span>
        )}
        <span className="offline-downloads-size-pill">{pkg.sizeLabel}</span>
      </div>
      <div className="offline-downloads-region-card__body">
        <div>
          <h3>{pkg.name}</h3>
          <p>{pkg.description}</p>
        </div>
        {isDownloaded ? (
          <div className="offline-downloads-region-card__actions">
            <button type="button" className="offline-downloads-button offline-downloads-button--secondary" onClick={onRemove} disabled={isRemoving}>
              <Icon name="delete" size={18} />
              {isRemoving ? 'Removing...' : 'Remove'}
            </button>
            {pkg.id === 'central-valley-base-map' && (
              <button type="button" className="offline-downloads-button offline-downloads-button--tertiary" onClick={onUpdate} disabled={isPreparing}>
                <Icon name="update" size={18} />
                {isPreparing ? 'Updating...' : 'Update'}
              </button>
            )}
          </div>
        ) : (
          <button type="button" className="offline-downloads-button offline-downloads-button--primary" onClick={onDownload} disabled={isPreparing}>
            <Icon name="download" size={18} />
            {isPreparing ? 'Preparing...' : 'Download'}
          </button>
        )}
      </div>
    </article>
  );
}

