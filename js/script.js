/* ===== IRR Event Organizer — script.js ===== */
'use strict';

/* ------------------------------------------------------------------
   1. PENGATURAN — ubah data di bagian ini saja
------------------------------------------------------------------- */
const CONFIG = {
  whatsapp: '6285876293847',            // format internasional tanpa + atau 0
  whatsappDisplay: '0858-7629-3847',
  accountName: 'Indah Robiah Rohmah',
  // Isi sesuai rekening resmi, contoh: 'Bank BCA — 1234567890'
  accountInfo: 'Nomor rekening akan diinformasikan admin melalui WhatsApp.',
  promoMinServices: 2,
  promoDiscount: 0.10
};

/* Daftar layanan (satu sumber data untuk kartu layanan, form booking, kalender, dan ulasan).
   unit: null = harga tetap per layanan; 'porsi' / 'paket' = harga per satuan dengan jumlah. */
const SERVICES = [
  {
    id: 'mc-ultah', icon: '🎤', name: 'MC Acara Ulang Tahun', short: 'MC Ulang Tahun',
    price: 300000, from: true, unit: null,
    desc: 'Buat acara ulang tahun menjadi lebih seru, interaktif, dan berkesan bersama MC dari IRR Event Organizer.',
    title: 'Yang Anda dapatkan',
    items: ['MC interaktif dan seru', 'Konsultasi rundown acara', 'Konsultasi konsep acara',
            'Memandu games dan aktivitas acara', 'Membantu menjaga alur acara tetap terarah', 'Bonus souvenir dari IRR']
  },
  {
    id: 'mc-lamaran', icon: '💍', name: 'MC Acara Lamaran', short: 'MC Lamaran',
    price: 400000, from: true, unit: null,
    desc: 'Membantu membuat prosesi lamaran berjalan lebih tertata, hangat, dan berkesan.',
    title: 'Yang Anda dapatkan',
    items: ['MC lamaran profesional', 'Konsultasi rundown acara', 'Membantu pengondisian acara',
            'Pendampingan selama acara', 'Membantu menjaga alur prosesi tetap terarah', 'Hadiah souvenir dari IRR']
  },
  {
    id: 'fotografer', icon: '📸', name: 'Fotografer', short: 'Fotografer',
    price: 500000, from: false, unit: null,
    desc: 'Abadikan momen berharga Anda bersama fotografer yang profesional dan komunikatif.',
    title: 'Yang Anda dapatkan',
    items: ['Fotografer profesional dan komunikatif', 'Unlimited shoots', 'Pengkondisian dan arahan gaya foto',
            'Foto full editing', 'Dokumentasi momen penting selama acara']
  },
  {
    id: 'catering-1', icon: '🍗', name: 'Catering Paket 1', short: 'Catering 1',
    price: 20000, from: false, unit: 'porsi',
    desc: 'Menu praktis dan lengkap untuk berbagai kebutuhan acara.',
    title: 'Isi menu',
    items: ['Nasi', 'Ayam', 'Sayur', 'Buah', 'Kerupuk', 'Sambal', 'Air minum']
  },
  {
    id: 'catering-2', icon: '🍖', name: 'Catering Paket 2', short: 'Catering 2',
    price: 35000, from: false, unit: 'porsi',
    desc: 'Pilihan menu yang lebih lengkap untuk acara spesial Anda.',
    title: 'Isi menu',
    items: ['Nasi', 'Daging kambing / sapi', 'Sup / tumisan', 'Sambal goreng kentang', 'Kerupuk', 'Sambal', 'Air minum']
  },
  {
    id: 'snack', icon: '🍬', name: 'Snack', short: 'Snack',
    price: 10000, from: false, unit: 'paket',
    desc: 'Pilihan snack praktis untuk melengkapi acara Anda.',
    title: 'Isi paket',
    items: ['Jajanan Chiki — 3 varian', 'Permen', 'Air minum']
  }
];

