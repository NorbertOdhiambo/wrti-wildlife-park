import { describe, expect, it } from 'vitest';
import {
  mapTreeRow,
  SupabaseTreeRepository,
  TREE_SCHEMA_STATUS,
  TreeStorageResolutionError,
} from './treeRepository';
import { treeQueryKeys } from './treeQueries';

describe('verified Tree data layer', () => {
  it('exposes the verified live-schema status', () => {
    expect(TREE_SCHEMA_STATUS).toBe('verified-live');
  });

  it('maps verified string coordinates to nullable numeric application coordinates', () => {
    const tree = mapTreeRow({
      id: 7,
      common_name: 'Sample Tree',
      species: 'Sample species',
      family: 'Sample family',
      description: 'Sample description',
      qr_code_url: null,
      qr_code_path: null,
      audio_url: null,
      lat: '19.076',
      lng: '72.8777',
      fun_fact: null,
      created_at: '2026-01-01T00:00:00.000Z',
      updated_at: '2026-01-01T00:00:00.000Z',
    });

    expect(tree.lat).toBe(19.076);
    expect(tree.lng).toBe(72.8777);
    expect(mapTreeRow({ ...tree, lat: null, lng: 'not-a-number' }).lat).toBeNull();
    expect(mapTreeRow({ ...tree, lat: null, lng: 'not-a-number' }).lng).toBeNull();
  });

  it('accepts absolute verified media URLs and rejects malformed bucket-relative paths', async () => {
    const repository = new SupabaseTreeRepository();
    await expect(repository.resolveStorageUrl('https://example.supabase.co/storage/v1/object/public/tree-images/example.jpg'))
      .resolves.toBe('https://example.supabase.co/storage/v1/object/public/tree-images/example.jpg');
    await expect(repository.resolveStorageUrl('missing-bucket-separator'))
      .rejects.toBeInstanceOf(TreeStorageResolutionError);
  });

  it('uses stable query-key contracts for tree list and detail resources', () => {
    expect(treeQueryKeys.list({ page: 2, itemsPerPage: 12 })).toEqual([
      'trees',
      'list',
      { page: 2, itemsPerPage: 12 },
    ]);
    expect(treeQueryKeys.detail(12)).toEqual(['trees', 12]);
    expect(treeQueryKeys.images(12)).toEqual(['trees', 12, 'images']);
    expect(treeQueryKeys.audio(12)).toEqual(['trees', 12, 'audio']);
  });
});
