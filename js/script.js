'use strict';

/* =========================================================
   IRR EVENT ORGANIZER — SCRIPT V2
========================================================= */


/* =========================================================
   1. CONFIGURATION
========================================================= */

const CONFIG = {

  whatsapp: '6285876293847',

  whatsappDisplay: '0858-7629-3847',

  accountName: 'Indah Robiah Rohmah',

  /*
    GANTI BAGIAN INI JIKA SUDAH ADA REKENING RESMI.
  */
  accountInfo:
    'Nomor rekening akan diinformasikan admin melalui WhatsApp.',

  promoMinServices: 2,

  promoDiscount: 0.10

};


/* =========================================================
   2. SERVICES
========================================================= */

const SERVICES = [

  {
    id: 'mc-ultah',

    icon: '🎤',

    name: 'MC Acara Ulang Tahun',

    short: 'MC Ulang Tahun',

    price: 300000,

    from: true,

    unit: null,

    desc:
      'Membantu membuat acara ulang tahun lebih seru, interaktif dan berkesan.',

    title: 'Yang Anda dapatkan',

    items: [

      'MC interaktif dan seru',

      'Konsultasi rundown acara',

      'Konsultasi konsep acara',

      'Memandu games dan aktivitas',

      'Menjaga alur acara tetap terarah',

      'Bonus souvenir dari IRR'

    ]

  },


  {
    id: 'mc-lamaran',

    icon: '💍',

    name: 'MC Acara Lamaran',

    short: 'MC Lamaran',

    price: 400000,

    from: true,

    unit: null,

    desc:
      'Membantu prosesi lamaran berjalan lebih tertata, hangat dan berkesan.',

    title: 'Yang Anda dapatkan',

    items: [

      'MC lamaran profesional',

      'Konsultasi rundown acara',

      'Membantu pengondisian acara',

      'Pendampingan selama acara',

      'Menjaga alur prosesi',

      'Hadiah souvenir dari IRR'

    ]

  },


  {
    id: 'fotografer',

    icon: '📸',

    name: 'Fotografer',

    short: 'Fotografer',

    price: 500000,

    from: false,

    unit: null,

    desc:
      'Abadikan momen berharga bersama fotografer yang profesional dan komunikatif.',

    title: 'Yang Anda dapatkan',

    items: [

      'Fotografer profesional',

      'Unlimited shoots',

      'Arahan gaya foto',

      'Foto full editing',

      'Dokumentasi momen penting'

    ]

  },


  {
    id: 'catering-1',

    icon: '🍗',

    name: 'Catering Paket 1',

    short: 'Catering 1',

    price: 20000,

    from: false,

    unit: 'porsi',

    desc:
      'Menu praktis dan lengkap untuk berbagai kebutuhan acara.',

    title: 'Isi menu',

    items: [

      'Nasi',

      'Ayam',

      'Sayur',

      'Buah',

      'Kerupuk',

      'Sambal',

      'Air minum'

    ]

  },


  {
    id: 'catering-2',

    icon: '🍖',

    name: 'Catering Paket 2',

    short: 'Catering 2',

    price: 35000,

    from: false,

    unit: 'porsi',

    desc:
      'Pilihan menu yang lebih lengkap untuk acara spesial Anda.',

    title: 'Isi menu',

    items: [

      'Nasi',

      'Daging kambing / sapi',

      'Sup / tumisan',

      'Sambal goreng kentang',

      'Kerupuk',

      'Sambal',

      'Air minum'

    ]

  },


  {
    id: 'snack',

    icon: '🍬',

    name: 'Snack',

    short: 'Snack',

    price: 10000,

    from: false,

    unit: 'paket',

    desc:
      'Pilihan snack praktis untuk melengkapi acara Anda.',

    title: 'Isi paket',

    items: [

      'Jajanan Chiki — 3 varian',

      'Permen',

      'Air minum'

    ]

  }

];


/* =========================================================
   3. BOOKING DATA
========================================================= */

/*
  PENTING:

  Ini masih DATA CONTOH.

  Sebelum website resmi dipublikasikan,
  ganti dengan booking nyata.

  Contoh:

  {
    date: '2026-11-15',
    services: ['mc-ultah'],
    status: 'Terkonfirmasi'
  }

*/

