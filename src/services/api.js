const API_PREFIX = '/api';

async function tryFetch(path, opts) {
  const res = await fetch(`${API_PREFIX}${path}`, opts);
  if (!res.ok) throw new Error('Network response not ok');
  return await res.json();
}

export async function getDonors() {
  try { return await tryFetch('/donors'); }
  catch (e) { const raw = localStorage.getItem('bd_donors_v1'); return raw ? JSON.parse(raw) : null; }
}

export async function createDonor(donor) {
  try { return await tryFetch('/donors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(donor) }); }
  catch (e) { const raw = localStorage.getItem('bd_donors_v1'); const arr = raw ? JSON.parse(raw) : []; const d = { ...donor, id: Date.now() }; arr.unshift(d); localStorage.setItem('bd_donors_v1', JSON.stringify(arr)); return d; }
}

export async function getBanks() {
  try { return await tryFetch('/banks'); } catch (e) { return []; }
}

export async function getMessages() {
  try { return await tryFetch('/messages'); } catch (e) { const raw = localStorage.getItem('bd_messages_v1'); return raw ? JSON.parse(raw) : []; }
}

export async function postMessage(m) {
  try { return await tryFetch('/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(m) }); }
  catch (e) { const raw = localStorage.getItem('bd_messages_v1'); const arr = raw ? JSON.parse(raw) : []; const msg = { ...m, id: Date.now(), time: Date.now() }; arr.push(msg); localStorage.setItem('bd_messages_v1', JSON.stringify(arr)); return msg; }
}

export async function createRequest(reqBody) {
  try { return await tryFetch('/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reqBody) }); } catch (e) { return { ...reqBody, id: Date.now(), status: 'open', createdAt: new Date().toISOString() }; }
}
