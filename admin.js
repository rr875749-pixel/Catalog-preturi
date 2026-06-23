const USERS = [
  { username: 'Admin',  password: 'mars2026' },
];

const SESSION_KEY = 'catalog_admin_auth';

let allAdminProducts = [];

/* ── AUTH ── */
function doLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const found = USERS.find(u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass);
  if (found) {
    sessionStorage.setItem(SESSION_KEY, '1');
    showAdmin(found.username);
  } else {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('loginPass').value = '';
  }
}

function doLogout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
}

function checkAuth() {
  if (sessionStorage.getItem(SESSION_KEY) === '1') showAdmin('Admin');
}

document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

async function showAdmin(username) {
  document.getElementById('loginOverlay').style.display = 'none';
  document.getElementById('adminUI').style.display = 'block';
  document.getElementById('loggedInAs').textContent = '👤 ' + username;
  runDiag();
  buildCategoryDatalist();
  listenProducts();
  wireAutoCalc();
}

/* ── FIREBASE DIAGNOSTIC ── */
async function runDiag() {
  const diag = document.getElementById('firebaseDiag');
  diag.style.display = 'block';
  diag.textContent = '🔄 Testez conexiunea Firebase...';
  diag.style.background = '#2563EB';
  try {
    await db.collection('_diag').doc('test').set({ ts: Date.now() });
    await db.collection('_diag').doc('test').delete();
    diag.textContent = '✓ Firebase conectat și funcțional.';
    diag.style.background = '#16A34A';
    setTimeout(() => { diag.style.display = 'none'; }, 3500);
  } catch (e) {
    diag.innerHTML = `⚠️ Eroare Firebase: <strong>${e.code || e.message}</strong>. Verifică firebase-config.js și regulile Firestore.`;
    diag.style.background = '#DC2626';
  }
}

/* ── REALTIME LISTENER ── */
function listenProducts() {
  db.collection('catalog_products').orderBy('category').orderBy('name').onSnapshot(snap => {
    allAdminProducts = snap.docs.map(d => ({ _id: d.id, ...d.data() }));
    renderAdminList(allAdminProducts);
    buildCategoryDatalist();
  }, err => console.error(err));
}

/* ── CATEGORY DATALIST ── */
function buildCategoryDatalist() {
  const cats = [...new Set(allAdminProducts.map(p => p.category).filter(Boolean))];
  document.getElementById('categoryList').innerHTML = cats.map(c => `<option value="${escHtml(c)}">`).join('');
}

/* ── AUTO-CALC TVA ── */
function wireAutoCalc() {
  const noVAT  = document.getElementById('fPriceNoVAT');
  const vatSel = document.getElementById('fVatRate');
  const withVAT = document.getElementById('fPriceWithVAT');

  function recalc() {
    const base = parseFloat(noVAT.value);
    const rate = parseFloat(vatSel.value);
    if (!isNaN(base) && base > 0) {
      withVAT.value = (base * (1 + rate / 100)).toFixed(2);
    }
  }
  noVAT.addEventListener('input', recalc);
  vatSel.addEventListener('change', recalc);
}