const BOOKINGS = [

  {
    date: '2026-10-17',
    services: [
      'mc-ultah',
      'fotografer'
    ],
    status: 'Terkonfirmasi'
  },

  {
    date: '2026-10-24',
    services: [
      'mc-lamaran'
    ],
    status: 'Terkonfirmasi'
  },

  {
    date: '2026-10-31',
    services: [
      'catering-2',
      'snack'
    ],
    status: 'Terkonfirmasi'
  }

];


/* =========================================================
   4. UTILITIES
========================================================= */

const $ = (
  selector,
  root = document
) => root.querySelector(selector);


const $$ = (
  selector,
  root = document
) => Array.from(
  root.querySelectorAll(selector)
);


const byId = id =>
  SERVICES.find(
    service => service.id === id
  );


const rupiah = value =>
  'Rp' +
  Math.round(value)
    .toLocaleString('id-ID');


const pad = value =>
  String(value).padStart(2, '0');


const toISO = (
  year,
  month,
  day
) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;


const MONTHS = [

  'Januari',

  'Februari',

  'Maret',

  'April',

  'Mei',

  'Juni',

  'Juli',

  'Agustus',

  'September',

  'Oktober',

  'November',

  'Desember'

];


const DAYS = [

  'Minggu',

  'Senin',

  'Selasa',

  'Rabu',

  'Kamis',

  'Jumat',

  'Sabtu'

];


function formatDateID(iso) {

  const [
    year,
    month,
    day
  ] =
    iso.split('-')
      .map(Number);

  const date =
    new Date(
      year,
      month - 1,
      day
    );

  return `${DAYS[date.getDay()]}, ${day} ${MONTHS[month - 1]} ${year}`;

}


function createElement(
  tag,
  props = {},
  ...children
) {

  const element =
    document.createElement(tag);

  Object.entries(props)
    .forEach(([key, value]) => {

      if (key === 'class') {

        element.className = value;

      } else if (key === 'text') {

        element.textContent = value;

      } else {

        element.setAttribute(
          key,
          value
        );

      }

    });

  children.forEach(child => {

    if (child) {

      element.append(child);

    }

  });

  return element;

}


const now = new Date();

const TODAY_ISO =
  toISO(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );


/* =========================================================
   5. HEADER / NAVIGATION
========================================================= */

(function initNavigation() {

  const toggle =
    $('#nav-toggle');

  const nav =
    $('#nav');

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener(
    'click',
    () => {

      const opened =
        nav.classList.toggle('open');

      toggle.setAttribute(
        'aria-expanded',
        String(opened)
      );

    }
  );


  $$('a', nav)
    .forEach(link => {

      link.addEventListener(
        'click',
        () => {

          nav.classList.remove('open');

          toggle.setAttribute(
            'aria-expanded',
            'false'
          );

        }
      );

    });


  $('#year').textContent =
    now.getFullYear();


  const waLink =
    $('#wa-link');

  if (waLink) {

    waLink.href =
      `https://wa.me/${CONFIG.whatsapp}`;

  }


  const footerWa =
    $('#footer-wa');

  if (footerWa) {

    footerWa.href =
      `https://wa.me/${CONFIG.whatsapp}`;

  }


  const payAccount =
    $('#pay-account');

  if (payAccount) {

    payAccount.textContent =
      CONFIG.accountInfo;

  }

})();


/* =========================================================
   6. SERVICE CARDS
========================================================= */