/* Jadwal booking yang tampil di kalender.
   Satu baris = satu booking. Satu tanggal boleh punya banyak baris.
   services: isi dengan id layanan dari daftar di atas.
   >>> CONTOH DATA. Hapus/ganti dengan booking asli sebelum website dipublikasikan. <<< */
const BOOKINGS = [
  { date: '2026-10-17', services: ['mc-ultah', 'fotografer'], status: 'Terkonfirmasi' },
  { date: '2026-10-24', services: ['mc-lamaran'],             status: 'Terkonfirmasi' },
  { date: '2026-10-31', services: ['catering-2', 'snack'],    status: 'Terkonfirmasi' }
];

/* ------------------------------------------------------------------
   2. UTILITAS
------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const byId = id => SERVICES.find(s => s.id === id);
const rupiah = n => 'Rp' + Math.round(n).toLocaleString('id-ID');
const pad = n => String(n).padStart(2, '0');
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const MONTHS = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function formatDateID(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  return `${days[dt.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}
function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  });
  children.forEach(c => c && node.append(c));
  return node;
}
const today = new Date();
const TODAY_ISO = toISO(today.getFullYear(), today.getMonth(), today.getDate());

/* ------------------------------------------------------------------
   3. NAVIGASI
------------------------------------------------------------------- */
(function initNav() {
  const toggle = $('#nav-toggle');
  const nav = $('#nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('a', nav).forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  $('#year').textContent = today.getFullYear();
  $('#wa-link').href = `https://wa.me/${CONFIG.whatsapp}`;
  $('#pay-account').textContent = CONFIG.accountInfo;
})();

/* ------------------------------------------------------------------
   4. KARTU LAYANAN
------------------------------------------------------------------- */
(function renderServices() {
  const grid = $('#service-grid');
  SERVICES.forEach(s => {
    const priceText = (s.from ? 'Mulai dari ' : '') + rupiah(s.price) + (s.unit ? ` / ${s.unit}` : '');
    const card = el('article', { class: 'card service-card' },
      el('div', { class: 'service-icon', 'aria-hidden': 'true', text: s.icon }),
      el('h3', { text: s.name }),
      el('p', { class: 'price', text: priceText }),
      el('p', { class: 'service-desc', text: s.desc }),
      el('h4', { text: s.title }),
      (() => {
        const ul = el('ul', { class: 'check-list' });
        s.items.forEach(i => ul.append(el('li', { text: i })));
        return ul;
      })(),
      el('a', { class: 'btn btn-ghost', href: '#booking', 'data-pick': s.id, text: 'Pesan layanan ini' })
    );
    grid.append(card);
  });
  grid.addEventListener('click', e => {
    const a = e.target.closest('[data-pick]');
    if (!a) return;
    setServiceChecked(a.dataset.pick, true);
  });
})();

/* ------------------------------------------------------------------
   5. FORM BOOKING + RINGKASAN HARGA
------------------------------------------------------------------- */
const orderForm = $('#order-form');
const dateInput = $('#event-date');
dateInput.min = TODAY_ISO;

(function renderServiceOptions() {
  const wrap = $('#service-options');
  SERVICES.forEach(s => {
    const label = el('label', { class: 'pick', 'data-id': s.id });
    const cb = el('input', { type: 'checkbox', value: s.id, name: 'service' });
    const info = el('span', {},
      el('span', { class: 'p-name', text: s.name }),
      el('span', { class: 'p-price', text: (s.from ? 'Mulai dari ' : '') + rupiah(s.price) + (s.unit ? ` / ${s.unit}` : '') })
    );
    label.append(cb, info);
    if (s.unit) {
      const qty = el('span', { class: 'qty' }, document.createTextNode('Jumlah'),
        el('input', { type: 'number', min: '1', max: '2000', value: '50', 'aria-label': `Jumlah ${s.unit} ${s.name}` }));
      label.append(qty);
    }
    wrap.append(label);
  });
  wrap.addEventListener('change', updateSummary);
  wrap.addEventListener('input', updateSummary);

  // Dropdown layanan di form ulasan
  const sel = $('#rv-service');
  sel.append(el('option', { value: '', disabled: '', selected: '', text: 'Pilih layanan' }));
  SERVICES.forEach(s => sel.append(el('option', { value: s.name, text: s.name })));
  sel.append(el('option', { value: 'Lebih dari satu layanan', text: 'Lebih dari satu layanan' }));
})();

function setServiceChecked(id, checked) {
  const row = $(`.pick[data-id="${id}"]`);
  if (!row) return;
  $('input[type="checkbox"]', row).checked = checked;
  updateSummary();
}

function getSelection() {
  return $$('.pick').filter(r => $('input[type="checkbox"]', r).checked).map(r => {
    const s = byId(r.dataset.id);
    let qty = 1;
    if (s.unit) {
      qty = Math.max(1, Math.min(2000, parseInt($('.qty input', r).value, 10) || 1));
    }
    return { service: s, qty, line: s.price * qty };
  });
}

function updateSummary() {
  $$('.pick').forEach(r => r.classList.toggle('on', $('input[type="checkbox"]', r).checked));
  const sel = getSelection();
  const list = $('#summary-list');
  list.replaceChildren();
  if (!sel.length) list.append(el('li', { class: 'muted', text: 'Belum ada layanan dipilih.' }));
  sel.forEach(({ service, qty, line }) => {
    const left = service.unit ? `${service.name} × ${qty} ${service.unit}` : service.name;
    list.append(el('li', {}, el('span', { text: left }), el('span', { text: (service.from ? '≥ ' : '') + rupiah(line) })));
  });
  const subtotal = sel.reduce((t, x) => t + x.line, 0);
  const promo = sel.length >= CONFIG.promoMinServices;
  const discount = promo ? subtotal * CONFIG.promoDiscount : 0;
  $('#sum-subtotal').textContent = rupiah(subtotal);
  $('#sum-discount-row').hidden = !promo;
  $('#sum-discount').textContent = '-' + rupiah(discount);
  $('#sum-total').textContent = rupiah(subtotal - discount);
  const hasFrom = sel.some(x => x.service.from);
  $('#sum-note').textContent = promo
    ? 'Promo 10% aktif karena Anda memilih minimal 2 layanan. Harga final dikonfirmasi admin.'
    : 'Pilih minimal 2 layanan untuk mendapat diskon 10%.' + (hasFrom ? ' Layanan MC berstatus "mulai dari".' : '');
}

/* Petunjuk di bawah input tanggal bila tanggal sudah memiliki booking */
dateInput.addEventListener('change', () => {
  const hint = $('#date-hint');
  const found = BOOKINGS.filter(b => b.date === dateInput.value);
  hint.classList.toggle('warn-text', found.length > 0);
  if (!dateInput.value) { hint.textContent = ''; return; }
  hint.textContent = found.length
    ? 'Tanggal ini sudah ada booking: ' + [...new Set(found.flatMap(b => b.services.map(id => byId(id).short)))].join(', ') + '. Admin akan mengonfirmasi ketersediaan.'
    : 'Tanggal ini masih kosong.';
});

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  const err = $('#form-error');
  const name = $('#client-name').value.trim();
  const phone = $('#client-phone').value.trim();
  const type = $('#event-type').value;
  const date = dateInput.value;
  const notes = $('#event-notes').value.trim();
  const sel = getSelection();

  const problems = [];
  if (!name) problems.push('nama lengkap');
  if (!/^[0-9+\-\s()]{8,}$/.test(phone)) problems.push('nomor WhatsApp yang valid');
  if (!type) problems.push('jenis acara');
  if (!date) problems.push('tanggal acara');
  else if (date < TODAY_ISO) problems.push('tanggal acara yang belum lewat');
  if (!sel.length) problems.push('minimal satu layanan');
  if (problems.length) {
    err.textContent = 'Mohon lengkapi: ' + problems.join(', ') + '.';
    err.hidden = false;
    return;
  }
  err.hidden = true;

  const subtotal = sel.reduce((t, x) => t + x.line, 0);
  const promo = sel.length >= CONFIG.promoMinServices;
  const total = subtotal - (promo ? subtotal * CONFIG.promoDiscount : 0);
  const lines = sel.map(({ service, qty, line }) =>
    `- ${service.name}${service.unit ? ` × ${qty} ${service.unit}` : ''}: ${service.from ? 'mulai ' : ''}${rupiah(line)}`);

  const msg = [
    'Halo IRR Event Organizer, saya ingin booking:',
    '',
    `Nama: ${name}`,
    `WhatsApp: ${phone}`,
    `Jenis acara: ${type}`,
    `Tanggal acara: ${formatDateID(date)}`,
    '',
    'Layanan:',
    ...lines,
    '',
    promo ? `Subtotal: ${rupiah(subtotal)}\nDiskon promo 10%: -${rupiah(subtotal * CONFIG.promoDiscount)}` : `Subtotal: ${rupiah(subtotal)}`,
    `Estimasi total: ${rupiah(total)}`,
    notes ? `\nCatatan: ${notes}` : '',
    '',
    'Mohon konfirmasi ketersediaan tanggal dan penawarannya. Terima kasih.'
  ].join('\n');

  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

/* ------------------------------------------------------------------
   6. KALENDER (menampilkan jenis layanan per tanggal)
------------------------------------------------------------------- */
(function initCalendar() {
  let year = today.getFullYear();
  let month = today.getMonth();
  let selected = null;

  const grid = $('#days-grid');
  const title = $('#month-year');
  const detail = $('#day-detail');

  const bookingsOn = iso => BOOKINGS.filter(b => b.date === iso);
  const servicesOn = iso => [...new Set(bookingsOn(iso).flatMap(b => b.services))];

  function render() {
    title.textContent = `${MONTHS[month]} ${year}`;
    grid.replaceChildren();
    const firstDay = new Date(year, month, 1).getDay();
    const total = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.append(el('div', { class: 'cal-cell empty', 'aria-hidden': 'true' }));

    for (let d = 1; d <= total; d++) {
      const iso = toISO(year, month, d);
      const ids = servicesOn(iso);
      const cls = ['cal-cell'];
      if (iso < TODAY_ISO) cls.push('past');
      if (iso === TODAY_ISO) cls.push('today');
      if (ids.length) cls.push('booked');
      if (iso === selected) cls.push('selected');

      const label = `${formatDateID(iso)}. ` + (ids.length ? 'Booking: ' + ids.map(i => byId(i).short).join(', ') : 'Kosong');
      const cell = el('button', { class: cls.join(' '), type: 'button', 'data-date': iso, 'aria-label': label },
        el('span', { class: 'num', text: String(d) }));

      ids.slice(0, 2).forEach(id => cell.append(el('span', { class: 'tag', text: byId(id).short })));
      if (ids.length > 2) cell.append(el('span', { class: 'tag more', text: `+${ids.length - 2}` }));
      grid.append(cell);
    }
  }

  function showDetail(iso) {
    detail.replaceChildren(el('h3', { text: 'Detail tanggal' }), el('p', { class: 'detail-date', text: formatDateID(iso) }));
    const list = bookingsOn(iso);
    if (!list.length) {
      detail.append(el('p', { class: 'muted', text: 'Belum ada booking pada tanggal ini.' }));
    } else {
      list.forEach(b => {
        detail.append(el('div', { class: 'detail-item' },
          el('strong', { text: b.services.map(id => byId(id).name).join(' + ') }),
          el('span', { class: 'status', text: b.status || 'Terkonfirmasi' })));
      });
      detail.append(el('p', { class: 'fine', text: 'Satu tanggal bisa dipakai beberapa layanan. Hubungi kami untuk memastikan.' }));
    }
    if (iso >= TODAY_ISO) {
      const btn = el('button', { class: 'btn btn-primary', type: 'button', text: 'Booking tanggal ini' });
      btn.addEventListener('click', () => {
        dateInput.value = iso;
        dateInput.dispatchEvent(new Event('change'));
        $('#booking').scrollIntoView({ behavior: 'smooth' });
      });
      detail.append(btn);
    }
  }

  grid.addEventListener('click', e => {
    const cell = e.target.closest('.cal-cell[data-date]');
    if (!cell) return;
    selected = cell.dataset.date;
    render();
    showDetail(selected);
  });
  $('#prev-month').addEventListener('click', () => { month--; if (month < 0) { month = 11; year--; } render(); });
  $('#next-month').addEventListener('click', () => { month++; if (month > 11) { month = 0; year++; } render(); });

  render();
})();

/* ------------------------------------------------------------------
   7. ULASAN PELANGGAN
   Catatan: ulasan disimpan di browser pengunjung (localStorage), sehingga hanya
   terlihat di perangkat yang sama. Agar ulasan tampil untuk semua pengunjung,
   sambungkan ke layanan database (mis. Firebase / Supabase / Google Sheets)
   dengan mengganti fungsi loadReviews() dan saveReview().
------------------------------------------------------------------- */
(function initReviews() {
  const KEY = 'irr_reviews_v1';
  const listEl = $('#review-list');
  const form = $('#review-form');
  const text = $('#rv-text');

  function loadReviews() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { return []; }
  }
  function saveReview(r) {
    const all = loadReviews();
    all.unshift(r);
    try { localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100))); return true; } catch (_) { return false; }
  }

  function starsNode(n) {
    const s = el('span', { class: 'stars', 'aria-label': `${n} dari 5 bintang` });
    for (let i = 1; i <= 5; i++) s.append(el('span', { class: i <= n ? '' : 'off', text: '★', 'aria-hidden': 'true' }));
    return s;
  }

  function render() {
    const all = loadReviews();
    listEl.replaceChildren();
    $('#rating-summary').hidden = !all.length;

    if (!all.length) {
      listEl.append(el('div', { class: 'empty-state', text: 'Belum ada ulasan. Jadilah yang pertama menulis ulasan!' }));
      return;
    }
    const avg = all.reduce((t, r) => t + r.rating, 0) / all.length;
    $('#avg-score').textContent = avg.toFixed(1);
    $('#avg-stars').replaceChildren(starsNode(Math.round(avg)));
    $('#avg-count').textContent = `${all.length} ulasan`;

    all.forEach(r => {
      const d = new Date(r.createdAt);
      const dateText = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
      listEl.append(el('article', { class: 'review' },
        el('div', { class: 'review-top' },
          el('div', { class: 'avatar', 'aria-hidden': 'true', text: (r.name[0] || '?').toUpperCase() }),
          el('div', {}, el('strong', { text: r.name }), el('small', { text: `${r.service} · ${dateText}` }))),
        starsNode(r.rating),
        el('p', { text: r.text })));
    });
  }

  text.addEventListener('input', () => { $('#rv-count').textContent = text.value.length; });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('#rv-error');
    const name = $('#rv-name').value.trim();
    const service = $('#rv-service').value;
    const checked = $('input[name="rating"]:checked', form);
    const body = text.value.trim();

    const problems = [];
    if (!name) problems.push('nama');
    if (!service) problems.push('layanan');
    if (!checked) problems.push('penilaian bintang');
    if (body.length < 10) problems.push('ulasan (minimal 10 karakter)');
    if (problems.length) {
      err.textContent = 'Mohon lengkapi: ' + problems.join(', ') + '.';
      err.hidden = false;
      return;
    }
    err.hidden = true;

    const ok = saveReview({ name, service, rating: Number(checked.value), text: body, createdAt: Date.now() });
    if (!ok) {
      err.textContent = 'Ulasan tidak dapat disimpan di browser ini. Coba lagi atau gunakan browser lain.';
      err.hidden = false;
      return;
    }
    form.reset();
    $('#rv-count').textContent = '0';
    render();
    listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  render();
})();

updateSummary();
