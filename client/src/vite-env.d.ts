/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN?: string;
  readonly VITE_ENABLE_OFFLINE_MODE?: string;
  readonly VITE_ENABLE_RESEARCH_MODE?: string;
  readonly VITE_ENABLE_AUDIO_GUIDES?: string;
  readonly VITE_APP_ID?: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_LOGO?: string;
  readonly VITE_OAUTH_PORTAL_URL?: string;
  readonly VITE_FRONTEND_FORGE_API_URL?: string;
  readonly VITE_FRONTEND_FORGE_API_KEY?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ANALYTICS_WEBSITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
