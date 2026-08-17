/**
 * WRTI Live Tree Map — Mapbox-first exploration surface.
 * Design fidelity reminder: maintain the Stitch map-first hierarchy: a real
 * outdoor map, pale floating controls, botanical-green Tree markers, and a
 * restrained discovery BottomSheet. All Tree content remains live and flows
 * through the existing Tree feature boundary.
 */

import { useQueries } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BottomSheet, type BottomSheetState } from '@/design-system/components/BottomSheet';
import { MapLayout } from '@/design-system/components/MapLayout';
import { Icon } from '@/design-system/icons';
import { MAPBOX_STYLES, mapboxConfig, type MapTheme } from '@/config/mapbox';
import {
  isLiveTreeDataAvailable,
  treeQueryKeys,
  treeRepository,
  useTreeImages,
  useTrees,
} from '@/features/trees';
import type { Tree, TreeImage, TreeListInput } from '@/features/trees';
import './TreeMap.css';

const MAP_PAGE_SIZE = 50;

type MapResourceState = 'loading' | 'ready' | 'unavailable';
type LocationState = 'idle' | 'requesting' | 'located' | 'unavailable';

interface MappableTree extends Tree {
  lat: number;
  lng: number;
}

function isMappableTree(tree: Tree): tree is MappableTree {
  return Number.isFinite(tree.lat)
    && Number.isFinite(tree.lng)
    // Six verified records currently use 0,0. This is outside the remaining
    // live collection bounds and is treated as an unmappable placeholder pair.
    && (tree.lat !== 0 || tree.lng !== 0);
}

function getPrimaryImage(images: TreeImage[] | undefined): TreeImage | null {
  return images?.find((image) => image.is_main || image.is_primary) ?? images?.[0] ?? null;
}

function useResolvedImage(path: string | null | undefined) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setUrl(null);
    if (!path?.trim()) return () => { active = false; };

    void treeRepository.resolveStorageUrl(path)
      .then((resolved) => { if (active) setUrl(resolved); })
      .catch(() => { if (active) setUrl(null); });

    return () => { active = false; };
  }, [path]);

  return url;
}

/** Load every real Tree page through the established list query contract. */
function useMapTrees() {
  const firstPage = useTrees({ page: 1, itemsPerPage: MAP_PAGE_SIZE }, { enabled: true });
  const additionalInputs = useMemo<TreeListInput[]>(() => {
    const totalPages = firstPage.data?.pagination.totalPages ?? 1;
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      page: index + 2,
      itemsPerPage: MAP_PAGE_SIZE,
    }));
  }, [firstPage.data?.pagination.totalPages]);

  const additionalPages = useQueries({
    queries: additionalInputs.map((input) => ({
      queryKey: treeQueryKeys.list(input),
      queryFn: () => treeRepository.getTrees(input),
      enabled: isLiveTreeDataAvailable(),
      staleTime: 60_000,
      retry: 1,
    })),
  });

  const isPending = firstPage.isPending || additionalPages.some((query) => query.isPending);
  const isError = firstPage.isError || additionalPages.some((query) => query.isError);
  const error = firstPage.error ?? additionalPages.find((query) => query.error)?.error ?? null;
  const items = useMemo(() => [
    ...(firstPage.data?.items ?? []),
    ...additionalPages.flatMap((query) => query.data?.items ?? []),
  ], [additionalPages, firstPage.data?.items]);

  const refetch = useCallback(async () => {
    await Promise.all([firstPage.refetch(), ...additionalPages.map((query) => query.refetch())]);
  }, [additionalPages, firstPage]);

  return { items, isPending, isError, error, refetch };
}

function getTreeSearchLabel(tree: Tree): string {
  return [tree.common_name, tree.species, tree.family].filter(Boolean).join(' ').toLocaleLowerCase();
}

function createMarkerElement(tree: MappableTree, selected: boolean, onSelect: (treeId: number) => void): HTMLButtonElement {
  const marker = document.createElement('button');
  marker.type = 'button';
  marker.className = `tree-map__marker${selected ? ' tree-map__marker--selected' : ''}`;
  marker.setAttribute('aria-label', `View ${tree.common_name} on the map`);
  marker.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">nature</span>';
  marker.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(tree.id);
  });
  return marker;
}

