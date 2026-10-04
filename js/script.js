let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// Swiper Home Slider
var homeSwiper = new Swiper(".home-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: { rotate: 0, stretch: 0, depth: 100, modifier: 2, slideShadows: true },
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false }
});

// Swiper Review Slider
var reviewSwiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
        0: { slidesPerView: 1 },
        700: { slidesPerView: 2 },
        1050: { slidesPerView: 3 },
    },
    autoplay: { delay: 5000, disableOnInteraction: false }
});

// Kalender Ketersediaan
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
let currentMonth = 9; // Oktober 2026
let currentYear = 2026;
const bookedDates = ["2026-10-10", "2026-10-15", "2026-10-20", "2026-10-25"];

function renderCalendar() {
    const grid = document.getElementById("days-grid");
    const monthYearEl = document.getElementById("month-year");
    if (!grid || !monthYearEl) return;

    grid.innerHTML = "";
    monthYearEl.innerText = `${months[currentMonth]} ${currentYear}`;

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        let emptyDiv = document.createElement("div");
        grid.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("day-cell");
        dayCell.innerText = day;

        let formattedMonth = String(currentMonth + 1).padStart(2, '0');
        let formattedDay = String(day).padStart(2, '0');
        let dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;

        if (bookedDates.includes(dateString)) {
            dayCell.classList.add("booked");
            dayCell.title = "Sudah Penuh";
        } else {
            dayCell.classList.add("available");
            dayCell.title = "Tersedia";
            dayCell.onclick = () => {
                document.getElementById("event-date").value = dateString;
                document.getElementById("booking")?.scrollIntoView({ behavior: 'smooth' });
            };
        }
        grid.appendChild(dayCell);
    }
}

document.getElementById("prev-month")?.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
});

document.getElementById("next-month")?.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
});

renderCalendar();

// Form Pemesanan ke WhatsApp
document.getElementById("order-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("client-name").value;
    let phone = document.getElementById("client-phone").value;
    let pkg = document.getElementById("package-choice").value;
    let date = document.getElementById("event-date").value;
    let notes = document.getElementById("event-notes").value;

    let message = `Halo Admin, saya ingin memesan paket Event Organizer:%0A` +
                  `- Nama: *${name}*%0A` +
                  `- No WhatsApp: *${phone}*%0A` +
                  `- Pilihan Paket: *${pkg}*%0A` +
                  `- Tanggal Acara: *${date}*%0A` +
                  `- Catatan: ${notes}%0A%0A` +
                  `Saya sudah melakukan transfer DP / cek pembayaran. Mohon konfirmasinya. Terima kasih!`;

    let waNumber = "6281234567890"; // Ganti dengan nomor WhatsApp Anda
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
});
