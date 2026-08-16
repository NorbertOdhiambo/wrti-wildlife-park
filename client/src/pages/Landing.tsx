/**
 * WRTI Landing page.
 *
 * Fidelity contract: landing_page/screen-reference.html and screen.png are the
 * source of truth. RootLayout owns the matching floating header and bottom nav;
 * this page composes only the source-defined hero and reserve content.
 */

import { useNavigate } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import './Landing.css';

const LANDING_ASSETS = {
  hero: '/manus-storage/hero-redwoods_f65016a7.jpg',
  botanical: '/manus-storage/botanical-discovery_9ad52b88.jpg',
  storytelling: '/manus-storage/expert-storytelling_d1efc785.jpg',
} as const;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="landing-page__hero" aria-labelledby="landing-hero-title">
        <div
          className="landing-page__hero-media"
          aria-hidden="true"
          style={{ backgroundImage: `url(${LANDING_ASSETS.hero})` }}
        >
          <div className="landing-page__hero-overlay" />
        </div>

        <div className="landing-page__hero-card">
          <div className="landing-page__eyebrow landing-page__eyebrow--hero">
            <Icon name="leaf" size={16} fill />
            <span>Premium Conservation Tourism</span>
          </div>
          <h2 id="landing-hero-title">
            Your Journey into the <strong>Wild</strong> Begins Here.
          </h2>
          <p>
            Immerse yourself in a meticulously curated natural sanctuary. Experience the delicate balance of ecology through our advanced interactive pathways and expert-led expeditions.
          </p>
          <div className="landing-page__hero-actions">
            <button type="button" className="landing-page__button landing-page__button--primary" onClick={() => navigate('/tickets')}>
              Purchase Pass
              <Icon name="forward" size={20} />
            </button>
            <button type="button" className="landing-page__button landing-page__button--secondary" onClick={() => navigate('/about')}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="landing-page__reserve" aria-labelledby="discover-reserve-title">
        <div className="landing-page__reserve-inner">
          <header className="landing-page__section-title">
            <h3 id="discover-reserve-title">Discover the Reserve</h3>
            <p>Three pillars of our ecological stewardship program.</p>
          </header>

          <div className="landing-page__feature-grid">
            <article className="landing-page__feature landing-page__feature--botanical">
              <div
                className="landing-page__feature-image"
                aria-hidden="true"
                style={{ backgroundImage: `url(${LANDING_ASSETS.botanical})` }}
              >
                <div className="landing-page__feature-image-overlay" />
              </div>
              <div className="landing-page__botanical-copy">
                <div className="landing-page__chip-row">
                  <span>Flora</span>
                  <span>Archive</span>
                </div>
                <h4>Botanical Discovery</h4>
                <p>Access our living library. Scan over 10,000 documented species and learn about their role in the micro-ecosystem.</p>
              </div>
            </article>

            <button type="button" className="landing-page__feature landing-page__feature--map" onClick={() => navigate('/map')}>
              <span className="landing-page__map-glow" aria-hidden="true" />
              <span className="landing-page__map-icon" aria-hidden="true"><Icon name="map" size={24} fill /></span>
              <span className="landing-page__map-copy">
                <h4>Interactive Map</h4>
                <span>Navigate the reserve with precision. Real-time atmospheric data and dynamic trail routing at your fingertips.</span>
              </span>
              <span className="landing-page__map-preview" aria-hidden="true">
                <span className="landing-page__map-marker" />
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M0,70 Q30,90 60,60 T100,70" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </button>

            <article className="landing-page__feature landing-page__feature--storytelling">
              <div
                className="landing-page__story-image"
                role="img"
                aria-label="An experienced wilderness guide examining a leaf in a sunlit forest."
                style={{ backgroundImage: `url(${LANDING_ASSETS.storytelling})` }}
              />
              <div className="landing-page__story-copy">
                <div className="landing-page__eyebrow landing-page__eyebrow--audio">
                  <Icon name="headset" size={14} />
                  <span>Audio Guide</span>
                </div>
                <h4>Expert Storytelling</h4>
                <p>Don't just observe; understand. Unlock location-aware audio narratives narrated by leading botanists and conservationists as you move through the park's distinct biomes.</p>
                <button type="button" className="landing-page__text-button" onClick={() => navigate('/discovery')}>
                  Explore Narratives
                  <Icon name="arrow_right_alt" size={18} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
