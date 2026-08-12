/**
 * WRTI Exploration Progress page.
 *
 * Fidelity contract: the uploaded Stitch Exploration Progress HTML is the
 * authoritative visual specification. This file contains only the screen body;
 * RootLayout owns the persistent application Header and Bottom Navigation.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import {
  EXPLORATION_PROGRESS_DATA,
  type BookmarkedFlora,
  type ExplorationZone,
  type ProgressBarTone,
  type RecentFind,
} from '@/features/exploration-progress/explorationProgressData';
import './ExplorationProgress.css';

const PROGRESS_TONE_CLASS: Record<ProgressBarTone, string> = {
  primary: 'exploration-progress__bar--primary',
  secondary: 'exploration-progress__bar--secondary',
  'primary-container': 'exploration-progress__bar--primary-container',
  outline: 'exploration-progress__bar--outline',
};

const TIMELINE_TONE_CLASS: Record<RecentFind['tone'], string> = {
  primary: 'exploration-progress__timeline-marker--primary',
  outline: 'exploration-progress__timeline-marker--outline',
  tertiary: 'exploration-progress__timeline-marker--tertiary',
};

function ZoneCard({ zone }: { zone: ExplorationZone }) {
  return (
    <article
      className={`exploration-progress__zone-card${zone.locked ? ' exploration-progress__zone-card--locked' : ''}`}
    >
      <div className="exploration-progress__zone-card-header">
        <div className="exploration-progress__zone-copy">
          <div className="exploration-progress__zone-name-row">
            {zone.locked && (
              <span aria-hidden="true" className="exploration-progress__zone-lock">
                <Icon name="lock" size={16} />
              </span>
            )}
            <h4>{zone.name}</h4>
          </div>
          <span>{zone.description}</span>
        </div>
        <span className="exploration-progress__zone-value">{zone.progress}%</span>
      </div>
      <div
        className="exploration-progress__zone-track"
        role="progressbar"
        aria-label={`${zone.name} exploration progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={zone.progress}
      >
        <div
          className={`exploration-progress__zone-bar ${PROGRESS_TONE_CLASS[zone.tone]}`}
          style={{ width: `${zone.progress}%` }}
        />
      </div>
    </article>
  );
}

function BookmarkCard({ flora, bookmarked, onToggle }: {
  flora: BookmarkedFlora;
  bookmarked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <article className={`exploration-progress__flora-card${flora.id === 'coastal-redwood' ? ' exploration-progress__flora-card--third' : ''}`}>
      <div
        className="exploration-progress__flora-image"
        role="img"
        aria-label={flora.alt}
        style={{ backgroundImage: `url(${flora.image})` }}
      />
      <div className="exploration-progress__flora-overlay" aria-hidden="true" />
      <button
        type="button"
        className="exploration-progress__favorite-button"
        aria-label={`${bookmarked ? 'Remove' : 'Add'} ${flora.name} ${bookmarked ? 'from' : 'to'} bookmarks`}
        aria-pressed={bookmarked}
        onClick={() => onToggle(flora.id)}
      >
        <Icon name={bookmarked ? 'favorite' : 'favorite_outline'} size={24} fill={bookmarked} />
      </button>
      <div className="exploration-progress__flora-copy">
        <span>{flora.family}</span>
        <h4>{flora.name}</h4>
      </div>
    </article>
  );
}

function TimelineMarker({ item }: { item: RecentFind }) {
  if (item.image) {
    return (
      <div className="exploration-progress__timeline-marker exploration-progress__timeline-marker--image">
        <img src={item.image} alt={item.imageAlt ?? ''} />
      </div>
    );
  }

  return (
    <div className={`exploration-progress__timeline-marker ${TIMELINE_TONE_CLASS[item.tone]}`} aria-hidden="true">
      <Icon name={item.icon} size={20} />
    </div>
  );
}

function RecentFindCard({ item }: { item: RecentFind }) {
  return (
    <article className="exploration-progress__timeline-item">
      <TimelineMarker item={item} />
      <div className="exploration-progress__timeline-card">
        <span className="exploration-progress__timeline-time">{item.timestamp}</span>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export default function ExplorationProgress() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(EXPLORATION_PROGRESS_DATA.bookmarkedFlora.map((flora) => [flora.id, true]))
  );

  const toggleBookmark = (id: string) => {
    setBookmarks((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="exploration-progress-page">
      <div className="exploration-progress__canvas">
        <section className="exploration-progress__summary" aria-labelledby="exploration-progress-title">
          <div className="exploration-progress__summary-glow" aria-hidden="true" />
          <div className="exploration-progress__summary-content">
            <div className="exploration-progress__milestone" aria-hidden="true">
              <div className="exploration-progress__milestone-ring" />
              <Icon name="workspace_premium" size={48} fill />
            </div>
            <div className="exploration-progress__summary-copy">
              <div className="exploration-progress__level-badge">
                <Icon name="stars" size={14} />
                {EXPLORATION_PROGRESS_DATA.level}
              </div>
              <h1 id="exploration-progress-title">{EXPLORATION_PROGRESS_DATA.title}</h1>
              <p>{EXPLORATION_PROGRESS_DATA.summary}</p>
            </div>
            <div className="exploration-progress__total">
              <div
                className="exploration-progress__total-value"
                role="progressbar"
                aria-label="Total park charted"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={EXPLORATION_PROGRESS_DATA.parkCharted}
              >
                {EXPLORATION_PROGRESS_DATA.parkCharted}%
              </div>
              <div className="exploration-progress__total-label">Total Park Charted</div>
            </div>
          </div>
        </section>

        <div className="exploration-progress__bento">
          <div className="exploration-progress__left-column">
            <section aria-labelledby="zone-mastery-title">
              <div className="exploration-progress__section-heading">
                <h2 id="zone-mastery-title">
                  <span aria-hidden="true"><Icon name="landscape" size={24} /></span>
                  Zone Mastery
                </h2>
              </div>
              <div className="exploration-progress__zones">
                {EXPLORATION_PROGRESS_DATA.zones.map((zone) => (
                  <ZoneCard key={zone.name} zone={zone} />
                ))}
              </div>
            </section>

            <section aria-labelledby="bookmarked-flora-title">
              <div className="exploration-progress__section-heading">
                <h2 id="bookmarked-flora-title">
                  <span aria-hidden="true"><Icon name="bookmark_added" size={24} /></span>
                  Bookmarked Flora
                </h2>
                <button type="button" onClick={() => navigate('/discovery')}>
                  View All
                </button>
              </div>
              <div className="exploration-progress__flora-grid">
                {EXPLORATION_PROGRESS_DATA.bookmarkedFlora.map((flora) => (
                  <BookmarkCard
                    key={flora.id}
                    flora={flora}
                    bookmarked={Boolean(bookmarks[flora.id])}
                    onToggle={toggleBookmark}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="exploration-progress__timeline" aria-labelledby="recent-finds-title">
            <h2 id="recent-finds-title">
              <span aria-hidden="true"><Icon name="history" size={24} /></span>
              Recent Finds
            </h2>
            <div className="exploration-progress__timeline-list">
              {EXPLORATION_PROGRESS_DATA.recentFinds.map((item) => (
                <RecentFindCard key={item.id} item={item} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