/* ── SAVE PRODUCT ── */
async function saveProduct() {
  const editId      = document.getElementById('editId').value;
  const code        = document.getElementById('fCode').value.trim();
  const name        = document.getElementById('fName').value.trim();
  const category    = document.getElementById('fCategory').value.trim();
  const bucCutie    = parseInt(document.getElementById('fBucCutie').value) || 0;
  const priceNoVAT  = parseFloat(document.getElementById('fPriceNoVAT').value);
  const vatRate     = parseInt(document.getElementById('fVatRate').value);
  const priceWithVAT = parseFloat(document.getElementById('fPriceWithVAT').value);

  if (!code)                { alert('Introdu codul Aquila.'); return; }
  if (!name)                { alert('Introdu numele produsului.'); return; }
  if (!category)            { alert('Introdu categoria.'); return; }
  if (isNaN(priceNoVAT))    { alert('Introdu prețul fără TVA.'); return; }
  if (isNaN(priceWithVAT))  { alert('Prețul cu TVA lipsește sau este invalid.'); return; }

  const btn = document.querySelector('.btn-save');
  btn.textContent = 'Se salvează...'; btn.disabled = true;

  const data = { code, name, category, bucCutie, priceNoVAT, priceWithVAT, vatRate, discount: 0 };

  try {
    if (editId) {
      await db.collection('catalog_products').doc(editId).update({ ...data, updatedAt: new Date().toISOString() });
      showToast('Produs actualizat! ✓');
    } else {
      // verifică dacă codul există deja
      const existing = allAdminProducts.find(p => p.code === code);
      if (existing) { alert(`Codul "${code}" există deja în catalog.`); btn.textContent = 'Salvează Produsul'; btn.disabled = false; return; }
      await db.collection('catalog_products').add({ ...data, createdAt: new Date().toISOString() });
      showToast('Produs adăugat! ✓');
    }
    resetForm();
  } catch (e) {
    showToast('Eroare la salvare. Verifică Firebase.');
    console.error(e);
  } finally {
    btn.textContent = 'Salvează Produsul'; btn.disabled = false;
  }
}

