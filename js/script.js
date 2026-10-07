// --- FITUR DARK / LIGHT MODE ---
const themeToggle = $('#theme-toggle');
const themeIcon = $('.theme-icon', themeToggle);
const htmlEl = document.documentElement;

// Cek memori/prefrensi tersimpan
const savedTheme = localStorage.getItem('irr_theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('irr_theme', next);
  themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});
