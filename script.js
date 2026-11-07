const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.textContent=open?'×':'☰'});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.getElementById('year').textContent=new Date().getFullYear();
// v17: catch detail modal with verified metadata fields and website sharing
(() => {
  const modal = document.getElementById('catch-modal');
  if (!modal) return;
  const title = document.getElementById('catch-modal-title');
  const description = document.getElementById('catch-modal-description');
  const image = document.getElementById('catch-modal-image');
  const meta = document.getElementById('catch-modal-meta');
  const fields = [
    ['Jenis ikan', 'species'],
    ['Berat', 'weight'],
    ['Tanggal', 'date'],
    ['Lokasi', 'location'],
    ['Teknik', 'technique'],
    ['Umpan', 'bait']
  ];
  const openModal = (card) => {
    title.textContent = card.dataset.title || 'Fishing Catch';
    description.textContent = card.dataset.description || '';
    image.src = card.dataset.image || '';
    image.alt = title.textContent;
    if (meta) {
      meta.replaceChildren();
      fields.forEach(([label, key]) => {
        const item = document.createElement('div');
        const term = document.createElement('dt');
        const value = document.createElement('dd');
        term.textContent = label;
        value.textContent = card.dataset[key] || 'Belum diisi';
        item.append(term, value);
        meta.append(item);
      });
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.catch-modal-close').focus();
  };
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.catch-open').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
  const shareButton = document.getElementById('native-share');
  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const shareData = {
        title: 'ALI MUSTOFA – Content Creator Fishing',
        text: 'Jelajahi portfolio dan petualangan memancing ALI MUSTOFA.',
        url: 'https://felyn95.github.io/ali-mustofa/'
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (error) { /* user cancelled share */ }
      } else {
        window.open('https://wa.me/?text=' + encodeURIComponent(shareData.text + ' ' + shareData.url), '_blank', 'noopener');
      }
    });
  }
})();
