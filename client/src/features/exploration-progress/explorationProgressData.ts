/**
 * Exploration Progress screen data.
 *
 * The Stitch HTML is the ground-truth source for this snapshot. Keep this
 * replaceable data boundary separate from the page composition so it can later
 * be backed by the approved discovery-tracking data model without redesigning
 * the screen.
 */

export type ProgressBarTone = 'primary' | 'secondary' | 'primary-container' | 'outline';

export interface ExplorationZone {
  name: string;
  description: string;
  progress: number;
  tone: ProgressBarTone;
  locked?: boolean;
}

export interface BookmarkedFlora {
  id: string;
  family: string;
  name: string;
  image: string;
  alt: string;
}

export interface RecentFind {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  icon: string;
  tone: 'primary' | 'outline' | 'tertiary';
  image?: string;
  imageAlt?: string;
}

export interface ExplorationProgressSnapshot {
  level: string;
  title: string;
  summary: string;
  parkCharted: number;
  zones: ExplorationZone[];
  bookmarkedFlora: BookmarkedFlora[];
  recentFinds: RecentFind[];
}

export const EXPLORATION_PROGRESS_DATA: ExplorationProgressSnapshot = {
  level: 'Level 4 Botanist',
  title: 'Global Exploration',
  summary:
    'You have cataloged 142 unique species across 6 ecological zones. Keep exploring to unlock the Master Conservator badge.',
  parkCharted: 42,
  zones: [
    {
      name: 'Redwood Grove',
      description: 'Dense Canopy Sector',
      progress: 75,
      tone: 'primary',
    },
    {
      name: 'Alpine Meadows',
      description: 'High Elevation',
      progress: 40,
      tone: 'secondary',
    },
    {
      name: 'Coastal Tidepools',
      description: 'Marine Border',
      progress: 90,
      tone: 'primary-container',
    },
    {
      name: 'Desert Conservatory',
      description: 'Requires Level 5',
      progress: 0,
      tone: 'outline',
      locked: true,
    },
  ],
  bookmarkedFlora: [
    {
      id: 'sword-fern',
      family: 'Polypodiopsida',
      name: 'Sword Fern',
      image: '/manus-storage/sword-fern_8b82bc71.jpg',
      alt:
        'A close-up photograph of a vibrant green fern unfurling its fronds in a softly lit, misty forest environment.',
    },
    {
      id: 'ghost-orchid',
      family: 'Orchidaceae',
      name: 'Ghost Orchid',
      image: '/manus-storage/ghost-orchid_66ba1bec.jpg',
      alt:
        'A high-resolution macro photograph of a pale orchid blooming against a dark green botanical background.',
    },
    {
      id: 'coastal-redwood',
      family: 'Cupressaceae',
      name: 'Coastal Redwood',
      image: '/manus-storage/coastal-redwood_74e6a13e.jpg',
      alt:
        'A view looking up the trunk of a massive California Redwood tree into a sun-dappled canopy.',
    },
  ],
  recentFinds: [
    {
      id: 'douglas-fir-sapling',
      timestamp: 'Today, 10:42 AM',
      title: 'Douglas Fir Sapling',
      description: 'Scanned near the northern ridge trail. Showing healthy spring growth.',
      icon: 'eco',
      tone: 'primary',
    },
    {
      id: 'amanita-muscaria',
      timestamp: 'Yesterday, 3:15 PM',
      title: 'Amanita muscaria',
      description: 'First fungal log of the season in the damp underbrush of Sector 4.',
      icon: 'eco',
      tone: 'outline',
      image: '/manus-storage/amanita-muscaria_89a34e44.jpg',
      imageAlt: 'A macro photograph of a red fly agaric mushroom with white spots in green moss.',
    },
    {
      id: 'alpine-meadows',
      timestamp: 'Oct 24, 11:00 AM',
      title: 'Unlocked: Alpine Meadows',
      description: 'Reached elevation 2,500m. New flora varieties now available for scanning.',
      icon: 'location_on',
      tone: 'tertiary',
    },
    {
      id: 'western-hemlock',
      timestamp: 'Oct 22, 09:30 AM',
      title: 'Western Hemlock',
      description: 'Added to collection. Noted significant moss coverage on lower trunk.',
      icon: 'photo_camera',
      tone: 'outline',
    },
  ],
};
