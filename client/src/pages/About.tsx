/**
 * WRTI About Page
 *
 * Visual source: Stitch `about_wrti_wildlife_park/screen-reference.html`.
 * The Stitch screenshot is intentionally excluded because it is corrupted.
 * The existing application shell owns global navigation; this file contains
 * only the About page body and its page-local visual composition.
 */

import { Icon } from '@/design-system/icons';
import './About.css';

const ABOUT_ASSETS = {
  hero: '/manus-storage/hero-rainforest_19577ed4.jpg',
  heritage: '/manus-storage/heritage-archive_bc679199.jpg',
};

export default function About() {
  return (
    <div className="about-page">
      <main className="about-page__main">
        <section className="about-hero" aria-labelledby="about-mission-title">
          <div
            className="about-hero__image"
            role="img"
            aria-label="A breathtaking, wide-angle cinematic shot of a lush, ancient temperate rainforest at dawn, illuminated by soft rays of morning sunlight through a dense green canopy."
            style={{ backgroundImage: `url(${ABOUT_ASSETS.hero})` }}
          />
          <div className="about-hero__overlay" aria-hidden="true" />
          <div className="about-hero__panel">
            <span className="about-eyebrow">Our Mission</span>
            <h1 id="about-mission-title" className="about-display">
              Preserving the Wild, Together.
            </h1>
            <p className="about-body-lg">
              Fusing rigorous scientific research with accessible environmental stewardship to protect native biodiversity for generations to come.
            </p>
          </div>
        </section>

        <section className="about-pillars" aria-label="WRTI Wildlife Park pillars">
          <div className="about-bento">
            <article className="about-pillar about-pillar--technology">
              <div className="about-pillar__glow" aria-hidden="true" />
              <div className="about-pillar__content">
                <div className="about-icon-circle about-icon-circle--primary" aria-hidden="true">
                  <Icon name="satellite" size={24} fill />
                </div>
                <h2 className="about-headline about-headline--large">Conservation Technology</h2>
                <p className="about-body">
                  Utilizing state-of-the-art telemetry and AI-driven habitat modeling to non-invasively monitor and protect endangered species across the reserve.
                </p>
              </div>
            </article>

            <article className="about-pillar about-pillar--botanical">
              <div>
                <div className="about-icon-circle about-icon-circle--tertiary" aria-hidden="true">
                  <Icon name="psychiatry" size={24} />
                </div>
                <h2 className="about-headline about-headline--medium">Botanical Archives</h2>
              </div>
              <p className="about-body about-body--on-dark">
                Curating and propagating native flora critical to the local ecosystem balance.
              </p>
            </article>

            <article className="about-pillar about-pillar--heritage">
              <div className="about-heritage__copy">
                <span className="about-eyebrow about-eyebrow--primary">Heritage</span>
                <h2 className="about-headline about-headline--large">A Century of Stewardship</h2>
                <p className="about-body">
                  Established in 1924, WRTI Wildlife Park began as a small botanical sanctuary and has grown into a premier research and conservation facility. Our history is rooted in a deep respect for the land and its original inhabitants.
                </p>
                <button className="about-primary-button" type="button">
                  <span>Explore Timeline</span>
                  <Icon name="forward" size={18} aria-label="" />
                </button>
              </div>
              <div className="about-heritage__image-wrap">
                <img
                  className="about-heritage__image"
                  src={ABOUT_ASSETS.heritage}
                  alt="Historical archival photograph of early conservationists standing in front of a giant ancient redwood tree."
                />
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
