import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error('Required frontend-safe Supabase runtime configuration is unavailable.');
}

const client = createClient(url, key, { auth: { persistSession: false } });
const { data, error } = await client
  .from('trees')
  .select('id, common_name, lat, lng')
  .order('id', { ascending: true });

if (error) throw new Error(`Unable to audit live Tree coordinates: ${error.message}`);

const records = (data ?? []).map((row) => {
  const latitude = row.lat === null ? null : Number(row.lat);
  const longitude = row.lng === null ? null : Number(row.lng);
  let reason = 'Mapped — valid non-zero coordinate pair.';

  if (row.lat === null || row.lat === '') reason = 'Not mapped — latitude is missing.';
  else if (row.lng === null || row.lng === '') reason = 'Not mapped — longitude is missing.';
  else if (!Number.isFinite(latitude)) reason = 'Not mapped — latitude is not numeric.';
  else if (!Number.isFinite(longitude)) reason = 'Not mapped — longitude is not numeric.';
  else if (latitude < -90 || latitude > 90) reason = 'Not mapped — latitude is outside the valid geographic range.';
  else if (longitude < -180 || longitude > 180) reason = 'Not mapped — longitude is outside the valid geographic range.';
  else if (latitude === 0 && longitude === 0) reason = 'Not mapped — repeated (0, 0) placeholder pair, outside the verified WRTI coordinate cluster.';

  return {
    id: row.id,
    commonName: row.common_name ?? 'Unnamed Tree',
    lat: row.lat ?? null,
    lng: row.lng ?? null,
    mappable: reason.startsWith('Mapped'),
    reason,
  };
});

const mapped = records.filter((record) => record.mappable);
const excluded = records.filter((record) => !record.mappable);
const duplicatePairs = new Map();
for (const record of records) {
  const pair = `${record.lat},${record.lng}`;
  duplicatePairs.set(pair, [...(duplicatePairs.get(pair) ?? []), record.id]);
}

const start = Math.max(0, Number(process.argv[2] ?? 0));
const size = Math.max(1, Number(process.argv[3] ?? records.length));
const rows = records.slice(start, start + size);

console.log(`TOTAL=${records.length}; MAPPED=${mapped.length}; EXCLUDED=${excluded.length}`);
console.log(`ROWS=${start + 1}-${Math.min(records.length, start + size)}`);
console.log('| ID | Common name | Latitude | Longitude | Mappable | Reason |');
console.log('| --- | --- | ---: | ---: | --- | --- |');
for (const record of rows) {
  const escapeCell = (value) => String(value ?? '—').replaceAll('|', '\\|');
  console.log(`| ${record.id} | ${escapeCell(record.commonName)} | ${escapeCell(record.lat)} | ${escapeCell(record.lng)} | ${record.mappable ? 'Yes' : 'No'} | ${escapeCell(record.reason)} |`);
}
console.log(`DUPLICATE_PAIRS=${JSON.stringify(Object.fromEntries([...duplicatePairs.entries()].filter(([, ids]) => ids.length > 1)))}`);
