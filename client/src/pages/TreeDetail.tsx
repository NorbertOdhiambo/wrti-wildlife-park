/**
 * WRTI Tree Detail — source-specific presentation layer.
 *
 * Design fidelity reminder: reproduce the authoritative Stitch Tree Detail hierarchy
 * with the #006b2c / #f0fbfe palette, Libre Caslon Text display type, a translucent
 * task header, a tall media-first hero, and restrained tactile surfaces. Tree content
 * remains dynamic and flows only through the existing Tree repository/query boundary.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import { treeRepository, useTree, useTreeAudio, useTreeImages } from '@/features/trees';
import type { TreeImage } from '@/features/trees';
import './TreeDetail.css';

function useResolvedMediaUrl(path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setUrl(null);

    if (!path?.trim()) return () => { active = false; };

    void treeRepository.resolveStorageUrl(path)
      .then((resolvedUrl) => {
        if (active) setUrl(resolvedUrl);
      })
      .catch(() => {
        if (active) setUrl(null);
      });

    return () => { active = false; };
  }, [path]);

  return url;
}

function DetailLoadingState() {
  return (
    <main className="tree-detail tree-detail--loading" aria-busy="true" aria-label="Loading tree details">
      <div className="tree-detail__loading-hero" />
      <div className="tree-detail__loading-content">
        <span /><span /><span /><span />
      </div>
    </main>
  );
}

function DetailState({
  icon,
  title,
  copy,
  actionLabel,
  onAction,
}: {
  icon: string;
  title: string;
  copy: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <main className="tree-detail__state-page">
      <section className="tree-detail__state" role="status">
        <span className="tree-detail__state-icon" aria-hidden="true"><Icon name={icon} size={32} /></span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <button type="button" onClick={onAction}>{actionLabel}</button>
      </section>
    </main>
  );
}

function getPrimaryImage(images: TreeImage[] | undefined): TreeImage | null {
  return images?.find((image) => image.is_main || image.is_primary) ?? images?.[0] ?? null;
}

function formatAudioDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds < 1) return 'Audio available';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export default function TreeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const treeId = Number(id);
  const isValidTreeId = Number.isInteger(treeId) && treeId > 0;
  const treeQuery = useTree(treeId, { enabled: isValidTreeId });
  const imagesQuery = useTreeImages(treeId, { enabled: isValidTreeId });
  const audioQuery = useTreeAudio(treeId, { enabled: isValidTreeId });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const primaryImage = useMemo(() => getPrimaryImage(imagesQuery.data), [imagesQuery.data]);
  const heroImageUrl = useResolvedMediaUrl(primaryImage?.image_path);
  const audioPath = audioQuery.data?.audio_url || audioQuery.data?.audio_path || treeQuery.data?.audio_url;
  const audioUrl = useResolvedMediaUrl(audioPath);
  const tree = treeQuery.data;
  const audioDuration = duration || audioQuery.data?.duration_seconds || null;
  const progress = (audioDuration ?? 0) > 0 ? Math.min((currentTime / (audioDuration ?? 1)) * 100, 100) : 0;
  const hasCoordinates = tree?.lat !== null && tree?.lat !== undefined && tree?.lng !== null && tree?.lng !== undefined;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/discovery');
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const seekAudio = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !audioDuration) return;
    audio.currentTime = (value / 100) * audioDuration;
    setCurrentTime(audio.currentTime);
  };

  const openMap = (mode: 'view' | 'navigate') => {
    if (!tree || !hasCoordinates) return;
    navigate(`/map?treeId=${tree.id}&mode=${mode}`);
  };

  if (!isValidTreeId) {
    return <DetailState icon="error" title="Tree not found" copy="This tree record is not available in the park collection." actionLabel="Return to Discovery Journal" onAction={() => navigate('/discovery')} />;
  }

  if (treeQuery.isPending) return <DetailLoadingState />;

  if (treeQuery.isError) {
    return <DetailState icon="error" title="We couldn’t load this tree" copy="Please check your connection and try again." actionLabel="Try again" onAction={() => void treeQuery.refetch()} />;
  }

  if (!tree) {
    return <DetailState icon="tree" title="Tree not found" copy="This tree record is not available in the park collection." actionLabel="Return to Discovery Journal" onAction={() => navigate('/discovery')} />;
  }

  const taxonomyChip = tree.family ?? 'Park Tree';
  const narrative = tree.description ?? 'A detailed description has not been recorded for this tree yet.';
  const insight = tree.fun_fact ?? 'A nature insight has not been recorded for this tree yet.';

  return (
    <main className="tree-detail">
      <header className="tree-detail__task-header">
        <button type="button" aria-label="Go back" className="tree-detail__header-button" onClick={goBack}>
          <Icon name="back" size={24} />
        </button>
        <span className="tree-detail__park-name">WRTI Wildlife Park</span>
        <button
          type="button"
          aria-label={isFavorite ? `Remove ${tree.common_name} from favourites` : `Save ${tree.common_name} to favourites`}
          aria-pressed={isFavorite}
          className="tree-detail__header-button"
          onClick={() => setIsFavorite((current) => !current)}
        >
          <Icon name={isFavorite ? 'favorite' : 'favoriteOutline'} size={24} fill={isFavorite} />
        </button>
      </header>

      <section className="tree-detail__hero" aria-labelledby="tree-detail-title">
        {heroImageUrl ? <img className="tree-detail__hero-image" src={heroImageUrl} alt={primaryImage?.caption ?? `${tree.common_name} in WRTI Wildlife Park`} /> : <div className="tree-detail__hero-image tree-detail__hero-image--fallback" role="img" aria-label={`Image for ${tree.common_name} is unavailable`} />}
        <div className="tree-detail__hero-overlay" aria-hidden="true" />
        <div className="tree-detail__hero-copy">
          <div className="tree-detail__chips" aria-label="Tree classification">
            <span>{taxonomyChip}</span>
            <span>Live Collection</span>
          </div>
          <h1 id="tree-detail-title">{tree.common_name}</h1>
          <p>{tree.species ?? 'Scientific name not recorded'}</p>
        </div>
      </section>

      <div className="tree-detail__content">
        <section className="tree-detail__narrative-audio" aria-label={`About ${tree.common_name}`}>
          <article className="tree-detail__story">
            <h2>Story of the Giant</h2>
            <p>{narrative}</p>
          </article>

          <aside className="tree-detail__audio-card" aria-label="Audio Guide">
            <div className="tree-detail__audio-meta">
              <span>Audio Guide</span>
              <span>{formatAudioDuration(audioDuration)}</span>
            </div>
            {audioUrl ? (
              <>
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  preload="metadata"
                  onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
                <div className="tree-detail__audio-controls">
                  <button type="button" aria-label={isPlaying ? 'Pause audio guide' : 'Play audio guide'} className="tree-detail__play-button" onClick={() => void toggleAudio()}>
                    <Icon name={isPlaying ? 'pause' : 'play'} size={26} fill />
                  </button>
                  <div className="tree-detail__waveform-wrap">
                    <div className="tree-detail__waveform" aria-hidden="true">
                      {[28, 56, 100, 62, 31, 15].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                      <i />
                    </div>
                    <input
                      className="tree-detail__audio-seek"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={progress}
                      onChange={(event) => seekAudio(Number(event.target.value))}
                      aria-label="Audio guide progress"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="tree-detail__audio-unavailable">Audio is not available for this tree.</p>
            )}
          </aside>
        </section>

        <section className="tree-detail__knowledge-grid" aria-label="Tree information">
          <article className="tree-detail__botanical-card">
            <h2>Botanical Profile</h2>
            <dl>
              <div><dt>Family</dt><dd>{tree.family ?? 'Not recorded'}</dd></div>
              <div><dt>Average Height</dt><dd>Not recorded</dd></div>
              <div><dt>Lifespan</dt><dd>Not recorded</dd></div>
              <div><dt>Native Region</dt><dd>Not recorded</dd></div>
            </dl>
          </article>

          <div className="tree-detail__right-rail">
            <article className="tree-detail__conservation-card">
              <div className="tree-detail__conservation-main">
                <span className="tree-detail__warning-icon" aria-hidden="true"><Icon name="warning" size={23} fill /></span>
                <div><p>Conservation Status</p><strong>Not recorded</strong></div>
              </div>
              <span className="tree-detail__unavailable-link" aria-label="IUCN Data unavailable">IUCN Data unavailable</span>
            </article>

            <article className="tree-detail__insight-card">
              <span className="tree-detail__insight-decoration" aria-hidden="true"><Icon name="psychology" size={64} /></span>
              <h2><Icon name="lightbulb" size={18} />Nature Insight</h2>
              <p>{insight}</p>
            </article>
          </div>
        </section>

        <section className="tree-detail__actions" aria-label="Tree navigation actions">
          <button type="button" disabled={!hasCoordinates} onClick={() => openMap('view')}>
            <Icon name="map" size={22} />View on Map
          </button>
          <button type="button" disabled={!hasCoordinates} onClick={() => openMap('navigate')}>
            <Icon name="directions" size={22} />Navigate Here
          </button>
          {!hasCoordinates && <p>Location data is not available for this tree.</p>}
        </section>

        <section className="tree-detail__related" aria-labelledby="related-species-title">
          <h2 id="related-species-title">Related Species</h2>
          <div className="tree-detail__related-empty"><Icon name="leaf" size={22} /><p>Related species are not recorded for this tree yet.</p></div>
        </section>
      </div>
    </main>
  );
}