(function renderServices() {

  const grid =
    $('#service-grid');

  if (!grid) {
    return;
  }

  SERVICES.forEach(service => {

    const priceText =
      (
        service.from
          ? 'Mulai dari '
          : ''
      ) +
      rupiah(service.price) +
      (
        service.unit
          ? ` / ${service.unit}`
          : ''
      );


    const list =
      createElement(
        'ul',
        {
          class: 'check-list'
        }
      );


    service.items.forEach(item => {

      list.append(
        createElement(
          'li',
          {
            text: item
          }
        )
      );

    });


    const card =
      createElement(
        'article',
        {
          class:
            'card service-card'
        },

        createElement(
          'div',
          {
            class:
              'service-icon',
            'aria-hidden':
              'true',
            text:
              service.icon
          }
        ),

        createElement(
          'h3',
          {
            text:
              service.name
          }
        ),

        createElement(
          'p',
          {
            class:
              'price',
            text:
              priceText
          }
        ),

        createElement(
          'p',
          {
            class:
              'service-desc',
            text:
              service.desc
          }
        ),

        createElement(
          'h4',
          {
            text:
              service.title
          }
        ),

        list,

        createElement(
          'a',
          {
            class:
              'btn btn-outline',
            href:
              '#booking',
            'data-pick':
              service.id,
            text:
              'Pesan layanan ini →'
          }
        )

      );


    grid.append(card);

  });


  grid.addEventListener(
    'click',
    event => {

      const button =
        event.target.closest(
          '[data-pick]'
        );

      if (!button) {
        return;
      }

      setServiceChecked(
        button.dataset.pick,
        true
      );

    }
  );

})();


/* =========================================================
   7. BOOKING FORM
========================================================= */

const orderForm =
  $('#order-form');

const dateInput =
  $('#event-date');


if (dateInput) {

  dateInput.min =
    TODAY_ISO;

}


/* =========================================================
   SERVICE OPTIONS
========================================================= */

(function renderServiceOptions() {

  const wrap =
    $('#service-options');

  if (!wrap) {
    return;
  }


  SERVICES.forEach(service => {

    const label =
      createElement(
        'label',
        {
          class:
            'pick',
          'data-id':
            service.id
        }
      );


    const checkbox =
      createElement(
        'input',
        {
          type:
            'checkbox',
          value:
            service.id,
          name:
            'service'
        }
      );


    const info =
      createElement(
        'span',
        {},

        createElement(
          'span',
          {
            class:
              'p-name',
            text:
              service.name
          }
        ),

        createElement(
          'span',
          {
            class:
              'p-price',
            text:
              (
                service.from
                  ? 'Mulai dari '
                  : ''
              ) +
              rupiah(service.price) +
              (
                service.unit
                  ? ` / ${service.unit}`
                  : ''
              )
          }
        )

      );


    label.append(
      checkbox,
      info
    );


    if (service.unit) {

      const quantity =
        createElement(
          'span',
          {
            class:
              'qty'
          }
        );


      quantity.append(
        document.createTextNode(
          'Jumlah'
        )
      );


      quantity.append(
        createElement(
          'input',
          {
            type:
              'number',
            min:
              '1',
            max:
              '2000',
            value:
              '50',
            'aria-label':
              `Jumlah ${service.unit} ${service.name}`
          }
        )
      );


      label.append(quantity);

    }


    wrap.append(label);

  });


  wrap.addEventListener(
    'change',
    updateSummary
  );


  wrap.addEventListener(
    'input',
    updateSummary
  );


  const reviewService =
    $('#rv-service');

  if (reviewService) {

    reviewService.append(

      createElement(
        'option',
        {
          value:
            '',
          disabled:
            '',
          selected:
            '',
          text:
            'Pilih layanan'
        }
      )

    );


    SERVICES.forEach(service => {

      reviewService.append(

        createElement(
          'option',
          {
            value:
              service.name,
            text:
              service.name
          }
        )

      );

    });


    reviewService.append(

      createElement(
        'option',
        {
          value:
            'Lebih dari satu layanan',
          text:
            'Lebih dari satu layanan'
        }
      )

    );

  }

})();


/* =========================================================
   SERVICE SELECTION
========================================================= */

function setServiceChecked(
  id,
  checked
) {

  const row =
    document.querySelector(
      `.pick[data-id="${id}"]`
    );

  if (!row) {
    return;
  }

  const checkbox =
    row.querySelector(
      'input[type="checkbox"]'
    );

  checkbox.checked =
    checked;

  updateSummary();

}


function getSelection() {

  return $$('.pick')

    .filter(row => {

      const checkbox =
        row.querySelector(
          'input[type="checkbox"]'
        );

      return checkbox &&
        checkbox.checked;

    })

    .map(row => {

      const service =
        byId(row.dataset.id);

      let quantity = 1;


      if (service.unit) {

        const input =
          row.querySelector(
            '.qty input'
          );

        quantity =
          Math.max(
            1,
            Math.min(
              2000,
              parseInt(
                input.value,
                10
              ) || 1
            )
          );

      }


      return {

        service,

        qty:
          quantity,

        line:
          service.price *
          quantity

      };

    });

}


