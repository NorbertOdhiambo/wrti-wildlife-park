import { describe, expect, it } from 'vitest';
import {
  SUPABASE_CONFIGURATION_ERROR,
  SupabaseConfigurationError,
  isSupabaseConfigured,
  requireSupabaseConfiguration,
  resolveSupabaseConfiguration,
} from './api';

describe('Supabase configuration boundary', () => {
  it('returns no configuration when either public runtime value is missing', () => {
    expect(resolveSupabaseConfiguration({ VITE_SUPABASE_URL: 'https://example.supabase.co' })).toBeNull();
    expect(resolveSupabaseConfiguration({ VITE_SUPABASE_ANON_KEY: 'public-anon-key' })).toBeNull();
    expect(isSupabaseConfigured({})).toBe(false);
  });

  it('normalizes a complete public Supabase configuration without a fallback', () => {
    expect(resolveSupabaseConfiguration({
      VITE_SUPABASE_URL: ' https://example.supabase.co ',
      VITE_SUPABASE_ANON_KEY: ' public-anon-key ',
    })).toEqual({
      url: 'https://example.supabase.co',
      anonKey: 'public-anon-key',
    });
  });

  it('raises a clear configuration error only when a client is explicitly required', () => {
    expect(() => requireSupabaseConfiguration({})).toThrow(SupabaseConfigurationError);
    expect(() => requireSupabaseConfiguration({})).toThrow(SUPABASE_CONFIGURATION_ERROR);
  });
});
