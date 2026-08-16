/**
 * Schema-independent Tree repository contracts.
 *
 * No Supabase query is implemented in this file because the actual external
 * schema has not been inspected. Keeping operations behind this boundary avoids
 * invented table names, fields, joins, storage buckets, or URL behavior.
 */

import type {
  PaginatedTreeResult,
  Tree,
  TreeAudio,
  TreeImage,
  TreeListInput,
} from '../types/tree';

export const TREE_SCHEMA_STATUS = 'pending-live-verification' as const;

export class TreeSchemaUnavailableError extends Error {
  constructor(operation: string) {
    super(
      `Tree ${operation} is pending live Supabase schema verification. Configure the environment, inspect the external schema, then implement this repository operation.`
    );
    this.name = 'TreeSchemaUnavailableError';
  }
}

export interface TreeRepository {
  getTrees(input?: TreeListInput): Promise<PaginatedTreeResult>;
  getTree(treeId: number): Promise<Tree | null>;
  getTreeImages(treeId: number): Promise<TreeImage[]>;
  getTreeAudio(treeId: number): Promise<TreeAudio | null>;
  getPrimaryTreeImage(treeId: number): Promise<TreeImage | null>;
  resolveStorageUrl(path: string): Promise<string>;
}

/**
 * Temporary implementation that makes the deferred live-schema boundary
 * explicit instead of silently returning fabricated data.
 */
export class DeferredTreeRepository implements TreeRepository {
  async getTrees(_input?: TreeListInput): Promise<PaginatedTreeResult> {
    throw new TreeSchemaUnavailableError('listing');
  }

  async getTree(_treeId: number): Promise<Tree | null> {
    throw new TreeSchemaUnavailableError('lookup');
  }

  async getTreeImages(_treeId: number): Promise<TreeImage[]> {
    throw new TreeSchemaUnavailableError('image lookup');
  }

  async getTreeAudio(_treeId: number): Promise<TreeAudio | null> {
    throw new TreeSchemaUnavailableError('audio lookup');
  }

  async getPrimaryTreeImage(_treeId: number): Promise<TreeImage | null> {
    throw new TreeSchemaUnavailableError('primary-image lookup');
  }

  async resolveStorageUrl(_path: string): Promise<string> {
    throw new TreeSchemaUnavailableError('storage URL resolution');
  }
}

export const treeRepository: TreeRepository = new DeferredTreeRepository();
