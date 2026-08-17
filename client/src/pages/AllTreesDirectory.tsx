/**
 * WRTI All Trees Directory — Stitch-faithful live catalogue.
 *
 * Design fidelity reminder: retain the #006b2c / #f0fbfe botanical interface,
 * 48px pill search, horizontally flowing filter chips, source-defined image-led
 * cards, and 1/2/3/4 responsive grid. All tree content flows through the
 * existing Tree repository and TanStack Query boundary only.
 */

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import {
  treeRepository,
  useTreePrimaryImages,
  useTreeTaxonomyFacets,
  useTrees,
} from '@/features/trees';
import type { Tree, TreeImage } from '@/features/trees';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import './AllTreesDirectory.css';

const PAGE_SIZE = 12;
const FILTER_ALL_VALUE = '__all__';
type ViewMode = 'grid' | 'list';

function formatTreeValue(value: string | null, fallback: string): string {
  return value?.trim() || fallback;
}

function useResolvedDirectoryImages(images: Record<number, TreeImage> | undefined) {
  const [urls, setUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    let active = true;
    const imageEntries = Object.entries(images ?? {});
    setUrls({});
    if (!imageEntries.length) return () => { active = false; };

    void Promise.all(imageEntries.map(async ([treeId, image]) => {
      try {
        return [Number(treeId), await treeRepository.resolveStorageUrl(image.image_path)] as const;
      } catch {
        return [Number(treeId), null] as const;
      }
    })).then((resolvedEntries) => {
      if (!active) return;
      setUrls(Object.fromEntries(resolvedEntries.filter((entry): entry is readonly [number, string] => entry[1] !== null)));
    });

    return () => { active = false; };
  }, [images]);

  return urls;
}

function DirectoryCard({
  tree,
  image,
  imageUrl,
  imageFailed,
  onImageError,
  viewMode,
}: {
  tree: Tree;
  image: TreeImage | undefined;
  imageUrl: string | undefined;
  imageFailed: boolean;
  onImageError: (treeId: number) => void;
  viewMode: ViewMode;
}) {
  const commonName = formatTreeValue(tree.common_name, 'Unnamed tree');
  const species = formatTreeValue(tree.species, 'Scientific name not recorded');
  const family = formatTreeValue(tree.family, 'Family not recorded');
  const showImage = Boolean(imageUrl && !imageFailed);

  return (
    <article className={`all-trees-directory__card all-trees-directory__card--${viewMode}`} role={viewMode === 'list' ? 'listitem' : undefined}>
      <Link className="all-trees-directory__card-link" to={`/trees/${tree.id}`} aria-label={`View details for ${commonName}`}>
        <div className="all-trees-directory__card-image-wrap">
          {showImage ? (
            <img
              className="all-trees-directory__card-image"
              src={imageUrl}
              alt={image?.caption?.trim() || `${commonName} in WRTI Wildlife Park`}
              onError={() => onImageError(tree.id)}
            />
          ) : (
            <div className="all-trees-directory__image-fallback" role="img" aria-label={`Image for ${commonName} is unavailable`}>
              <span aria-hidden="true"><Icon name="tree" size={34} /></span>
              <span>Image unavailable</span>
            </div>
          )}
          <span className="all-trees-directory__bookmark-mark" aria-hidden="true"><Icon name="bookmarkOutline" size={20} /></span>
        </div>
        <div className="all-trees-directory__card-copy">
          <h2>{commonName}</h2>
          <p className="all-trees-directory__species">{species}</p>
          <span className="all-trees-directory__family">{family}</span>
        </div>
      </Link>
    </article>
  );
}

function TreeCardSkeleton({ viewMode }: { viewMode: ViewMode }) {
  return (
    <article className={`all-trees-directory__card all-trees-directory__card--${viewMode} all-trees-directory__card--skeleton`} aria-hidden="true">
      <div className="all-trees-directory__skeleton-image" />
      <div className="all-trees-directory__skeleton-copy"><span /><span /><span /></div>
    </article>
  );
}