/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updateSummary() {

  const rows =
    $$('.pick');

  rows.forEach(row => {

    const checkbox =
      row.querySelector(
        'input[type="checkbox"]'
      );

    row.classList.toggle(
      'on',
      checkbox.checked
    );

  });


  const selection =
    getSelection();


  const summaryList =
    $('#summary-list');

  summaryList.replaceChildren();


  if (!selection.length) {

    summaryList.append(

      createElement(
        'li',
        {
          class:
            'muted',
          text:
            'Belum ada layanan dipilih.'
        }
      )

    );

  }


  selection.forEach(
    ({
      service,
      qty,
      line
    }) => {

      const left =
        service.unit
          ? `${service.name} × ${qty} ${service.unit}`
          : service.name;


      summaryList.append(

        createElement(
          'li',
          {},

          createElement(
            'span',
            {
              text:
                left
            }
          ),

          createElement(
            'span',
            {
              text:
                (
                  service.from
                    ? '≥ '
                    : ''
                ) +
                rupiah(line)
            }
          )

        )

      );

    }
  );


  const subtotal =
    selection.reduce(
      (total, item) =>
        total + item.line,
      0
    );


  const promo =
    selection.length >=
    CONFIG.promoMinServices;


  const discount =
    promo
      ? subtotal *
        CONFIG.promoDiscount
      : 0;


  const total =
    subtotal -
    discount;


  $('#sum-subtotal')
    .textContent =
    rupiah(subtotal);


  $('#sum-discount-row')
    .hidden =
    !promo;


  $('#sum-discount')
    .textContent =
    '-' +
    rupiah(discount);


  $('#sum-total')
    .textContent =
    rupiah(total);


  const hasFrom =
    selection.some(
      item =>
        item.service.from
    );


  $('#sum-note')
    .textContent =
    promo

      ? 'Promo 10% aktif karena Anda memilih minimal 2 layanan. Harga final dikonfirmasi admin.'

      : 'Pilih minimal 2 layanan untuk mendapatkan diskon 10%.' +
        (
          hasFrom
            ? ' Layanan MC berstatus "mulai dari".'
            : ''
        );

}


/* =========================================================
   DATE CHECK
========================================================= */

if (dateInput) {

  dateInput.addEventListener(
    'change',
    () => {

      const hint =
        $('#date-hint');

      if (!dateInput.value) {

        hint.textContent =
          '';

        return;

      }


      const found =
        BOOKINGS.filter(
          booking =>
            booking.date ===
            dateInput.value
        );


      hint.classList.toggle(
        'warn-text',
        found.length > 0
      );


      if (found.length) {

        const serviceNames = [

          ...new Set(

            found.flatMap(
              booking =>
                booking.services
                  .map(
                    id =>
                      byId(id)?.short
                  )
                  .filter(Boolean)
            )

          )

        ];


        hint.textContent =
          'Tanggal ini sudah memiliki booking: ' +
          serviceNames.join(', ') +
          '. Admin akan mengonfirmasi ketersediaan.';

      } else {

        hint.textContent =
          'Tanggal ini masih kosong.';

      }

    }
  );

}


/* =========================================================
   SUBMIT BOOKING
========================================================= */

