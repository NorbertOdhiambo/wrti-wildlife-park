import { describe, expect, it } from 'vitest';
import {
  DeferredTreeRepository,
  TREE_SCHEMA_STATUS,
  TreeSchemaUnavailableError,
} from './treeRepository';
import { treeQueryKeys } from './treeQueries';

describe('Tree data-layer schema boundary', () => {
  it('makes the unverified-schema status explicit', () => {
    expect(TREE_SCHEMA_STATUS).toBe('pending-live-verification');
  });

  it('does not fabricate Tree records before schema verification', async () => {
    const repository = new DeferredTreeRepository();
    await expect(repository.getTrees()).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
    await expect(repository.getTree(1)).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
    await expect(repository.getTreeImages(1)).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
    await expect(repository.getTreeAudio(1)).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
    await expect(repository.getPrimaryTreeImage(1)).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
    await expect(repository.resolveStorageUrl('media/tree.jpg')).rejects.toBeInstanceOf(TreeSchemaUnavailableError);
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