function TaxonomyFilter({
  label,
  value,
  values,
  onValueChange,
}: {
  label: 'Species' | 'Family';
  value: string | undefined;
  values: string[];
  onValueChange: (value: string | undefined) => void;
}) {
  return (
    <Select value={value ?? FILTER_ALL_VALUE} onValueChange={(nextValue) => onValueChange(nextValue === FILTER_ALL_VALUE ? undefined : nextValue)}>
      <SelectTrigger className="all-trees-directory__filter-select" aria-label={`Filter by ${label.toLocaleLowerCase()}`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="all-trees-directory__filter-options">
        <SelectItem value={FILTER_ALL_VALUE}>All {label.toLocaleLowerCase()}</SelectItem>
        {values.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export default function AllTreesDirectory() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState<string | undefined>();
  const [family, setFamily] = useState<string | undefined>();
  const [species, setSpecies] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearch(searchInput.trim() || undefined), 280);
    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const listInput = useMemo(() => ({ page, itemsPerPage: PAGE_SIZE, search, family, species }), [page, search, family, species]);
  const treesQuery = useTrees(listInput, { enabled: true });
  const facetsQuery = useTreeTaxonomyFacets({ enabled: true });
  const trees = treesQuery.data?.items ?? [];
  const treeIds = useMemo(() => trees.map((tree) => tree.id), [trees]);
  const treeIdsKey = treeIds.join('|');
  const imagesQuery = useTreePrimaryImages(treeIds, { enabled: treeIds.length > 0 });
  const imageUrls = useResolvedDirectoryImages(imagesQuery.data);
  const pagination = treesQuery.data?.pagination;
  const hasActiveCriteria = Boolean(search || family || species);

  useEffect(() => {
    if (pagination && page > pagination.totalPages) setPage(pagination.totalPages);
  }, [page, pagination]);

  useEffect(() => {
    setBrokenImageIds(new Set());
  }, [treeIdsKey]);

  const updateFamily = (nextFamily: string | undefined) => {
    setPage(1);
    setFamily(nextFamily);
  };
  const updateSpecies = (nextSpecies: string | undefined) => {
    setPage(1);
    setSpecies(nextSpecies);
  };
  const clearCriteria = () => {
    setPage(1);
    setSearchInput('');
    setSearch(undefined);
    setFamily(undefined);
    setSpecies(undefined);
  };
  const handleImageError = (treeId: number) => setBrokenImageIds((current) => new Set(current).add(treeId));
  const updateViewMode = (nextViewMode: string) => {
    if (nextViewMode === 'grid' || nextViewMode === 'list') setViewMode(nextViewMode);
  };

  const resultLabel = pagination ? `${pagination.totalItems} ${pagination.totalItems === 1 ? 'Tree' : 'Trees'}` : 'Trees';

  return (
    <main className="all-trees-directory">
      <h1 className="sr-only">All Trees</h1>
      <section className="all-trees-directory__controls" aria-label="Search and filter trees">
        <div className="all-trees-directory__search-row">
          <div className="all-trees-directory__search-wrap">
            <Icon name="search" size={22} aria-hidden="true" />
            <label className="sr-only" htmlFor="all-trees-search">Search the botanical collection</label>
            <input
              id="all-trees-search"
              type="search"
              value={searchInput}
              onChange={(event) => {
                setPage(1);
                setSearchInput(event.target.value);
              }}
              placeholder="Search the botanical collection..."
            />
          </div>
          <div className="all-trees-directory__collection-status" aria-live="polite">
            <span aria-hidden="true"><Icon name="leaf" size={18} /></span>
            <span>{resultLabel}</span>
          </div>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={updateViewMode}
            aria-label="Tree collection view"
            className="all-trees-directory__view-toggle"
          >
            <ToggleGroupItem value="grid" className="all-trees-directory__view-toggle-item" aria-label="Grid view">
              <span aria-hidden="true"><Icon name="grid_view" size={19} /></span>
              <span>Grid</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="list" className="all-trees-directory__view-toggle-item" aria-label="List view">
              <span aria-hidden="true"><Icon name="format_list_bulleted" size={20} /></span>
              <span>List</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="all-trees-directory__filter-row" aria-label="Tree filters">
          <button className={`all-trees-directory__filter-chip ${!hasActiveCriteria ? 'all-trees-directory__filter-chip--active' : ''}`} type="button" onClick={clearCriteria}>All Trees</button>
          <TaxonomyFilter label="Species" value={species} values={facetsQuery.data?.species ?? []} onValueChange={updateSpecies} />
          <TaxonomyFilter label="Family" value={family} values={facetsQuery.data?.families ?? []} onValueChange={updateFamily} />
        </div>
      </section>

      <section className="all-trees-directory__collection" aria-labelledby="all-trees-results-title" aria-busy={treesQuery.isPending}>
        <h2 id="all-trees-results-title" className="sr-only">Trees in the collection</h2>
        {treesQuery.isPending && <div className={`all-trees-directory__${viewMode}`} aria-label="Loading tree records" role={viewMode === 'list' ? 'list' : undefined}>{Array.from({ length: 8 }, (_, index) => <TreeCardSkeleton key={index} viewMode={viewMode} />)}</div>}

        {treesQuery.isError && (
          <div className="all-trees-directory__state" role="alert">
            <span className="all-trees-directory__state-icon" aria-hidden="true"><Icon name="error" size={30} /></span>
            <h2>We couldn’t load the tree collection.</h2>
            <p>Please check your connection and try again.</p>
            <button type="button" onClick={() => void treesQuery.refetch()}>Try again</button>
          </div>
        )}

        {!treesQuery.isPending && !treesQuery.isError && trees.length === 0 && (
          <div className="all-trees-directory__state">
            <span className="all-trees-directory__state-icon" aria-hidden="true"><Icon name="tree" size={30} /></span>
            <h2>{hasActiveCriteria ? 'No trees match your search.' : 'No trees are currently available.'}</h2>
            <p>{hasActiveCriteria ? 'Try another name, species, or family.' : 'Please check back when the park collection has been updated.'}</p>
            {hasActiveCriteria && <button type="button" onClick={clearCriteria}>Clear search and filters</button>}
          </div>
        )}

        {!treesQuery.isPending && !treesQuery.isError && trees.length > 0 && (
          <>
            <div className={`all-trees-directory__${viewMode}`} role={viewMode === 'list' ? 'list' : undefined}>
              {trees.map((tree) => (
                <DirectoryCard
                  key={tree.id}
                  tree={tree}
                  image={imagesQuery.data?.[tree.id]}
                  imageUrl={imageUrls[tree.id]}
                  imageFailed={brokenImageIds.has(tree.id)}
                  onImageError={handleImageError}
                  viewMode={viewMode}
                />
              ))}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <nav className="all-trees-directory__pagination" aria-label="Tree collection pagination">
                <button type="button" disabled={pagination.currentPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                  <Icon name="back" size={18} />
                  <span>Previous</span>
                </button>
                <span aria-live="polite">Page {pagination.currentPage} of {pagination.totalPages}</span>
                <button type="button" disabled={pagination.currentPage >= pagination.totalPages} onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}>
                  <span>Next</span>
                  <Icon name="forward" size={18} />
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
