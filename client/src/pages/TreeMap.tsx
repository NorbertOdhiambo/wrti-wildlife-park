/**
 * WRTI Live Tree Map — Mapbox-first exploration surface.
 * Design fidelity reminder: maintain the Stitch map-first hierarchy: a real
 * outdoor map, pale floating controls, botanical-green Tree markers, and a
 * restrained discovery rail. The mobile Tree-preview BottomSheet is temporarily
 * deferred through a local rendering flag; its reusable architecture and state
 * remain intact. All Tree content remains live and flows through the existing
 * Tree feature boundary.
 */

import { useQueries } from '@tanstack/react-query';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BottomSheet, type BottomSheetState } from '@/design-system/components/BottomSheet';
import { MapLayout } from '@/design-system/components/MapLayout';
import { Icon } from '@/design-system/icons';
import { MAPBOX_STYLES, MAPBOX_THEME_METADATA, mapboxConfig, type MapTheme } from '@/config/mapbox';
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

/**
 * Deliberate temporary scope boundary for the Map Canvas Focus Pass. This keeps
 * BottomSheet state and the reusable sheet render tree ready for a later phase
 * without allowing a selected Tree to cover the mobile map canvas today.
 */
const MAP_MOBILE_TREE_PREVIEW_ENABLED = false;

type MapResourceState = 'loading' | 'ready' | 'unavailable';
type LocationState = 'idle' | 'requesting' | 'located' | 'unavailable';

interface MappableTree extends Tree {
  lat: number;
  lng: number;
}

function isMappableTree(tree: Tree): tree is MappableTree {
  const { lat, lng } = tree;
  return Number.isFinite(lat)
    && Number.isFinite(lng)
    && lat !== null
    && lng !== null
    && Math.abs(lat) <= 90
    && Math.abs(lng) <= 180
    && (lat !== 0 || lng !== 0);
}

function getMapAnimationDuration(): number {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 0 : 550;
}

function getMapCameraPadding(sheetState: BottomSheetState): mapboxgl.PaddingOptions {
  const mobile = window.innerWidth < 768;
  const desktop = window.innerWidth >= 1024;
  const bottomBySheet: Record<BottomSheetState, number> = {
    collapsed: 40,
    peek: mobile ? 170 : 130,
    half: mobile ? 330 : 210,
    full: mobile ? 470 : 290,
  };

  return {
    top: desktop ? 108 : 92,
    right: desktop ? 88 : 64,
    bottom: desktop ? 72 : (MAP_MOBILE_TREE_PREVIEW_ENABLED ? bottomBySheet[sheetState] : 54),
    left: desktop ? Math.min(464, window.innerWidth * 0.31) + 46 : 64,
  };
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
  marker.setAttribute('aria-pressed', String(selected));
  marker.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">nature</span>';
  marker.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(tree.id);
  });
  return marker;
}

