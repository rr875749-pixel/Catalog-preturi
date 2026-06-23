let globalDiscount    = 0;
let productDiscounts  = {};
let productDiscounts2 = {};
let currentCategory  = 'all';
let loadedProducts   = []; // produse încărcate din Firebase sau products.js

/* ── ÎNCĂRCARE PRODUSE ── */
function sortProducts(list) {
  return list.sort((a, b) => {
    const catDiff = (a.category || '').localeCompare(b.category || '', 'ro');
    return catDiff !== 0 ? catDiff : (a.name || '').localeCompare(b.name || '', 'ro');
  });
}

function initProducts(list) {
  loadedProducts = sortProducts(list);
  const CATEGORIES = ['all', ...new Set(loadedProducts.map(p => p.category))];
  buildCatTabs(CATEGORIES);
  renderTable();
}

function loadProducts() {
  // Citire inițială imediată
  db.collection('catalog_products').get()
    .then(snap => {
      if (!snap.empty) {
        initProducts(snap.docs.map(d => ({ ...d.data() })));
      } else {
        initProducts(PRODUCTS);
      }
    })
    .catch(() => initProducts(PRODUCTS));

  // Listener real-time pentru actualizări din admin
  db.collection('catalog_products').onSnapshot(snap => {
    if (!snap.empty) {
      initProducts(snap.docs.map(d => ({ ...d.data() })));
    }
  }, err => console.error('Snapshot error:', err));
}

/* ── UTILS ── */
function fmt(n) {
  return n.toFixed(2).replace('.', ',') + ' lei';
}

function getDiscount(code) {
  const per = productDiscounts[code];
  return (per !== undefined && per !== null && per !== '')
    ? parseFloat(per) || 0
    : globalDiscount;
}

function calcFinal(priceWithVAT, disc1, disc2) {
  let result = priceWithVAT * (1 - disc1 / 100);
  if (disc2 > 0) result = result * (1 - disc2 / 100);
  return result;
}

function getDiscount2(code) {
  const per = productDiscounts2[code];
  return (per !== undefined && per !== null && per !== '') ? parseFloat(per) || 0 : 0;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── TABURI CATEGORII ── */
function buildCatTabs(CATEGORIES) {
  const el = document.getElementById('catTabs');
  el.innerHTML = CATEGORIES.map(c => {
    const label = c === 'all' ? 'Toate' : c;
    const count = c === 'all'
      ? loadedProducts.length
      : loadedProducts.filter(p => p.category === c).length;
    return `<button class="cat-tab ${currentCategory === c ? 'active' : ''}" data-cat="${escHtml(c)}">
      ${escHtml(label)} <span class="cat-count">${count}</span>
    </button>`;
  }).join('');

  el.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      el.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTable();
    });
  });
}

/* ── RENDER TABEL ── */
function renderTable() {
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const tbody  = document.getElementById('tableBody');
  const empty  = document.getElementById('emptyState');
  const badge  = document.getElementById('countBadge');

  let filtered = loadedProducts;
  if (currentCategory !== 'all') filtered = filtered.filter(p => p.category === currentCategory);
  if (search) filtered = filtered.filter(p =>
    (p.code     || '').toLowerCase().includes(search) ||
    (p.name     || '').toLowerCase().includes(search) ||
    (p.category || '').toLowerCase().includes(search)
  );

  badge.textContent = filtered.length + ' produse';
  document.getElementById('headerBadge').textContent = loadedProducts.length + ' produse în catalog';

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    updateSummary([]);
    return;
  }
  empty.style.display = 'none';

  let lastCat = null;
  const rows  = [];

  filtered.forEach(p => {
    if (p.category !== lastCat) {
      rows.push(`<tr class="cat-divider-row"><td colspan="8"><span class="cat-divider-label">${escHtml(p.category)}</span></td></tr>`);
      lastCat = p.category;
    }

    const disc1    = getDiscount(p.code);
    const disc2    = getDiscount2(p.code);
    const vat      = (p.priceWithVAT || 0) - (p.priceNoVAT || 0);
    const final    = calcFinal(p.priceWithVAT || 0, disc1, disc2);
    const savings  = (p.priceWithVAT || 0) - final;
    const hasDisc  = disc1 > 0 || disc2 > 0;
    const perVal   = productDiscounts[p.code]  !== undefined ? productDiscounts[p.code]  : '';
    const perVal2  = productDiscounts2[p.code] !== undefined ? productDiscounts2[p.code] : '';
    const effDisc  = disc2 > 0
      ? Math.round((1 - (1 - disc1 / 100) * (1 - disc2 / 100)) * 1000) / 10
      : disc1;

    rows.push(`<tr class="${hasDisc ? 'row-discounted' : ''}">
      <td class="col-code"><span class="code-chip">${escHtml(p.code || '')}</span></td>
      <td class="col-name">${escHtml(p.name || '')}</td>
      <td class="col-buc"><span class="buc-val">${p.bucCutie || '—'}</span></td>
      <td class="col-price">
        <span class="${hasDisc ? 'price-striked' : 'price-orig'}">${fmt(p.priceWithVAT || 0)}</span>
      </td>
      <td class="col-vat">
        <span class="vat-chip">${fmt(vat)}</span>
        <span class="vat-rate">${p.vatRate || 21}%</span>
      </td>
      <td class="col-discount">
        <div class="disc-input-wrap">
          <input type="number" class="disc-input" min="0" max="36" step="1"
                 value="${escHtml(String(perVal))}"
                 placeholder="${globalDiscount > 0 ? globalDiscount : '0'}"
                 data-code="${escHtml(p.code || '')}"
                 onchange="onProductDiscount(this)" />
          <span class="pct-sign-sm">%</span>
        </div>
        <div class="disc-cascade-row">
          <span class="disc-cascade-plus">+</span>
          <div class="disc-input-wrap disc2-wrap">
            <input type="number" class="disc-input" min="0" max="36" step="1"
                   value="${escHtml(String(perVal2))}"
                   placeholder="0"
                   data-code="${escHtml(p.code || '')}"
                   onchange="onProductDiscount2(this)" />
            <span class="pct-sign-sm">%</span>
          </div>
        </div>
        ${hasDisc ? `<span class="disc-badge">${disc2 > 0 ? `↘ -${effDisc}%` : `-${disc1}%`}</span>` : ''}
      </td>
      <td class="col-final">
        <strong class="final-price ${hasDisc ? 'price-red' : ''}">${fmt(final)}</strong>
      </td>
      <td class="col-save">
        ${savings > 0.005 ? `<span class="savings-chip">-${fmt(savings)}</span>` : '<span class="no-savings">—</span>'}
      </td>
    </tr>`);
  });

  tbody.innerHTML = rows.join('');
  updateSummary(filtered);
}