/* ── EDIT PRODUCT ── */
function editProduct(id) {
  const p = allAdminProducts.find(x => x._id === id);
  if (!p) return;
  document.getElementById('editId').value       = id;
  document.getElementById('fCode').value        = p.code        || '';
  document.getElementById('fName').value        = p.name        || '';
  document.getElementById('fCategory').value    = p.category    || '';
  document.getElementById('fBucCutie').value    = p.bucCutie    || '';
  document.getElementById('fPriceNoVAT').value  = p.priceNoVAT  || '';
  document.getElementById('fVatRate').value     = p.vatRate     || 21;
  document.getElementById('fPriceWithVAT').value = p.priceWithVAT || '';
  document.getElementById('formTitle').textContent   = 'Editează Produs';
  document.getElementById('btnCancel').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── DELETE PRODUCT ── */
async function deleteProduct(id, name) {
  if (!confirm(`Ștergi produsul "${name}"?`)) return;
  try {
    await db.collection('catalog_products').doc(id).delete();
    showToast('Produs șters.');
  } catch (e) {
    showToast('Eroare la ștergere.');
    console.error(e);
  }
}

function cancelEdit() { resetForm(); }

function resetForm() {
  ['editId','fCode','fName','fCategory','fBucCutie','fPriceNoVAT','fPriceWithVAT'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('fVatRate').value = '21';
  document.getElementById('formTitle').textContent   = 'Adaugă Produs';
  document.getElementById('btnCancel').style.display = 'none';
}

/* ── RENDER ADMIN LIST ── */
function renderAdminList(list) {
  const el = document.getElementById('adminList');
  document.getElementById('adminCount').textContent = list.length + ' produse';

  if (list.length === 0) {
    el.innerHTML = '<div class="admin-empty">Niciun produs în catalog. Adaugă primul produs sau importă din products.js.</div>';
    return;
  }

  let lastCat = null;
  el.innerHTML = list.map(p => {
    let divider = '';
    if (p.category !== lastCat) {
      divider = `<div class="admin-cat-divider">${escHtml(p.category)}</div>`;
      lastCat = p.category;
    }
    return `${divider}
      <div class="admin-product-item" id="item-${p._id}">
        <div class="admin-product-info">
          <span class="code-chip">${escHtml(p.code || '')}</span>
          <span class="admin-product-name">${escHtml(p.name || '')}</span>
        </div>
        <div class="admin-inline-prices">
          <div class="inline-price-group">
            <label>Fără TVA</label>
            <input type="number" class="inline-price-input" step="0.01" min="0"
                   value="${p.priceNoVAT?.toFixed(2) || ''}"
                   onchange="quickUpdatePrice('${p._id}', this)" data-field="priceNoVAT" />
          </div>
          <div class="inline-price-group">
            <label>Cu TVA</label>
            <input type="number" class="inline-price-input price-blue" step="0.01" min="0"
                   value="${p.priceWithVAT?.toFixed(2) || ''}"
                   onchange="quickUpdatePrice('${p._id}', this)" data-field="priceWithVAT" />
          </div>
          <span class="vat-rate">${p.vatRate || 21}%</span>
        </div>
        <button class="btn-edit"   onclick="editProduct('${p._id}')">Editează</button>
        <button class="btn-delete" onclick="deleteProduct('${p._id}', '${escHtml(p.name || '')}')">Șterge</button>
      </div>`;
  }).join('');
}

/* ── QUICK PRICE UPDATE ── */
async function quickUpdatePrice(id, input) {
  const val = parseFloat(input.value);
  if (isNaN(val) || val < 0) return;
  const field = input.dataset.field;
  try {
    await db.collection('catalog_products').doc(id).update({ [field]: val, updatedAt: new Date().toISOString() });
    showToast('Preț actualizat! ✓');
  } catch (e) {
    showToast('Eroare la salvare.');
    console.error(e);
  }
}

function filterAdminList() {
  const q = document.getElementById('adminSearch').value.trim().toLowerCase();
  const filtered = q
    ? allAdminProducts.filter(p =>
        (p.code  || '').toLowerCase().includes(q) ||
        (p.name  || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q))
    : allAdminProducts;
  renderAdminList(filtered);
}

/* ── SYNC — actualizează prețurile din Firebase cu datele din products.js ── */
async function syncProducts() {
  if (!confirm(`Sincronizează ${PRODUCTS.length} produse din products.js în Firebase?\n\nActualizează prețurile, TVA-ul și categoriile pentru produsele existente. Produsele adăugate manual în admin NU sunt afectate.`)) return;

  const statusEl = document.getElementById('importStatus');
  statusEl.textContent = 'Se sincronizează...';

  const snap = await db.collection('catalog_products').get();
  const docsMap = {};
  snap.docs.forEach(d => { docsMap[d.data().code] = d.id; });

  let updated = 0, added = 0;
  const batch = db.batch();

  PRODUCTS.forEach(p => {
    if (docsMap[p.code]) {
      // actualizează doc existent
      const ref = db.collection('catalog_products').doc(docsMap[p.code]);
      batch.update(ref, {
        name:         p.name,
        category:     p.category,
        bucCutie:     p.bucCutie,
        priceNoVAT:   p.priceNoVAT,
        priceWithVAT: p.priceWithVAT,
        vatRate:      p.vatRate,
      });
      updated++;
    } else {
      // adaugă produs nou
      const ref = db.collection('catalog_products').doc();
      batch.set(ref, { ...p, createdAt: new Date().toISOString() });
      added++;
    }
  });

  try {
    await batch.commit();
    statusEl.textContent = `✓ ${updated} produse actualizate, ${added} adăugate nou.`;
    showToast(`Sincronizare completă! ${updated} actualizate.`);
  } catch (e) {
    statusEl.textContent = `Eroare: ${e.message}`;
    console.error(e);
  }
}

/* ── IMPORT INITIAL DATA ── */
async function importInitialData() {
  if (!confirm(`Importă ${PRODUCTS.length} produse din products.js în Firebase?\n\nProdusele existente cu același cod NU vor fi duplicate.`)) return;

  const statusEl = document.getElementById('importStatus');
  statusEl.textContent = 'Se importă...';

  const existingCodes = new Set(allAdminProducts.map(p => p.code));
  const toImport = PRODUCTS.filter(p => !existingCodes.has(p.code));

  if (toImport.length === 0) {
    statusEl.textContent = '✓ Toate produsele există deja în Firebase.';
    return;
  }

  let done = 0;
  const batch = db.batch();
  toImport.forEach(p => {
    const ref = db.collection('catalog_products').doc();
    batch.set(ref, { ...p, createdAt: new Date().toISOString() });
    done++;
  });

  try {
    await batch.commit();
    statusEl.textContent = `✓ ${done} produse importate cu succes!`;
    showToast(`${done} produse importate! ✓`);
  } catch (e) {
    statusEl.textContent = `Eroare la import: ${e.message}`;
    console.error(e);
  }
}

/* ── UTILS ── */
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = '0'; }, 4000);
}

checkAuth();
