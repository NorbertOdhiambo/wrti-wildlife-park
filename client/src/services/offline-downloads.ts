/**
 * Offline Downloads service boundary.
 *
 * Style reminder for consumers: the service owns replaceable park-package
 * state; the page owns the Stitch composition, exact copy, and controls.
 */

export type OfflineDownloadStatus =
  | 'not-downloaded'
  | 'preparing'
  | 'queued'
  | 'downloading'
  | 'downloaded'
  | 'removing';

export type OfflineDownloadPresentation =
  | 'active-map'
  | 'active-species'
  | 'region-image'
  | 'region-icon'
  | 'region-species';

export interface OfflineDownloadPackage {
  id: string;
  name: string;
  sizeLabel: string;
  description: string;
  icon: string;
  presentation: OfflineDownloadPresentation;
  status: OfflineDownloadStatus;
  progress: number;
  progressDetail?: string;
  accent: 'primary' | 'secondary' | 'tertiary';
  imageUrl?: string;
  imageAlt?: string;
}

const CENTRAL_VALLEY_IMAGE = '/manus-storage/central-valley-base-map_e4dd514f.jpg';

const SOURCE_PACKAGES: OfflineDownloadPackage[] = [
  {
    id: 'northern-sector-topography',
    name: 'Northern Sector Topography',
    sizeLabel: '450 MB Map Data',
    description: '',
    icon: 'map',
    presentation: 'active-map',
    status: 'downloading',
    progress: 65,
    progressDetail: '292 MB',
    accent: 'primary',
  },
  {
    id: 'alpine-flora-fauna-db',
    name: 'Alpine Flora & Fauna DB',
    sizeLabel: '1.2 GB Offline Database',
    description: '',
    icon: 'pest_control',
    presentation: 'active-species',
    status: 'queued',
    progress: 0,
    accent: 'secondary',
  },
  {
    id: 'central-valley-base-map',
    name: 'Central Valley Base Map',
    sizeLabel: '850 MB',
    description: 'Includes terrain, trails, and primary facilities for the central core.',
    icon: 'map',
    presentation: 'region-image',
    status: 'downloaded',
    progress: 100,
    accent: 'primary',
    imageUrl: CENTRAL_VALLEY_IMAGE,
    imageAlt:
      'A dense, ancient forest bathed in soft, diffused light, seen from a top-down perspective. The rich greens and earthy tones convey a lush, untouched ecosystem perfect for an environmental science app. The style is highly detailed and photorealistic, evoking a sense of calm exploration.',
  },
  {
    id: 'eastern-peaks-elevation',
    name: 'Eastern Peaks Elevation',
    sizeLabel: '1.8 GB',
    description: 'High-resolution DEM and contour lines for technical climbing routes.',
    icon: 'landscape',
    presentation: 'region-icon',
    status: 'not-downloaded',
    progress: 0,
    accent: 'tertiary',
  },
  {
    id: 'mammal-track-guide',
    name: 'Mammal Track Guide',
    sizeLabel: '120 MB',
    description: 'Audio calls and visual track identification for regional mammals.',
    icon: 'cruelty_free',
    presentation: 'region-species',
    status: 'downloaded',
    progress: 100,
    accent: 'tertiary',
  },
];

export function getInitialOfflineDownloadPackages(): OfflineDownloadPackage[] {
  return SOURCE_PACKAGES.map((pkg) => ({ ...pkg }));
}