function updateSummary(filtered) {
  const summaryEl = document.getElementById('globalSummary');
  const totalBar  = document.getElementById('totalBar');
  const totalVal  = document.getElementById('totalVal');

  let origTotal = 0, finalTotal = 0;
  filtered.forEach(p => {
    const disc1 = getDiscount(p.code);
    const disc2 = getDiscount2(p.code);
    origTotal  += p.priceWithVAT || 0;
    finalTotal += calcFinal(p.priceWithVAT || 0, disc1, disc2);
  });
  const totalSavings = origTotal - finalTotal;

  if (totalSavings > 0.005) {
    summaryEl.textContent = `Economie totală pe catalog vizibil: ${fmt(totalSavings)}`;
    totalBar.style.display = 'block';
    totalVal.textContent   = `${fmt(origTotal)} → ${fmt(finalTotal)} (economie ${fmt(totalSavings)})`;
  } else {
    summaryEl.textContent  = '';
    totalBar.style.display = 'none';
  }
}

/* ── DISCOUNT HANDLERS ── */
function onGlobalSlider() {
  const val = parseInt(document.getElementById('globalSlider').value) || 0;
  globalDiscount = val;
  document.getElementById('globalInput').value = val;
  renderTable();
}

function onGlobalInput() {
  let val = parseInt(document.getElementById('globalInput').value) || 0;
  val = Math.min(36, Math.max(0, val));
  globalDiscount = val;
  document.getElementById('globalSlider').value = val;
  document.getElementById('globalInput').value  = val;
  renderTable();
}

function onProductDiscount(input) {
  const code = input.dataset.code;
  const raw  = input.value.trim();
  if (raw === '') {
    delete productDiscounts[code];
  } else {
    let val = parseFloat(raw) || 0;
    val = Math.min(36, Math.max(0, val));
    productDiscounts[code] = val;
  }
  renderTable();
}

function onProductDiscount2(input) {
  const code = input.dataset.code;
  const raw  = input.value.trim();
  if (raw === '') {
    delete productDiscounts2[code];
  } else {
    let val = parseFloat(raw) || 0;
    val = Math.min(36, Math.max(0, val));
    productDiscounts2[code] = val;
  }
  renderTable();
}

function filterProducts() { renderTable(); }

function onSearch() {
  const val = document.getElementById('searchInput').value;
  document.getElementById('searchClear').style.display = val ? 'flex' : 'none';
  renderTable();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').style.display = 'none';
  renderTable();
}

function resetDiscounts() {
  productDiscounts  = {};
  productDiscounts2 = {};
  renderTable();
}

function resetAll() {
  globalDiscount    = 0;
  productDiscounts  = {};
  productDiscounts2 = {};
  currentCategory  = 'all';
  document.getElementById('globalSlider').value = 0;
  document.getElementById('globalInput').value  = 0;
  document.getElementById('searchInput').value  = '';
  const CATEGORIES = ['all', ...new Set(loadedProducts.map(p => p.category))];
  buildCatTabs(CATEGORIES);
  renderTable();
}

/* ── INIT ── */
loadProducts();