if (orderForm) {

  orderForm.addEventListener(
    'submit',
    event => {

      event.preventDefault();


      const error =
        $('#form-error');


      const name =
        $('#client-name')
          .value
          .trim();


      const phone =
        $('#client-phone')
          .value
          .trim();


      const type =
        $('#event-type')
          .value;


      const date =
        dateInput.value;


      const notes =
        $('#event-notes')
          .value
          .trim();


      const selection =
        getSelection();


      const problems = [];


      if (!name) {

        problems.push(
          'nama lengkap'
        );

      }


      if (
        !/^[0-9+\-\s()]{8,}$/
          .test(phone)
      ) {

        problems.push(
          'nomor WhatsApp yang valid'
        );

      }


      if (!type) {

        problems.push(
          'jenis acara'
        );

      }


      if (!date) {

        problems.push(
          'tanggal acara'
        );

      } else if (
        date < TODAY_ISO
      ) {

        problems.push(
          'tanggal acara yang belum lewat'
        );

      }


      if (!selection.length) {

        problems.push(
          'minimal satu layanan'
        );

      }


      if (problems.length) {

        error.textContent =
          'Mohon lengkapi: ' +
          problems.join(', ') +
          '.';

        error.hidden =
          false;

        return;

      }


      error.hidden =
        true;


      const subtotal =
        selection.reduce(
          (total, item) =>
            total + item.line,
          0
        );


      const promo =
        selection.length >=
        CONFIG.promoMinServices;


      const discount =
        promo
          ? subtotal *
            CONFIG.promoDiscount
          : 0;


      const total =
        subtotal -
        discount;


      const serviceLines =
        selection.map(
          ({
            service,
            qty,
            line
          }) => {

            return (
              `- ${service.name}` +

              (
                service.unit
                  ? ` × ${qty} ${service.unit}`
                  : ''
              ) +

              `: ${service.from ? 'mulai ' : ''}${rupiah(line)}`
            );

          }
        );


      const message = [

        'Halo IRR Event Organizer, saya ingin melakukan booking.',

        '',

        `Nama: ${name}`,

        `WhatsApp: ${phone}`,

        `Jenis acara: ${type}`,

        `Tanggal acara: ${formatDateID(date)}`,

        '',

        'LAYANAN:',

        ...serviceLines,

        '',

        `Subtotal: ${rupiah(subtotal)}`,

        promo
          ? `Diskon promo 10%: -${rupiah(discount)}`
          : '',

        `Estimasi total: ${rupiah(total)}`,

        '',

        notes
          ? `Catatan: ${notes}`
          : '',

        '',

        'Mohon konfirmasi ketersediaan tanggal dan detail penawaran.',

        'Terima kasih.'

      ]

        .filter(Boolean)

        .join('\n');


      const whatsappUrl =
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;


      window.open(
        whatsappUrl,
        '_blank',
        'noopener,noreferrer'
      );

    }
  );

}


/* =========================================================
   8. CALENDAR
========================================================= */

