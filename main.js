// Navigation: sitzt unter der Demo-Leiste, rutscht beim Scrollen mit; ab dem Scrollen weiß
const nav = document.getElementById('nav');
const demo = document.querySelector('.demo');
const navPruefen = () => {
  const h = demo ? demo.offsetHeight : 0;
  document.documentElement.style.setProperty('--demo-h', h + 'px');
  nav.style.top = Math.max(0, h - scrollY) + 'px';
  nav.classList.toggle('scrolled', scrollY > h + 40);
};
addEventListener('scroll', navPruefen, { passive: true });
addEventListener('resize', navPruefen);
navPruefen();

// Mobilmenü
const burger = document.getElementById('burger'), menu = document.getElementById('menu');
const menuSetzen = offen => {
  menu.classList.toggle('open', offen);
  nav.classList.toggle('menu-open', offen);
  burger.setAttribute('aria-expanded', offen);
  burger.setAttribute('aria-label', offen ? 'Close menu' : 'Open menu');
  const [a, b] = burger.children;
  a.style.transform = offen ? 'translateY(3.75px) rotate(45deg)' : '';
  b.style.transform = offen ? 'translateY(-3.75px) rotate(-45deg)' : '';
  document.body.style.overflow = offen ? 'hidden' : '';
};
burger.addEventListener('click', () => menuSetzen(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuSetzen(false)));

// Saison-Tabs
const tabs = document.querySelectorAll('.season-tabs button');
const saisons = document.querySelectorAll('.season');
tabs.forEach(t => t.addEventListener('click', () => {
  tabs.forEach(x => x.setAttribute('aria-selected', x === t));
  saisons.forEach(s => s.classList.toggle('on', s.dataset.s === t.dataset.s));
}));
// Aktuelle Jahreszeit vorwählen (Nordhalbkugel)
const m = new Date().getMonth();
const jetzt = m >= 2 && m <= 4 ? 0 : m >= 5 && m <= 7 ? 1 : m >= 8 && m <= 10 ? 2 : 3;
tabs[jetzt].click();

// Leistungs-Kacheln wählen im Formular gleich die passende Leistung vor
document.querySelectorAll('[data-service]').forEach(a => a.addEventListener('click', () => {
  const box = document.querySelector(`#form input[value="${a.dataset.service}"]`);
  if (box) box.checked = true;
}));

// Einblenden beim Scrollen
document.querySelectorAll('.card, .masonry figure, .steps li, .season-stage').forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