function MapStateMessage({
  title,
  copy,
  onRetry,
}: {
  title: string;
  copy: string;
  onRetry?: () => void;
}) {
  return (
    <section className="tree-map__state-message" role="status">
      <Icon name="map" size={28} />
      <h1>{title}</h1>
      <p>{copy}</p>
      {onRetry ? <button type="button" onClick={onRetry}>Try again</button> : null}
    </section>
  );
}

export default function TreeMap() {
  const [searchParams] = useSearchParams();
  const requestedTreeId = Number(searchParams.get('treeId'));
  const navigationRequested = searchParams.get('mode') === 'navigate';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const fittedMapRef = useRef(false);
  const appliedThemeRef = useRef<MapTheme>('daylight');
  const [mapState, setMapState] = useState<MapResourceState>('loading');
  const [resourceRetryKey, setResourceRetryKey] = useState(0);
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);
  const [sheetState, setSheetState] = useState<BottomSheetState>('peek');
  const [search, setSearch] = useState('');
  const [mapTheme, setMapTheme] = useState<MapTheme>('daylight');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const mapTreesQuery = useMapTrees();

  const mappableTrees = useMemo(() => mapTreesQuery.items.filter(isMappableTree), [mapTreesQuery.items]);
  const markerSignature = useMemo(
    () => mappableTrees.map((tree) => `${tree.id}:${tree.lat}:${tree.lng}`).join('|'),
    [mappableTrees]
  );
  const firstMappableTree = mappableTrees[0];
  const selectedTree = useMemo(
    () => mappableTrees.find((tree) => tree.id === selectedTreeId) ?? null,
    [mappableTrees, selectedTreeId]
  );
  const selectedImagesQuery = useTreeImages(selectedTree?.id ?? 0, { enabled: Boolean(selectedTree) });
  const selectedImage = useMemo(() => getPrimaryImage(selectedImagesQuery.data), [selectedImagesQuery.data]);
  const selectedImageUrl = useResolvedImage(selectedImage?.image_path);
  const searchResults = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    if (!normalizedSearch) return [];
    return mappableTrees.filter((tree) => getTreeSearchLabel(tree).includes(normalizedSearch)).slice(0, 5);
  }, [mappableTrees, search]);

  const selectTree = useCallback((treeId: number) => {
    setSelectedTreeId(treeId);
    setSheetState('half');
    setSearch('');
  }, []);

  useEffect(() => {
    const updateConnection = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  useEffect(() => {
    if (Number.isInteger(requestedTreeId) && requestedTreeId > 0 && mappableTrees.some((tree) => tree.id === requestedTreeId)) {
      selectTree(requestedTreeId);
    }
  }, [mappableTrees, requestedTreeId, selectTree]);

  useEffect(() => {
    if (!mapboxConfig.isConfigured || mapTreesQuery.isPending || mapTreesQuery.isError || !mappableTrees.length || !mapContainerRef.current || mapRef.current) return;

    let loaded = false;
    const firstTree = firstMappableTree;
    if (!firstTree) return;

    mapboxgl.accessToken = mapboxConfig.accessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLES[mapTheme],
      center: [firstTree.lng, firstTree.lat],
      zoom: 12,
      minZoom: mapboxConfig.minZoom,
      maxZoom: mapboxConfig.maxZoom,
      attributionControl: false,
      cooperativeGestures: true,
    });
    appliedThemeRef.current = mapTheme;
    mapRef.current = map;
    // The canvas and live marker layer can render immediately. Network failures
    // still transition to the explicit unavailable state through Mapbox's error event.
    setMapState('ready');

    const markMapReady = () => {
      loaded = true;
      setMapState('ready');
    };
    map.once('load', markMapReady);
    map.once('idle', markMapReady);
    map.once('error', () => {
      if (!loaded) setMapState('unavailable');
    });
    map.on('click', () => {
      setSelectedTreeId(null);
      setSheetState('peek');
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      fittedMapRef.current = false;
    };
  }, [firstMappableTree?.lat, firstMappableTree?.lng, mapTreesQuery.isError, mapTreesQuery.isPending, mappableTrees.length, resourceRetryKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready') return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = mappableTrees.map((tree) => new mapboxgl.Marker({
      element: createMarkerElement(tree, tree.id === selectedTreeId, selectTree),
      anchor: 'bottom',
    }).setLngLat([tree.lng, tree.lat]).addTo(map));
  }, [mapState, markerSignature, mappableTrees, selectTree, selectedTreeId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready' || !mappableTrees.length) return;

    if (selectedTree) {
      map.flyTo({ center: [selectedTree.lng, selectedTree.lat], zoom: Math.max(map.getZoom(), 15), essential: true, duration: 550 });
      return;
    }

    if (!fittedMapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      mappableTrees.forEach((tree) => bounds.extend([tree.lng, tree.lat]));
      map.fitBounds(bounds, { padding: mapboxConfig.initialFitPadding, maxZoom: 14, duration: 0 });
      fittedMapRef.current = true;
    }
  }, [mapState, markerSignature, mappableTrees, selectedTree?.id, selectedTree?.lat, selectedTree?.lng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready' || appliedThemeRef.current === mapTheme) return;
    appliedThemeRef.current = mapTheme;
    map.setStyle(MAPBOX_STYLES[mapTheme]);
  }, [mapState, mapTheme]);

  const updateZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ zoom: Math.min(mapboxConfig.maxZoom, Math.max(mapboxConfig.minZoom, map.getZoom() + delta)), duration: 180 });
  };

  const locateUser = () => {
    if (!navigator.geolocation) {
      setLocationState('unavailable');
      setLocationMessage('Location services are unavailable in this browser.');
      return;
    }
    setLocationState('requesting');
    setLocationMessage(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 15, essential: true, duration: 550 });
        setLocationState('located');
        setLocationMessage('Map centred on your current location.');
      },
      () => {
        setLocationState('unavailable');
        setLocationMessage('GPS signal unavailable. You can still explore live Tree locations on the map.');
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 }
    );
  };

  const retryMap = () => {
    setMapState('loading');
    setResourceRetryKey((current) => current + 1);
    void mapTreesQuery.refetch();
  };

  if (!mapboxConfig.isConfigured) {
    return <MapStateMessage title="Map configuration unavailable" copy="The live park map cannot load until its public Mapbox configuration is available." />;
  }

  if (!isLiveTreeDataAvailable()) {
    return <MapStateMessage title="Live Tree data unavailable" copy="The map needs the approved read-only Tree connection before it can show park locations." />;
  }

  if (!isOnline) {
    return <MapStateMessage title="Offline map tiles unavailable" copy="Reconnect to load the live Mapbox map and current Tree locations." onRetry={retryMap} />;
  }

  if (mapTreesQuery.isError) {
    return <MapStateMessage title="We couldn’t load Tree locations" copy={mapTreesQuery.error?.message ?? 'Please check your connection and try again.'} onRetry={retryMap} />;
  }

  if (!mapTreesQuery.isPending && !mappableTrees.length) {
    return <MapStateMessage title="No live Tree locations available" copy="Tree records are available, but none currently have a usable map location." onRetry={retryMap} />;
  }

  return (
    <main className="tree-map-page" aria-label="WRTI live Tree map">
      <MapLayout
        className="tree-map"
        map={<div ref={mapContainerRef} className="tree-map__canvas" aria-label="Interactive Mapbox map of live Tree locations" />}
        topOverlay={(
          <div className="tree-map__topbar">
            <form
              className="tree-map__search"
              onSubmit={(event) => {
                event.preventDefault();
                const firstResult = searchResults[0];
                if (firstResult) selectTree(firstResult.id);
              }}
            >
              <Icon name="search" size={21} aria-label="" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search live Trees"
                aria-label="Search live Trees on the map"
              />
              {search ? <button type="button" aria-label="Clear Tree search" onClick={() => setSearch('')}><Icon name="close" size={19} /></button> : null}
            </form>
            {searchResults.length ? (
              <div className="tree-map__search-results" role="listbox" aria-label="Matching live Trees">
                {searchResults.map((tree) => (
                  <button key={tree.id} type="button" role="option" onClick={() => selectTree(tree.id)}>
                    <Icon name="tree" size={20} />
                    <span><strong>{tree.common_name}</strong><small>{tree.species ?? tree.family ?? 'Tree record'}</small></span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}
        controls={(
          <div className="tree-map__controls" aria-label="Map controls">
            <button type="button" aria-label="Zoom in" onClick={() => updateZoom(1)}><Icon name="add" size={22} /></button>
            <button type="button" aria-label="Zoom out" onClick={() => updateZoom(-1)}><Icon name="remove" size={22} /></button>
            <button type="button" aria-label="Open map settings" aria-expanded={settingsOpen} onClick={() => setSettingsOpen((open) => !open)}><Icon name="layers" size={22} /></button>
          </div>
        )}
        fab={(
          <button type="button" className="tree-map__locate" aria-label="Use my location" onClick={locateUser} disabled={locationState === 'requesting'}>
            <Icon name={locationState === 'requesting' ? 'loading' : 'location'} size={23} />
          </button>
        )}
        centerOverlay={settingsOpen ? (
          <section className="tree-map__settings" role="dialog" aria-modal="false" aria-label="Map settings">
            <div className="tree-map__settings-heading"><span><Icon name="layers" size={21} /> Map appearance</span><button type="button" aria-label="Close map settings" onClick={() => setSettingsOpen(false)}><Icon name="close" size={20} /></button></div>
            <p>Adaptive Environmental Theme</p>
            <div className="tree-map__theme-options" role="radiogroup" aria-label="Map theme">
              {(['daylight', 'dusk'] as const).map((theme) => (
                <button key={theme} type="button" role="radio" aria-checked={mapTheme === theme} data-state={mapTheme === theme ? 'on' : 'off'} onClick={() => setMapTheme(theme)}>
                  <Icon name={theme === 'daylight' ? 'sun' : 'moon'} size={19} />{theme === 'daylight' ? 'Daylight' : 'Dusk'}
                </button>
              ))}
            </div>
            <p className="tree-map__settings-note">Live Tree locations are shown. Conservation, specimen, transport, and AR overlays are not available in the current data model.</p>
          </section>
        ) : undefined}
        bottomOverlay={(
          <div className="tree-map__status-strip" aria-live="polite">
            <span><Icon name="tree" size={17} /> {mappableTrees.length} live Tree locations</span>
            {navigationRequested && selectedTree ? <span><Icon name="info" size={17} /> Route guidance needs mapped path data; this Tree is focused on the map.</span> : null}
            {locationMessage ? <span className={locationState === 'unavailable' ? 'tree-map__status-strip--warning' : ''}><Icon name={locationState === 'unavailable' ? 'locationOff' : 'location'} size={17} /> {locationMessage}</span> : null}
          </div>
        )}
        bottomSheet={(
          <BottomSheet
            state={sheetState}
            onStateChange={setSheetState}
            defaultState="peek"
            showBackdrop={false}
            escapeCloseable={false}
            modal={false}
            ariaLabel="Tree discovery panel"
            className="tree-map__sheet"
            contentClassName="tree-map__sheet-content"
            handle={<span className="tree-map__sheet-handle" aria-hidden="true" />}
          >
            <div className="tree-map__sheet-heading">
              <div><span>{selectedTree ? 'Selected Tree' : 'Nearby Discoveries'}</span><h1>{selectedTree ? selectedTree.common_name : 'Explore live Tree locations'}</h1></div>
              <div className="tree-map__sheet-snaps" aria-label="Panel size">
                {(['collapsed', 'peek', 'half', 'full'] as BottomSheetState[]).map((state) => <button key={state} type="button" aria-label={`Set panel to ${state}`} aria-pressed={sheetState === state} onClick={() => setSheetState(state)} />)}
              </div>
            </div>
            {selectedTree ? (
              <article className="tree-map__selected-card">
                {selectedImageUrl ? <img src={selectedImageUrl} alt={selectedImage?.caption ?? `${selectedTree.common_name} in WRTI Wildlife Park`} /> : <div className="tree-map__selected-media-fallback" role="img" aria-label={`Image for ${selectedTree.common_name} is unavailable`}><Icon name="tree" size={28} /></div>}
                <div><span className="tree-map__family-chip">{selectedTree.family ?? 'Park Tree'}</span><h2>{selectedTree.common_name}</h2><p>{selectedTree.species ?? 'Scientific name not recorded'}</p><Link to={`/trees/${selectedTree.id}`}>View Tree details <Icon name="forward" size={18} /></Link></div>
              </article>
            ) : (
              <div className="tree-map__nearby-list">
                {mappableTrees.slice(0, 3).map((tree) => <button key={tree.id} type="button" onClick={() => selectTree(tree.id)}><Icon name="tree" size={20} /><span><strong>{tree.common_name}</strong><small>{tree.family ?? 'Park Tree'}</small></span><Icon name="forward" size={18} /></button>)}
              </div>
            )}
          </BottomSheet>
        )}
      />
      {mapState === 'loading' ? <div className="tree-map__loading" role="status"><Icon name="loading" size={24} /> Loading live park map…</div> : null}
      {mapState === 'unavailable' ? <MapStateMessage title="Map resource unavailable" copy="The live map could not load. Check your connection and try again." onRetry={retryMap} /> : null}
    </main>
  );
}