function createVisitorLocationElement(): HTMLSpanElement {
  const marker = document.createElement('span');
  marker.className = 'tree-map__visitor-location';
  marker.setAttribute('role', 'img');
  marker.setAttribute('aria-label', 'Your current location');
  marker.innerHTML = '<span class="tree-map__visitor-location-dot" aria-hidden="true"></span>';
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

function TreeDiscoveryContent({
  selectedTree,
  selectedImage,
  selectedImageUrl,
  mappableTrees,
  onSelect,
  showHeading = true,
  showSheetSnaps = false,
  sheetState,
  onSheetStateChange,
}: {
  selectedTree: MappableTree | null;
  selectedImage: TreeImage | null;
  selectedImageUrl: string | null;
  mappableTrees: MappableTree[];
  onSelect: (treeId: number) => void;
  showHeading?: boolean;
  showSheetSnaps?: boolean;
  sheetState?: BottomSheetState;
  onSheetStateChange?: (state: BottomSheetState) => void;
}) {
  return (
    <>
      {showHeading ? (
        <div className="tree-map__sheet-heading">
          <div>
            <span>{selectedTree ? 'Selected Tree' : 'Nearby Discoveries'}</span>
            <h1>{selectedTree ? selectedTree.common_name : 'Explore live Tree locations'}</h1>
          </div>
          {showSheetSnaps && sheetState && onSheetStateChange ? (
            <div className="tree-map__sheet-snaps" aria-label="Panel size">
              {(['collapsed', 'peek', 'half', 'full'] as BottomSheetState[]).map((state) => (
                <button
                  key={state}
                  type="button"
                  aria-label={`Set panel to ${state}`}
                  aria-pressed={sheetState === state}
                  onClick={() => onSheetStateChange(state)}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {selectedTree ? (
        <article className="tree-map__selected-card">
          {selectedImageUrl ? (
            <img src={selectedImageUrl} alt={selectedImage?.caption ?? `${selectedTree.common_name} in WRTI Wildlife Park`} />
          ) : (
            <div className="tree-map__selected-media-fallback" role="img" aria-label={`Image for ${selectedTree.common_name} is unavailable`}>
              <Icon name="tree" size={28} />
            </div>
          )}
          <div>
            <span className="tree-map__family-chip">{selectedTree.family ?? 'Park Tree'}</span>
            <h2>{selectedTree.common_name}</h2>
            <p>{selectedTree.species ?? 'Scientific name not recorded'}</p>
            <Link to={`/trees/${selectedTree.id}`}>View Tree details <Icon name="forward" size={18} /></Link>
          </div>
        </article>
      ) : (
        <div className="tree-map__nearby-list">
          {mappableTrees.slice(0, 3).map((tree) => (
            <button key={tree.id} type="button" onClick={() => onSelect(tree.id)}>
              <Icon name="tree" size={20} />
              <span><strong>{tree.common_name}</strong><small>{tree.family ?? 'Park Tree'}</small></span>
              <Icon name="forward" size={18} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function TreeMap() {
  const [searchParams] = useSearchParams();
  const requestedTreeId = Number(searchParams.get('treeId'));
  const navigationRequested = searchParams.get('mode') === 'navigate';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef(new Map<number, { marker: mapboxgl.Marker; element: HTMLButtonElement }>());
  const visitorLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const fittedMapRef = useRef(false);
  const appliedThemeRef = useRef<MapTheme>('eco');
  const [mapState, setMapState] = useState<MapResourceState>('loading');
  const [resourceRetryKey, setResourceRetryKey] = useState(0);
  const [selectedTreeId, setSelectedTreeId] = useState<number | null>(null);
  const [sheetState, setSheetState] = useState<BottomSheetState>('peek');
  const [search, setSearch] = useState('');
  const [mapTheme, setMapTheme] = useState<MapTheme>('eco');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const mapTreesQuery = useMapTrees();

  const mappableTrees = useMemo(() => mapTreesQuery.items.filter(isMappableTree), [mapTreesQuery.items]);
  const markerSignature = useMemo(
    () => mappableTrees.map((tree) => `${tree.id}:${tree.lat}:${tree.lng}:${tree.common_name}`).join('|'),
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
  }, [markerSignature, requestedTreeId, selectTree]);

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
      markersRef.current.forEach(({ marker }) => marker.remove());
      markersRef.current.clear();
      visitorLocationMarkerRef.current?.remove();
      visitorLocationMarkerRef.current = null;
      map.remove();
      mapRef.current = null;
      fittedMapRef.current = false;
    };
  }, [firstMappableTree?.lat, firstMappableTree?.lng, mapTreesQuery.isError, mapTreesQuery.isPending, mappableTrees.length, resourceRetryKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready') return;

    markersRef.current.forEach(({ marker }) => marker.remove());
    markersRef.current.clear();
    mappableTrees.forEach((tree) => {
      const element = createMarkerElement(tree, false, selectTree);
      const marker = new mapboxgl.Marker({ element, anchor: 'bottom' })
        .setLngLat([tree.lng, tree.lat])
        .addTo(map);
      markersRef.current.set(tree.id, { marker, element });
    });
  }, [mapState, markerSignature, mappableTrees, selectTree]);

  useEffect(() => {
    markersRef.current.forEach(({ element }, treeId) => {
      const selected = treeId === selectedTreeId;
      element.classList.toggle('tree-map__marker--selected', selected);
      element.setAttribute('aria-pressed', String(selected));
    });
  }, [selectedTreeId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready' || !mappableTrees.length) return;

    if (selectedTree) {
      map.flyTo({
        center: [selectedTree.lng, selectedTree.lat],
        zoom: Math.max(map.getZoom(), 15),
        padding: getMapCameraPadding(sheetState),
        essential: false,
        duration: getMapAnimationDuration(),
      });
      return;
    }

    if (!fittedMapRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      mappableTrees.forEach((tree) => bounds.extend([tree.lng, tree.lat]));
      map.fitBounds(bounds, { padding: getMapCameraPadding(sheetState), maxZoom: 14, duration: 0 });
      fittedMapRef.current = true;
    }
  }, [mapState, markerSignature, mappableTrees, selectedTree?.id, selectedTree?.lat, selectedTree?.lng, sheetState]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mapState !== 'ready' || appliedThemeRef.current === mapTheme) return;
    appliedThemeRef.current = mapTheme;
    map.setStyle(MAPBOX_STYLES[mapTheme]);
  }, [mapState, mapTheme]);

  const updateZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ zoom: Math.min(mapboxConfig.maxZoom, Math.max(mapboxConfig.minZoom, map.getZoom() + delta)), duration: getMapAnimationDuration() });
  };

  const setVisitorLocation = useCallback((longitude: number, latitude: number) => {
    const map = mapRef.current;
    if (!map) return;

    const coordinates: [number, number] = [longitude, latitude];
    if (visitorLocationMarkerRef.current) {
      visitorLocationMarkerRef.current.setLngLat(coordinates);
      return;
    }

    visitorLocationMarkerRef.current = new mapboxgl.Marker({
      element: createVisitorLocationElement(),
      anchor: 'center',
    })
      .setLngLat(coordinates)
      .addTo(map);
  }, []);

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
        setVisitorLocation(longitude, latitude);
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 15, essential: false, duration: getMapAnimationDuration() });
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
        mapClassName="tree-map__map-region"
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
                placeholder="Search species or habitats..."
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
        sideOverlay={(
          <aside className="tree-map__desktop-rail" aria-label="Tree discovery information">
            <header className="tree-map__rail-brand">
              <h1>Discovery</h1>
              <p>Explore species and habitats near you.</p>
            </header>
            <section className="tree-map__rail-section" aria-label={selectedTree ? 'Selected Tree information' : 'Nearby Tree discoveries'}>
              <TreeDiscoveryContent
                selectedTree={selectedTree}
                selectedImage={selectedImage}
                selectedImageUrl={selectedImageUrl}
                mappableTrees={mappableTrees}
                onSelect={selectTree}
                showHeading={false}
              />
            </section>
          </aside>
        )}
        controls={(
          <div className="tree-map__controls" aria-label="Map controls">
            <button
              type="button"
              className="tree-map__layers-control"
              aria-label="Open map settings"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((open) => !open)}
            >
              <Icon name="layers" size={22} />
            </button>
            <div className="tree-map__zoom-controls" aria-label="Zoom controls">
              <button type="button" aria-label="Zoom in" onClick={() => updateZoom(1)}><Icon name="add" size={22} /></button>
              <button type="button" aria-label="Zoom out" onClick={() => updateZoom(-1)}><Icon name="remove" size={22} /></button>
            </div>
            <button type="button" className="tree-map__locate" aria-label="Use my location" onClick={locateUser} disabled={locationState === 'requesting'}>
              <Icon name={locationState === 'requesting' ? 'loading' : 'location'} size={23} />
            </button>
          </div>
        )}
        controlsPositionClassName="tree-map__controls-position"
        centerOverlay={settingsOpen ? (
          <section className="tree-map__settings" role="dialog" aria-modal="false" aria-label="Map settings">
            <div className="tree-map__settings-heading"><span><Icon name="layers" size={21} /> Map appearance</span><button type="button" aria-label="Close map settings" onClick={() => setSettingsOpen(false)}><Icon name="close" size={20} /></button></div>
            <p>Map style</p>
            <div className="tree-map__theme-options" role="radiogroup" aria-label="Map theme">
              {(Object.keys(MAPBOX_STYLES) as MapTheme[]).map((theme) => (
                <button key={theme} type="button" role="radio" aria-checked={mapTheme === theme} data-state={mapTheme === theme ? 'on' : 'off'} onClick={() => setMapTheme(theme)}>
                  <Icon name={MAPBOX_THEME_METADATA[theme].icon} size={19} />{MAPBOX_THEME_METADATA[theme].label}
                </button>
              ))}
            </div>
            <p>Map layers</p>
            <ul className="tree-map__layer-options" aria-label="Unavailable map layers">
              {['Ecological Zones', 'Walking Paths', 'Cycling Routes'].map((layer) => <li key={layer}><span>{layer}</span><span>Unavailable</span></li>)}
            </ul>
            <p className="tree-map__settings-note">Live Tree locations are shown. These layers need verified geographic data before they can be enabled.</p>
          </section>
        ) : undefined}
        bottomOverlay={navigationRequested || locationMessage ? (
          <div className="tree-map__status-strip" aria-live="polite">
            {navigationRequested && selectedTree ? <span><Icon name="info" size={17} /> Route guidance needs mapped path data; this Tree is focused on the map.</span> : null}
            {locationMessage ? <span className={locationState === 'unavailable' ? 'tree-map__status-strip--warning' : ''}><Icon name={locationState === 'unavailable' ? 'locationOff' : 'location'} size={17} /> {locationMessage}</span> : null}
          </div>
        ) : undefined}
        bottomSheet={MAP_MOBILE_TREE_PREVIEW_ENABLED ? (
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
            <TreeDiscoveryContent
              selectedTree={selectedTree}
              selectedImage={selectedImage}
              selectedImageUrl={selectedImageUrl}
              mappableTrees={mappableTrees}
              onSelect={selectTree}
              showSheetSnaps
              sheetState={sheetState}
              onSheetStateChange={setSheetState}
            />
          </BottomSheet>
        ) : undefined}
      />
      {mapState === 'loading' ? <div className="tree-map__loading" role="status"><Icon name="loading" size={24} /> Loading live park map…</div> : null}
      {mapState === 'unavailable' ? <MapStateMessage title="Map resource unavailable" copy="The live map could not load. Check your connection and try again." onRetry={retryMap} /> : null}
    </main>
  );
}
