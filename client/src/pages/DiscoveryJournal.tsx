/**
 * WRTI Discovery Journal.
 *
 * This route replaces the prior placeholder with the first approved live
 * Tree-data integration. Supabase, query, pagination, and mapping details stay
 * inside the Tree feature boundary rather than entering page components.
 */

import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/design-system/icons';
import { useTrees } from '@/features/trees';
import type { Tree } from '@/features/trees';
import './DiscoveryJournal.css';

const PAGE_SIZE = 12;

function TreeCard({ tree }: { tree: Tree }) {
  const taxonomy = [tree.species, tree.family].filter(Boolean).join(' · ');

  return (
    <article className="discovery-journal__tree-card">
      <Link className="discovery-journal__tree-link" to={`/trees/${tree.id}`} aria-label={`View details for ${tree.common_name}`}>
        <div className="discovery-journal__tree-icon" aria-hidden="true">
          <Icon name="eco" size={28} />
        </div>
        <div className="discovery-journal__tree-copy">
          <h2>{tree.common_name}</h2>
          {taxonomy && <p className="discovery-journal__taxonomy">{taxonomy}</p>}
          <p>{tree.description ?? 'No description has been recorded for this tree yet.'}</p>
        </div>
        {(tree.lat !== null && tree.lng !== null) && (
          <span className="discovery-journal__location-indicator" title="Location data available">
            <Icon name="location_on" size={18} />
            <span className="sr-only">Location data available</span>
          </span>
        )}
      </Link>
    </article>
  );
}

function TreeSkeleton() {
  return (
    <div className="discovery-journal__tree-card discovery-journal__tree-card--skeleton" aria-hidden="true">
      <div className="discovery-journal__skeleton-icon" />
      <div className="discovery-journal__skeleton-copy"><span /><span /><span /></div>
    </div>
  );
}

export default function DiscoveryJournal() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const treesQuery = useTrees({ page, itemsPerPage: PAGE_SIZE, search }, { enabled: true });
  const pagination = treesQuery.data?.pagination;

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(input.trim() || undefined);
  };

  return (
    <main className="discovery-journal">
      <section className="discovery-journal__hero" aria-labelledby="discovery-journal-title">
        <span className="discovery-journal__eyebrow">Live Park Collection</span>
        <h1 id="discovery-journal-title">Discovery Journal</h1>
        <p>Browse the trees currently recorded in the WRTI Wildlife Park collection.</p>
        <form className="discovery-journal__search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="tree-search">Search trees by common name</label>
          <span aria-hidden="true"><Icon name="search" size={20} /></span>
          <input id="tree-search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search common names" type="search" />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="discovery-journal__collection" aria-labelledby="tree-collection-title" aria-busy={treesQuery.isPending}>
        <div className="discovery-journal__collection-heading">
          <div>
            <h2 id="tree-collection-title">Trees in the collection</h2>
            {pagination && <p aria-live="polite">{pagination.totalItems} records available</p>}
          </div>
          {treesQuery.isFetching && !treesQuery.isPending && <span className="discovery-journal__refreshing">Refreshing</span>}
        </div>

        {treesQuery.isPending && <div className="discovery-journal__grid" aria-label="Loading tree records">{Array.from({ length: 6 }, (_, index) => <TreeSkeleton key={index} />)}</div>}

        {treesQuery.isError && (
          <div className="discovery-journal__state" role="alert">
            <span aria-hidden="true"><Icon name="error" size={28} /></span>
            <h2>We couldn’t load the tree collection.</h2>
            <p>Please check your connection and try again.</p>
            <button type="button" onClick={() => void treesQuery.refetch()}>Try again</button>
          </div>
        )}

        {!treesQuery.isPending && !treesQuery.isError && treesQuery.data?.items.length === 0 && (
          <div className="discovery-journal__state">
            <span aria-hidden="true"><Icon name="eco" size={28} /></span>
            <h2>No trees found</h2>
            <p>Try a different common-name search.</p>
          </div>
        )}

        {!treesQuery.isPending && !treesQuery.isError && Boolean(treesQuery.data?.items.length) && (
          <>
            <div className="discovery-journal__grid">{treesQuery.data?.items.map((tree) => <TreeCard key={tree.id} tree={tree} />)}</div>
            {pagination && pagination.totalPages > 1 && (
              <nav className="discovery-journal__pagination" aria-label="Tree collection pagination">
                <button type="button" disabled={pagination.currentPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><Icon name="arrow_back" size={18} />Previous</button>
                <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                <button type="button" disabled={pagination.currentPage >= pagination.totalPages} onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}>Next<Icon name="arrow_forward" size={18} /></button>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
