/**
 * Settings & Preferences — Stitch implementation.
 *
 * Style reminder: preserve the source's pale blue-green canvas, Libre Caslon
 * page heading, Plus Jakarta Sans controls, compact green section labels,
 * white rounded cards, and mobile-first one-column Appearance layout.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsStore } from '@/stores/settings.store';
import './SettingsPreferences.css';

const TEXT_SIZE_LABELS = {
  small: 'Small',
  normal: 'Medium (Default)',
  large: 'Large',
} as const;

const TEXT_SIZE_ORDER = ['small', 'normal', 'large'] as const;

type TextSize = (typeof TEXT_SIZE_ORDER)[number];

function nextTextSize(size: TextSize): TextSize {
  const index = TEXT_SIZE_ORDER.indexOf(size);
  return TEXT_SIZE_ORDER[(index + 1) % TEXT_SIZE_ORDER.length] ?? 'normal';
}

interface SettingsSwitchProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

function SettingsSwitch({ checked, label, onChange }: SettingsSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`settings-switch${checked ? ' settings-switch--checked' : ''}`}
      onClick={onChange}
    >
      <span className="settings-switch__thumb" aria-hidden="true" />
    </button>
  );
}

interface SettingsRowProps {
  icon: string;
  label: string;
  description?: string;
  onClick?: () => void;
  control?: React.ReactNode;
}

function SettingsRow({ icon, label, description, onClick, control }: SettingsRowProps) {
  const content = (
    <>
      <span className="settings-row__leading" aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <span className="settings-row__copy">
        <span className="settings-row__label">{label}</span>
        {description && <span className="settings-row__description">{description}</span>}
      </span>
      {control ?? <Icon name="chevronRight" size={24} className="settings-row__chevron" />}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className="settings-row settings-row--interactive" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className="settings-row">{content}</div>;
}

export default function SettingsPreferences() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const {
    preferences,
    setTheme: setStoredTheme,
    setHighContrast,
    setFontSize,
    setColorBlindMode,
    setOfflineDownloads,
    setNotificationsEnabled,
  } = useSettingsStore();

  const activeTheme = useMemo(() => {
    if (preferences.accessibility.highContrast) return 'outdoor';
    if (theme === 'dark' || preferences.theme === 'dark') return 'dark';
    return 'light';
  }, [preferences.accessibility.highContrast, preferences.theme, theme]);

  const chooseTheme = (nextTheme: 'light' | 'dark' | 'outdoor') => {
    if (nextTheme === 'outdoor') {
      setTheme('light');
      setStoredTheme('light');
      setHighContrast(true);
      return;
    }

    setTheme(nextTheme);
    setStoredTheme(nextTheme);
    setHighContrast(false);
  };

  const textSize = preferences.accessibility.fontSize as TextSize;

  return (
    <div className="settings-page">
      <main className="settings-page__main">
        <section className="settings-page__intro" aria-labelledby="settings-title">
          <h2 id="settings-title">Settings</h2>
          <p>Manage your app preferences and profile.</p>
        </section>

        <section className="settings-profile" aria-label="Profile">
          <div className="settings-profile__identity">
            <div className="settings-profile__avatar" aria-hidden="true">
              <Icon name="user" size={32} />
            </div>
            <div>
              <h3>Alex Explorer</h3>
              <p>alex@example.com</p>
            </div>
          </div>
          <button type="button" className="settings-profile__edit" onClick={() => navigate('/profile')}>
            Edit
          </button>
        </section>

        <section className="settings-section" aria-labelledby="appearance-title">
          <h3 id="appearance-title" className="settings-section__title">Appearance</h3>
          <div className="settings-theme-grid">
            <ThemeCard
              icon="light_mode"
              label="Light"
              selected={activeTheme === 'light'}
              onClick={() => chooseTheme('light')}
            />
            <ThemeCard
              icon="dark_mode"
              label="Dark"
              selected={activeTheme === 'dark'}
              onClick={() => chooseTheme('dark')}
            />
            <ThemeCard
              icon="contrast"
              label="Outdoor Vis"
              selected={activeTheme === 'outdoor'}
              onClick={() => chooseTheme('outdoor')}
            />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="accessibility-title">
          <h3 id="accessibility-title" className="settings-section__title">Accessibility</h3>
          <div className="settings-list">
            <SettingsRow
              icon="format_size"
              label="Text Size"
              description={TEXT_SIZE_LABELS[textSize]}
              onClick={() => setFontSize(nextTextSize(textSize))}
            />
            <SettingsRow
              icon="palette"
              label="Color Blind Mode"
              description="Adjust map colors"
              control={
                <SettingsSwitch
                  checked={preferences.accessibility.colorBlindMode}
                  label="Color Blind Mode"
                  onChange={() => setColorBlindMode(!preferences.accessibility.colorBlindMode)}
                />
              }
            />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="general-title">
          <h3 id="general-title" className="settings-section__title">General</h3>
          <div className="settings-list">
            <SettingsRow
              icon="cloud_download"
              label="Offline Downloads"
              description="Map areas and species data"
              control={
                <SettingsSwitch
                  checked={preferences.offlineDownloads}
                  label="Offline Downloads"
                  onChange={() => setOfflineDownloads(!preferences.offlineDownloads)}
                />
              }
            />
            <SettingsRow icon="layers" label="Map Themes" onClick={() => navigate('/map')} />
            <SettingsRow
              icon="notifications"
              label="Notifications"
              control={
                <SettingsSwitch
                  checked={preferences.notifications.enabled}
                  label="Notifications"
                  onChange={() => setNotificationsEnabled(!preferences.notifications.enabled)}
                />
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}

interface ThemeCardProps {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function ThemeCard({ icon, label, selected, onClick }: ThemeCardProps) {
  return (
    <button
      type="button"
      className={`settings-theme-card${selected ? ' settings-theme-card--selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <Icon name={icon} size={32} fill={selected} />
      <span>{label}</span>
      {selected && (
        <span className="settings-theme-card__check" aria-label="Selected">
          <Icon name="check" size={14} fill />
        </span>
      )}
    </button>
  );
}