(function initCalendar() {

  const grid =
    $('#days-grid');

  if (!grid) {
    return;
  }


  let year =
    now.getFullYear();


  let month =
    now.getMonth();


  let selected =
    null;


  const title =
    $('#month-year');


  const detail =
    $('#day-detail');


  function bookingsOn(date) {

    return BOOKINGS.filter(
      booking =>
        booking.date === date
    );

  }


  function servicesOn(date) {

    return [

      ...new Set(

        bookingsOn(date)
          .flatMap(
            booking =>
              booking.services
          )

      )

    ];

  }


  function render() {

    title.textContent =
      `${MONTHS[month]} ${year}`;


    grid.replaceChildren();


    const firstDay =
      new Date(
        year,
        month,
        1
      ).getDay();


    const totalDays =
      new Date(
        year,
        month + 1,
        0
      ).getDate();


    for (
      let i = 0;
      i < firstDay;
      i++
    ) {

      grid.append(

        createElement(
          'div',
          {
            class:
              'cal-cell empty',
            'aria-hidden':
              'true'
          }
        )

      );

    }


    for (
      let day = 1;
      day <= totalDays;
      day++
    ) {

      const iso =
        toISO(
          year,
          month,
          day
        );


      const services =
        servicesOn(iso);


      const classes =
        [
          'cal-cell'
        ];


      if (iso < TODAY_ISO) {

        classes.push(
          'past'
        );

      }


      if (iso === TODAY_ISO) {

        classes.push(
          'today'
        );

      }


      if (services.length) {

        classes.push(
          'booked'
        );

      }


      if (iso === selected) {

        classes.push(
          'selected'
        );

      }


      const label =
        `${formatDateID(iso)}. ` +
        (
          services.length

            ? 'Booking: ' +
              services
                .map(
                  id =>
                    byId(id)?.short
                )
                .filter(Boolean)
                .join(', ')

            : 'Kosong'
        );


      const cell =
        createElement(
          'button',
          {
            class:
              classes.join(' '),
            type:
              'button',
            'data-date':
              iso,
            'aria-label':
              label
          },

          createElement(
            'span',
            {
              class:
                'num',
              text:
                String(day)
            }
          )

        );


      services
        .slice(0, 2)
        .forEach(id => {

          const service =
            byId(id);

          if (!service) {
            return;
          }

          cell.append(

            createElement(
              'span',
              {
                class:
                  'tag',
                text:
                  service.short
              }
            )

          );

        });


      if (services.length > 2) {

        cell.append(

          createElement(
            'span',
            {
              class:
                'tag more',
              text:
                `+${services.length - 2}`
            }
          )

        );

      }


      grid.append(cell);

    }

  }


  function showDetail(iso) {

    detail.replaceChildren();


    detail.append(

      createElement(
        'div',
        {
          class:
            'detail-icon',
          text:
            '📅'
        }
      ),

      createElement(
        'p',
        {
          class:
            'eyebrow',
          text:
            'DETAIL TANGGAL'
        }
      ),

      createElement(
        'h3',
        {
          text:
            formatDateID(iso)
        }
      )

    );


    const bookings =
      bookingsOn(iso);


    if (!bookings.length) {

      detail.append(

        createElement(
          'p',
          {
            class:
              'muted',
            text:
              'Belum ada booking pada tanggal ini.'
          }
        )

      );

    } else {

      bookings.forEach(
        booking => {

          const names =
            booking.services
              .map(
                id =>
                  byId(id)?.name
              )
              .filter(Boolean)
              .join(' + ');


          detail.append(

            createElement(
              'div',
              {
                class:
                  'detail-item'
              },

              createElement(
                'strong',
                {
                  text:
                    names
                }
              ),

              createElement(
                'span',
                {
                  class:
                    'status',
                  text:
                    booking.status ||
                    'Terkonfirmasi'
                }
              )

            )

          );

        }
      );


      detail.append(

        createElement(
          'p',
          {
            class:
              'fine',
            text:
              'Satu tanggal dapat digunakan untuk beberapa layanan. Hubungi admin untuk memastikan ketersediaan.'
          }
        )

      );

    }


    if (iso >= TODAY_ISO) {

      const button =
        createElement(
          'button',
          {
            class:
              'btn btn-primary',
            type:
              'button',
            text:
              'Booking tanggal ini →'
          }
        );


      button.addEventListener(
        'click',
        () => {

          dateInput.value =
            iso;


          dateInput.dispatchEvent(
            new Event(
              'change'
            )
          );


          $('#booking')
            .scrollIntoView({
              behavior:
                'smooth'
            });

        }
      );


      detail.append(button);

    }

  }


  grid.addEventListener(
    'click',
    event => {

      const cell =
        event.target.closest(
          '.cal-cell[data-date]'
        );


      if (!cell) {
        return;
      }


      selected =
        cell.dataset.date;


      render();

      showDetail(selected);

    }
  );


  $('#prev-month')
    .addEventListener(
      'click',
      () => {

        month--;

        if (month < 0) {

          month = 11;

          year--;

        }

        render();

      }
    );


  $('#next-month')
    .addEventListener(
      'click',
      () => {

        month++;

        if (month > 11) {

          month = 0;

          year++;

        }

        render();

      }
    );


  render();

})();


/* =========================================================
   9. REVIEWS
========================================================= */

