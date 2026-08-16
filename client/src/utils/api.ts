/**
 * Centralized Supabase client boundary.
 *
 * This module intentionally creates no client during import. The WRTI app must
 * remain usable while the externally managed Supabase environment is pending.
 * No live schema, database, RLS, or storage behavior is claimed or assumed here.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_CONFIGURATION_ERROR =
  'Supabase configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';

export interface SupabaseRuntimeEnv {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

export interface SupabaseConfiguration {
  url: string;
  anonKey: string;
}

function getRuntimeEnv(): SupabaseRuntimeEnv {
  return import.meta.env as unknown as SupabaseRuntimeEnv;
}

export class SupabaseConfigurationError extends Error {
  constructor(message = SUPABASE_CONFIGURATION_ERROR) {
    super(message);
    this.name = 'SupabaseConfigurationError';
  }
}

export function resolveSupabaseConfiguration(
  env: SupabaseRuntimeEnv = getRuntimeEnv()
): SupabaseConfiguration | null {
  const url = env.VITE_SUPABASE_URL?.trim();
  const anonKey = env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured(env: SupabaseRuntimeEnv = getRuntimeEnv()): boolean {
  return resolveSupabaseConfiguration(env) !== null;
}

export function requireSupabaseConfiguration(
  env: SupabaseRuntimeEnv = getRuntimeEnv()
): SupabaseConfiguration {
  const configuration = resolveSupabaseConfiguration(env);
  if (!configuration) {
    throw new SupabaseConfigurationError();
  }
  return configuration;
}

export function createSupabaseClient(
  configuration: SupabaseConfiguration
): SupabaseClient {
  return createClient(configuration.url, configuration.anonKey);
}

let supabaseClient: SupabaseClient | null = null;

/**
 * Creates the singleton only at the point a schema-verified data operation needs it.
 * Unrelated visitor routes can therefore render with no Supabase environment present.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient(requireSupabaseConfiguration());
  }
  return supabaseClient;
}
