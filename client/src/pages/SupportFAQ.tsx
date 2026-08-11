/**
 * WRTI Stitch Support & FAQ screen.
 *
 * Style contract: preserve the source HTML's cool mist background, green
 * semantic palette, Libre Caslon display type, Plus Jakarta Sans body type,
 * centered max-width composition, single-open accordion, and restrained
 * motion. Global Header and Bottom Navigation are owned by RootLayout.
 */

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@/design-system/icons';
import './SupportFAQ.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  iconTone: 'tickets' | 'trails' | 'conservation';
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'tickets-admission',
    title: 'Tickets & Admission',
    icon: 'ticket',
    iconTone: 'tickets',
    items: [
      {
        id: 'book-in-advance',
        question: 'Do I need to book in advance?',
        answer:
          'While walk-ins are welcome, we highly recommend booking online during peak seasons (Spring and Summer) to guarantee entry, as the park occasionally reaches maximum capacity to protect local wildlife.',
      },
      {
        id: 'senior-student-discounts',
        question: 'Are there discounts for seniors or students?',
        answer:
          'Yes! We offer a 15% discount for seniors (65+) and students with a valid ID. Please select the appropriate ticket type during checkout and present your ID at the gate.',
      },
    ],
  },
  {
    id: 'navigation-trails',
    title: 'Navigation & Trails',
    icon: 'map',
    iconTone: 'trails',
    items: [
      {
        id: 'gps-accuracy',
        question: "How accurate is the app's GPS?",
        answer:
          'Our app uses advanced geolocation that works offline in most park areas. However, deep within the ancient forest sectors, GPS signals may drift. We recommend downloading the offline map before your visit.',
      },
    ],
  },
  {
    id: 'conservation-rules',
    title: 'Conservation Rules',
    icon: 'leaf',
    iconTone: 'conservation',
    items: [
      {
        id: 'feed-animals',
        question: 'Can I feed the animals?',
        answer:
          'Strictly no. Feeding wild animals alters their natural foraging behavior and can be harmful to their health. Please observe wildlife quietly from designated trails.',
      },
    ],
  },
];

const normalize = (value: string) => value.trim().toLocaleLowerCase();

function matchesSearch(category: FAQCategory, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  return (
    normalize(category.title).includes(normalizedQuery) ||
    category.items.some(
      (item) =>
        normalize(item.question).includes(normalizedQuery) ||
        normalize(item.answer).includes(normalizedQuery),
    )
  );
}

export default function SupportFAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const visibleCategories = useMemo(() => {
    const normalizedQuery = normalize(searchQuery);

    return FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (!normalizedQuery) return true;
        return (
          normalize(category.title).includes(normalizedQuery) ||
          normalize(item.question).includes(normalizedQuery) ||
          normalize(item.answer).includes(normalizedQuery)
        );
      }),
    })).filter((category) => matchesSearch(category, searchQuery));
  }, [searchQuery]);

  const hasResults = visibleCategories.some((category) => category.items.length > 0);

  useEffect(() => {
    if (openItemId && !visibleCategories.some((category) => category.items.some((item) => item.id === openItemId))) {
      setOpenItemId(null);
    }
  }, [openItemId, visibleCategories]);

  const toggleItem = (itemId: string) => {
    setOpenItemId((currentId) => (currentId === itemId ? null : itemId));
  };

  return (
    <div className="support-faq-page">
      <main className="support-faq-main">
        <section className="support-faq-intro" aria-labelledby="support-faq-title">
          <h1 id="support-faq-title">How can we help?</h1>
          <p>Find answers to common questions or reach out to our park rangers.</p>
        </section>

        <div className="support-faq-search-wrap">
          <label className="sr-only" htmlFor="support-faq-search">
            Search frequently asked questions
          </label>
          <Icon name="search" size={24} className="support-faq-search-icon" aria-label="" />
          <input
            id="support-faq-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for tickets, map, rules..."
            className="support-faq-search"
          />
          <button type="button" className="support-faq-mic" aria-label="Voice search">
            <Icon name="mic" size={22} fill aria-label="" />
          </button>
        </div>

        <div className="support-faq-categories">
          {hasResults ? (
            visibleCategories.map((category) => (
              <section key={category.id} className="support-faq-category" aria-labelledby={`${category.id}-title`}>
                <div className="support-faq-category-heading">
                  <div className={`support-faq-category-icon support-faq-category-icon--${category.iconTone}`} aria-hidden="true">
                    <Icon name={category.icon} size={24} />
                  </div>
                  <h2 id={`${category.id}-title`}>{category.title}</h2>
                </div>

                <div className="support-faq-items">
                  {category.items.map((item) => {
                    const isOpen = openItemId === item.id;
                    const answerId = `${item.id}-answer`;

                    return (
                      <div key={item.id} className={`support-faq-item${isOpen ? ' is-open' : ''}`}>
                        <button
                          type="button"
                          className="support-faq-question"
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() => toggleItem(item.id)}
                        >
                          <span>{item.question}</span>
                          <span className="support-faq-chevron" aria-hidden="true">
                            <Icon name="chevronDown" size={24} />
                          </span>
                        </button>
                        <div id={answerId} className="support-faq-answer" role="region" aria-labelledby={undefined}>
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          ) : (
            <div className="support-faq-no-results" role="status">
              <Icon name="search" size={32} aria-hidden="true" />
              <h2>No answers found</h2>
              <p>Try a different search term or clear the search to browse all questions.</p>
              <button type="button" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>

        <section className="support-faq-contact" aria-labelledby="support-contact-title">
          <span className="support-faq-contact-decoration" aria-hidden="true" />
          <div className="support-faq-contact-content">
            <Icon name="support_agent" size={48} className="support-faq-contact-icon" aria-label="" />
            <h2 id="support-contact-title">Still need help?</h2>
            <p>Our park rangers and support team are available from 8 AM to 6 PM daily to assist you with any inquiries.</p>
            <button type="button" className="support-faq-contact-button">
              <Icon name="chat" size={20} aria-label="" />
              <span>Contact Support</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