(function initReviews() {

  const KEY =
    'irr_reviews_v2';


  const list =
    $('#review-list');


  const form =
    $('#review-form');


  const text =
    $('#rv-text');


  if (!list || !form) {
    return;
  }


  function loadReviews() {

    try {

      return JSON.parse(
        localStorage.getItem(KEY)
      ) || [];

    } catch {

      return [];

    }

  }


  function saveReview(review) {

    const reviews =
      loadReviews();


    reviews.unshift(review);


    try {

      localStorage.setItem(
        KEY,
        JSON.stringify(
          reviews.slice(0, 100)
        )
      );

      return true;

    } catch {

      return false;

    }

  }


  function starsNode(rating) {

    const wrapper =
      createElement(
        'span',
        {
          class:
            'stars',
          'aria-label':
            `${rating} dari 5 bintang`
        }
      );


    for (
      let i = 1;
      i <= 5;
      i++
    ) {

      wrapper.append(

        createElement(
          'span',
          {
            class:
              i <= rating
                ? ''
                : 'off',
            text:
              '★',
            'aria-hidden':
              'true'
          }
        )

      );

    }


    return wrapper;

  }


  function render() {

    const reviews =
      loadReviews();


    list.replaceChildren();


    const summary =
      $('#rating-summary');


    summary.hidden =
      !reviews.length;


    if (!reviews.length) {

      list.append(

        createElement(
          'div',
          {
            class:
              'empty-state',
            text:
              'Belum ada ulasan. Jadilah pelanggan pertama yang memberikan ulasan!'
          }
        )

      );

      return;

    }


    const average =
      reviews.reduce(
        (total, review) =>
          total + review.rating,
        0
      ) /
      reviews.length;


    $('#avg-score')
      .textContent =
      average.toFixed(1);


    $('#avg-stars')
      .replaceChildren(
        starsNode(
          Math.round(
            average
          )
        )
      );


    $('#avg-count')
      .textContent =
      `${reviews.length} ulasan`;


    reviews.forEach(review => {

      const date =
        new Date(
          review.createdAt
        );


      const dateText =
        `${date.getDate()} ` +
        `${MONTHS[date.getMonth()]} ` +
        `${date.getFullYear()}`;


      const article =
        createElement(
          'article',
          {
            class:
              'review'
          }
        );


      const top =
        createElement(
          'div',
          {
            class:
              'review-top'
          }
        );


      top.append(

        createElement(
          'div',
          {
            class:
              'avatar',
            'aria-hidden':
              'true',
            text:
              (
                review.name?.[0] ||
                '?'
              ).toUpperCase()
          }
        ),

        createElement(
          'div',
          {},

          createElement(
            'strong',
            {
              text:
                review.name
            }
          ),

          createElement(
            'small',
            {
              text:
                `${review.service} · ${dateText}`
            }
          )

        )

      );


      article.append(
        top,

        starsNode(
          review.rating
        ),

        createElement(
          'p',
          {
            text:
              review.text
          }
        )

      );


      list.append(article);

    });

  }


  text.addEventListener(
    'input',
    () => {

      $('#rv-count')
        .textContent =
        text.value.length;

    }
  );


  form.addEventListener(
    'submit',
    event => {

      event.preventDefault();


      const error =
        $('#rv-error');


      const name =
        $('#rv-name')
          .value
          .trim();


      const service =
        $('#rv-service')
          .value;


      const rating =
        $('input[name="rating"]:checked', form);


      const body =
        text.value.trim();


      const problems = [];


      if (!name) {

        problems.push(
          'nama'
        );

      }


      if (!service) {

        problems.push(
          'layanan'
        );

      }


      if (!rating) {

        problems.push(
          'penilaian bintang'
        );

      }


      if (
        body.length < 10
      ) {

        problems.push(
          'ulasan minimal 10 karakter'
        );

      }


      if (problems.length) {

        error.textContent =
          'Mohon lengkapi: ' +
          problems.join(', ') +
          '.';

        error.hidden =
          false;

        return;

      }


      error.hidden =
        true;


      const success =
        saveReview({

          name,

          service,

          rating:
            Number(
              rating.value
            ),

          text:
            body,

          createdAt:
            Date.now()

        });


      if (!success) {

        error.textContent =
          'Ulasan tidak dapat disimpan. Silakan coba kembali.';

        error.hidden =
          false;

        return;

      }


      form.reset();


      $('#rv-count')
        .textContent =
        '0';


      render();


      list.scrollIntoView({
        behavior:
          'smooth',
        block:
          'start'
      });

    }
  );


  render();

})();


/* =========================================================
   10. INITIAL STATE
========================================================= */

updateSummary();


/* =========================================================
   11. CONSOLE INFORMATION
========================================================= */

console.log(
  '%cIRR Event Organizer V2',
  'font-size:18px;font-weight:bold;color:#913bb2'
);

console.log(
  'Website berhasil dimuat.'
);
