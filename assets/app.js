// Redfox sin verden – henter alt innhold fra data/site.json og tegner siden.

(() => {
  const UI = {
    no: {
      nav_home: 'Hjem', nav_music: 'Musikk', nav_about: 'Om Redfox', nav_gallery: 'Bilder',
      hello: 'Hei, og velkommen inn', play_all: 'Spill alt', random_song: 'Tilfeldig sang',
      albums: 'Album', album: 'album', songs: 'sanger', song: 'sang', hours: 'timer musikk', minutes: 'min',
      all_albums: '← Alle album', more_albums: 'Flere album', play: 'Spill av', pause: 'Pause', shuffle_play: 'Bland',
      prev: 'Forrige', next: 'Neste', shuffle: 'Bland rekkefølgen', repeat_off: 'Gjenta: av', repeat_all: 'Gjenta: alle', repeat_one: 'Gjenta: denne sangen',
      queue: 'Vis køen', up_next: 'Neste', close_player: 'Lukk spilleren', volume: 'Lydstyrke', seek: 'Spol',
      music: 'Musikk', music_lead: 'Alle albumene til Redfox. Søk etter en sang, eller trykk på et album.',
      search: 'Søk etter sang eller album …', results: 'treff', no_results: 'Fant ingenting. Prøv et annet ord.',
      about: 'Om Redfox', personal: 'Personlig profil', fursona: 'Fursona', palette: 'Farger', palette_hint: 'Trykk på en farge for å kopiere den',
      more_about: 'Mer om Redfox', gallery: 'Bilder', no_images: 'Ingen bilder her ennå.',
      copied: 'Kopiert', not_found: 'Fant ikke den siden.', go_home: 'Til forsiden',
      load_error: 'Klarte ikke å laste innholdet. Prøv å laste siden på nytt.',
      to_light: 'Bytt til lyst tema', to_dark: 'Bytt til mørkt tema', menu: 'Meny', made_with: 'Laget med',
    },
    en: {
      nav_home: 'Home', nav_music: 'Music', nav_about: 'About Redfox', nav_gallery: 'Pictures',
      hello: 'Hi, and welcome in', play_all: 'Play all', random_song: 'Random song',
      albums: 'Albums', album: 'albums', songs: 'songs', song: 'song', hours: 'hours of music', minutes: 'min',
      all_albums: '← All albums', more_albums: 'More albums', play: 'Play', pause: 'Pause', shuffle_play: 'Shuffle',
      prev: 'Previous', next: 'Next', shuffle: 'Shuffle', repeat_off: 'Repeat: off', repeat_all: 'Repeat: all', repeat_one: 'Repeat: this song',
      queue: 'Show queue', up_next: 'Up next', close_player: 'Close player', volume: 'Volume', seek: 'Seek',
      music: 'Music', music_lead: "All of Redfox's albums. Search for a song, or tap an album.",
      search: 'Search for a song or album …', results: 'results', no_results: 'Nothing found. Try another word.',
      about: 'About Redfox', personal: 'Personal profile', fursona: 'Fursona', palette: 'Colours', palette_hint: 'Tap a colour to copy it',
      more_about: 'More about Redfox', gallery: 'Pictures', no_images: 'No pictures here yet.',
      copied: 'Copied', not_found: "Couldn't find that page.", go_home: 'Go home',
      load_error: "Couldn't load the content. Try reloading the page.",
      to_light: 'Switch to light theme', to_dark: 'Switch to dark theme', menu: 'Menu', made_with: 'Made with',
    },
  };

  const store = {
    get(k) { try { return localStorage.getItem('rf-' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('rf-' + k, v); } catch (e) {} },
  };

  let data = null;
  let lang = store.get('lang') === 'en' ? 'en' : 'no';

  const $ = (s, el = document) => el.querySelector(s);
  const main = $('#main');
  const t = (key) => UI[lang][key] || key;
  const tr = (v) => (v && typeof v === 'object') ? (v[lang] || v.no || v.en || '') : (v || '');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeColor = (c, fallback = '#ff5b2e') => /^#[0-9a-f]{3,8}$/i.test(c || '') ? c : fallback;
  const paragraphs = (text) => esc(text).split(/\n\s*\n/).filter((p) => p.trim()).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  const fold = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');

  const fmt = (sec) => {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };
  const totalMin = (tracks) => Math.round(tracks.reduce((n, tk) => n + (+tk.duration || 0), 0) / 60);

  // ---------- Data ----------
  // Bare album med minst én lydfil vises. Sporene filtreres likt overalt, så nummereringen stemmer.

  const playable = (album) => (album.tracks || []).filter((tk) => tk.src);
  const albums = () => ((data && data.music && data.music.albums) || []).filter((a) => playable(a).length);
  const ref = (album, ti) => ({ album, ti, track: playable(album)[ti], key: `${album.id}:${ti}` });
  const albumRefs = (album) => playable(album).map((_, ti) => ref(album, ti));
  const allRefs = () => albums().flatMap(albumRefs);
  const visibleChars = () => (data.characters || []).filter((c) => c.status !== 'hidden');
  const trackTitle = (r) => r.track.title || `${t('song')} ${r.ti + 1}`;

  // ---------- Album-cover ----------
  // Album uten eget bilde får et cover laget av albumnavnet og en egen fargekombinasjon.

  const COVER_COLORS = [
    ['#ff5b2e', '#ffb347'], ['#2ee59d', '#11707f'], ['#4c6fff', '#22c3d6'], ['#ff3d6e', '#6b2cff'],
    ['#ffcf3f', '#ff6a1a'], ['#22c3d6', '#0f3566'], ['#a35cff', '#ff5b2e'], ['#e8401c', '#4a1608'], ['#3ddc97', '#3f5bff'],
  ];
  const hash = (s) => [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

  function coverSVG(album) {
    const all = (data.music.albums || []);
    const idx = all.indexOf(album);
    const [c1, c2] = COVER_COLORS[(idx >= 0 ? idx : hash(album.id)) % COVER_COLORS.length];
    const words = tr(album.title).split(/\s+/);
    const lines = [];
    for (const w of words) {
      const last = lines[lines.length - 1];
      if (last && (last + ' ' + w).length <= 11) lines[lines.length - 1] = last + ' ' + w;
      else lines.push(w);
    }
    const shown = lines.slice(0, 4);
    const size = Math.max(...shown.map((l) => l.length)) > 9 ? 30 : 36;
    const gid = 'g' + hash(album.id + c1);
    const y0 = 262 - (shown.length - 1) * (size + 2);
    return `<svg viewBox="0 0 300 300" role="img" aria-label="${esc(tr(album.title))}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#${gid})"/>
      <g fill="none" stroke="#fff" stroke-opacity=".16"><circle cx="236" cy="70" r="40" stroke-width="10"/><circle cx="236" cy="70" r="78" stroke-width="6"/><circle cx="236" cy="70" r="118" stroke-width="3"/></g>
      <g fill="#fff" fill-opacity=".9" transform="translate(28 30) scale(.9)"><ellipse cx="22" cy="34" rx="12" ry="14"/><ellipse cx="44" cy="14" rx="9" ry="11"/><ellipse cx="0" cy="14" rx="9" ry="11"/><ellipse cx="22" cy="2" rx="8" ry="10" transform="translate(0 -6)"/></g>
      <text x="26" y="104" font-family="Fredoka, sans-serif" font-weight="600" font-size="15" letter-spacing="4" fill="#fff" fill-opacity=".85">REDFOX</text>
      ${shown.map((l, i) => `<text x="24" y="${y0 + i * (size + 2)}" font-family="Fredoka, sans-serif" font-weight="700" font-size="${size}" fill="#fff">${esc(l)}</text>`).join('')}
    </svg>`;
  }
  const coverHTML = (album) => album.cover
    ? `<img src="${esc(album.cover)}" alt="${esc(tr(album.title))}" loading="lazy">`
    : coverSVG(album);

  // ---------- Views ----------

  const countText = (n, one, many) => `${n} ${n === 1 ? t(one) : t(many)}`;

  function albumCard(a) {
    const tracks = playable(a);
    const ai = albums().indexOf(a);
    return `
      <article class="album-card" style="--d:${ai * 40}ms">
        <a class="album-link" href="#/album/${encodeURIComponent(a.id)}">
          <div class="cover">${coverHTML(a)}</div>
          <h3>${esc(tr(a.title))}</h3>
          <p class="muted">${[tr(a.tag), countText(tracks.length, 'song', 'songs'), `${totalMin(tracks)} ${t('minutes')}`].filter(Boolean).map(esc).join(' · ')}</p>
        </a>
        <button class="cover-play" data-play-album="${ai}" aria-label="${t('play')}: ${esc(tr(a.title))}">${ICONS.play}</button>
      </article>`;
  }

  function factsHTML(facts) {
    if (!facts || !facts.length) return '';
    return `<dl class="facts">${facts.map((f) => `
      <div class="fact"><dt>${esc(tr(f.label))}</dt><dd>${esc(tr(f.value))}</dd></div>`).join('')}</dl>`;
  }

  function viewHome() {
    const s = data.site;
    const list = albums();
    const refs = allRefs();
    const hours = refs.reduce((n, r) => n + (+r.track.duration || 0), 0) / 3600;
    const facts = (data.about && data.about.facts) || [];
    const fox = visibleChars()[0];
    return `
      <section class="hero view">
        <div class="hero-text">
          <span class="eyebrow">🦊 ${t('hello')}</span>
          <h1><span class="grad">${esc(tr(s.title))}</span></h1>
          <p class="lead">${esc(tr(s.tagline))}</p>
          ${refs.length ? `
          <div class="btn-row">
            <button class="btn" data-play-all>${ICONS.play} ${t('play_all')}</button>
            <button class="btn ghost" data-random>${ICONS.shuffle} ${t('random_song')}</button>
          </div>
          <div class="stats">
            <div class="stat glass"><b>${list.length}</b><span>${t('album')}</span></div>
            <div class="stat glass"><b>${refs.length}</b><span>${t('songs')}</span></div>
            ${hours >= 1 ? `<div class="stat glass"><b>${(Math.round(hours * 10) / 10).toLocaleString(lang === 'no' ? 'nb-NO' : 'en-GB')}</b><span>${t('hours')}</span></div>` : ''}
          </div>` : ''}
        </div>
        ${s.heroImage ? `<div class="hero-art"><div class="halo"></div><img src="${esc(s.heroImage)}" alt="Redfox" fetchpriority="high"></div>` : ''}
      </section>

      ${list.length ? `
      <div class="section-head view" id="album">
        <h2>${t('albums')}</h2>
        <p class="muted">${esc(tr(s.intro))}</p>
      </div>
      <div class="album-grid view">${list.map(albumCard).join('')}</div>` : ''}

      ${facts.length ? `
      <section class="teaser glass view">
        ${fox && fox.avatar ? `<img class="teaser-img" src="${esc(fox.avatar)}" alt="">` : ''}
        <div>
          <h2>${t('about')}</h2>
          ${factsHTML(facts.slice(1, 4))}
          <a class="btn ghost" href="#/om">${t('more_about')} →</a>
        </div>
      </section>` : ''}`;
  }

  function trackRow(r, n, list) {
    return `
      <li><button class="track" data-key="${esc(r.key)}" data-list="${list}" data-i="${n}">
        <span class="num"><span class="n">${n + 1}</span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span></span>
        <span class="t"><span class="tt">${esc(trackTitle(r))}</span>${list === 'search' ? `<span class="ta">${esc(tr(r.album.title))}</span>` : ''}</span>
        <span class="d">${r.track.duration ? fmt(r.track.duration) : ''}</span>
      </button></li>`;
  }

  let listContext = {}; // navn -> liste med spor, så et klikk vet hva som skal spilles etterpå

  function viewAlbum(id) {
    const list = albums();
    const a = list.find((x) => x.id === id);
    if (!a) return viewNotFound();
    const ai = list.indexOf(a);
    const refs = albumRefs(a);
    listContext.album = refs;
    const others = list.filter((x) => x !== a);
    return `
      <div class="view">
        <a class="back" href="#/musikk">${t('all_albums')}</a>
        <section class="album-hero glass">
          <div class="cover big">${coverHTML(a)}</div>
          <div class="album-info">
            ${tr(a.tag) ? `<span class="tag">${esc(tr(a.tag))}</span>` : ''}
            <h1>${esc(tr(a.title))}</h1>
            <p class="muted">${[a.artist, a.year, countText(refs.length, 'song', 'songs'), `${totalMin(refs.map((r) => r.track))} ${t('minutes')}`].filter(Boolean).map(esc).join(' · ')}</p>
            ${tr(a.description) ? `<div class="album-desc">${paragraphs(tr(a.description))}</div>` : ''}
            <div class="btn-row">
              <button class="btn" data-play-album="${ai}">${ICONS.play} ${t('play')}</button>
              <button class="btn ghost" data-shuffle-album="${ai}">${ICONS.shuffle} ${t('shuffle_play')}</button>
            </div>
          </div>
        </section>
        <ol class="tracklist glass">${refs.map((r, i) => trackRow(r, i, 'album')).join('')}</ol>
        ${others.length ? `
          <div class="section-head"><h2>${t('more_albums')}</h2></div>
          <div class="album-grid small">${others.map(albumCard).join('')}</div>` : ''}
      </div>`;
  }

  let searchQuery = '';
  function searchResults() {
    const q = fold(searchQuery.trim());
    if (!q) return `<div class="album-grid">${albums().map(albumCard).join('')}</div>`;
    const hits = allRefs().filter((r) => fold(trackTitle(r)).includes(q) || fold(tr(r.album.title)).includes(q));
    listContext.search = hits;
    if (!hits.length) return `<div class="empty glass"><span class="emoji">🦊</span><p>${t('no_results')}</p></div>`;
    return `
      <p class="muted result-count">${hits.length} ${t('results')}</p>
      <ol class="tracklist glass">${hits.map((r, i) => trackRow(r, i, 'search')).join('')}</ol>`;
  }

  function viewMusic() {
    return `
      <div class="view">
        <div class="page-head">
          <h1>${t('music')}</h1>
          <p class="muted">${t('music_lead')}</p>
          <label class="search glass">
            ${ICONS.search}
            <input type="search" id="search" placeholder="${t('search')}" value="${esc(searchQuery)}" autocomplete="off" aria-label="${t('search')}">
          </label>
        </div>
        <div id="results">${searchResults()}</div>
      </div>`;
  }

  function viewAbout() {
    const a = data.about || {};
    const facts = a.facts || [];
    const fox = visibleChars();
    const avatar = fox[0] && (fox[0].avatar || fox[0].image);
    return `
      <div class="view">
        <div class="page-head"><h1>${t('about')}</h1></div>
        <div class="about-grid">
          <section class="profile glass">
            ${avatar ? `<img class="avatar" src="${esc(avatar)}" alt="">` : ''}
            <span class="tag">${t('personal')}</span>
            <h2>${esc(tr(facts[0]?.value) || 'Redfox')}</h2>
            ${tr(a.text) ? `<div class="bio">${paragraphs(tr(a.text))}</div>` : ''}
            ${factsHTML(facts.slice(1))}
          </section>
          ${fox.map((c) => {
            const palette = (c.palette || []).filter(Boolean);
            return `
            <section class="profile fursona glass" style="--c:${safeColor(c.accent)}">
              ${c.image ? `<div class="fursona-art"><img src="${esc(c.image)}" alt="${esc(c.name)}"></div>` : ''}
              <span class="tag">${t('fursona')}${tr(c.species) ? ` · ${esc(tr(c.species))}` : ''}</span>
              <h2>${esc(c.name)}</h2>
              ${tr(c.tagline) ? `<p class="tagline">${esc(tr(c.tagline))}</p>` : ''}
              ${tr(c.bio) ? `<div class="bio">${paragraphs(tr(c.bio))}</div>` : ''}
              ${factsHTML(c.facts)}
              ${palette.length ? `
                <h3>${t('palette')}</h3>
                <div class="palette">${palette.map((p) => `
                  <button class="swatch" data-copy="${esc(p)}" style="--sw:${safeColor(p)}" title="${t('palette_hint')}"><span class="c"></span>${esc(p)}</button>`).join('')}
                </div>` : ''}
            </section>`;
          }).join('')}
        </div>
      </div>`;
  }

  function viewGallery() {
    const items = [];
    visibleChars().forEach((c) => (c.gallery || []).forEach((g) => g.src && items.push(g)));
    lbItems = items;
    return `
      <div class="view">
        <div class="page-head"><h1>${t('gallery')}</h1></div>
        ${items.length ? `<div class="gallery">${items.map((g, i) => `
          <figure class="glass" tabindex="0" data-lb="${i}" style="--d:${i * 50}ms">
            <img src="${esc(g.src)}" alt="${esc(tr(g.caption))}" loading="lazy">
            ${tr(g.caption) ? `<figcaption>${esc(tr(g.caption))}</figcaption>` : ''}
          </figure>`).join('')}</div>` : `<div class="empty glass"><span class="emoji">🖼️</span><p>${t('no_images')}</p></div>`}
      </div>`;
  }

  function viewNotFound() {
    return `<div class="empty glass view"><span class="emoji">🦊</span><p>${t('not_found')}</p><a class="btn" href="#/">${t('go_home')}</a></div>`;
  }

  // ---------- Router ----------

  let lbItems = [];
  let lastRoute = '';

  function render() {
    if (!data) return;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let route = 'home';
    let html;
    let title = '';
    lbItems = [];
    listContext = {};

    if (!parts.length) html = viewHome();
    else if (parts[0] === 'album' && parts[1]) {
      route = 'music';
      const id = decodeURIComponent(parts[1]);
      html = viewAlbum(id);
      title = tr(albums().find((a) => a.id === id)?.title);
    }
    else if (parts[0] === 'musikk') { route = 'music'; html = viewMusic(); title = t('music'); }
    else if (parts[0] === 'om') { route = 'about'; html = viewAbout(); title = t('about'); }
    else if (parts[0] === 'bilder') { route = 'gallery'; html = viewGallery(); title = t('gallery'); }
    else { route = ''; html = viewNotFound(); }

    main.innerHTML = html;
    markPlaying();
    document.querySelectorAll('.nav a, .footer-nav a').forEach((a) => {
      const on = a.dataset.route === route;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    const siteTitle = tr(data.site.title);
    document.title = title ? `${title} · ${siteTitle}` : siteTitle;

    const key = location.hash;
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;
  }

  function applyStaticText() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
    $('#langBtn').textContent = lang === 'no' ? 'EN' : 'NO';
    $('#menuBtn').setAttribute('aria-label', t('menu'));
    $('#madeWith').textContent = t('made_with');
    updateThemeBtn();
    if (data) {
      $('#brandText').textContent = tr(data.site.title);
      $('#footerText').textContent = tr(data.site.title);
    }
    updatePlayerText();
  }

  // ---------- Klikk på siden ----------

  main.addEventListener('click', (e) => {
    const sw = e.target.closest('[data-copy]');
    if (sw) {
      const val = sw.dataset.copy;
      navigator.clipboard?.writeText(val).then(() => toast(`${t('copied')} ${val}`), () => toast(val));
      return;
    }
    const fig = e.target.closest('[data-lb]');
    if (fig) { openLb(lbItems, +fig.dataset.lb); return; }

    const list = albums();
    if (e.target.closest('[data-play-all]')) { playList(allRefs(), 0, false); return; }
    if (e.target.closest('[data-random]')) {
      const refs = allRefs();
      playList(refs, Math.floor(Math.random() * refs.length), true);
      return;
    }
    const pa = e.target.closest('[data-play-album]');
    if (pa) { const a = list[+pa.dataset.playAlbum]; if (a) playList(albumRefs(a), 0, false); return; }
    const sa = e.target.closest('[data-shuffle-album]');
    if (sa) {
      const a = list[+sa.dataset.shuffleAlbum];
      if (a) { const refs = albumRefs(a); playList(refs, Math.floor(Math.random() * refs.length), true); }
      return;
    }
    const tb = e.target.closest('.track[data-key]');
    if (tb) {
      if (now() && now().key === tb.dataset.key) { togglePlay(); return; }
      const ctx = listContext[tb.dataset.list] || [];
      playList(ctx, +tb.dataset.i, null);
    }
  });
  main.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const fig = e.target.closest('[data-lb]');
    if (fig) { e.preventDefault(); fig.click(); }
  });
  main.addEventListener('input', (e) => {
    if (e.target.id !== 'search') return;
    searchQuery = e.target.value;
    $('#results').innerHTML = searchResults();
    markPlaying();
  });

  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'no' ? 'en' : 'no';
    store.set('lang', lang);
    applyStaticText();
    render();
    renderQueue();
  });

  // ---------- Lyst / mørkt tema ----------

  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = () => document.documentElement.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
  function updateThemeBtn() {
    const dark = currentTheme() === 'dark';
    const btn = $('#themeBtn');
    btn.textContent = dark ? '☀' : '☾';
    btn.setAttribute('aria-label', t(dark ? 'to_light' : 'to_dark'));
    btn.title = t(dark ? 'to_light' : 'to_dark');
  }
  $('#themeBtn').addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('theme', next);
    updateThemeBtn();
  });
  darkQuery.addEventListener('change', updateThemeBtn);

  const menuBtn = $('#menuBtn');
  const nav = $('#nav');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  // ---------- Lightbox ----------

  const lb = $('#lightbox');
  let lbList = [];
  let lbIndex = 0;
  let lastFocus = null;

  function showLb() {
    const item = lbList[lbIndex];
    $('#lbImg').src = item.src;
    $('#lbImg').alt = tr(item.caption);
    $('#lbCap').textContent = tr(item.caption);
    $('#lbPrev').hidden = $('#lbNext').hidden = lbList.length < 2;
  }
  function openLb(list, i) {
    if (!list.length) return;
    lbList = list; lbIndex = i; lastFocus = document.activeElement;
    showLb();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  }
  const step = (d) => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); };
  $('#lbClose').onclick = closeLb;
  $('#lbPrev').onclick = () => step(-1);
  $('#lbNext').onclick = () => step(1);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });

  // ---------- Bildebeskyttelse ----------
  // Stopper høyreklikk og dra-og-slipp på bildene. Det hindrer ikke skjermbilder,
  // men gjør det vanskeligere å lagre dem.

  const isProtected = (el) => el instanceof Element && el.closest('main img, main svg, .lightbox, .brand, .pl-cover');
  document.addEventListener('contextmenu', (e) => { if (isProtected(e.target)) e.preventDefault(); });
  document.addEventListener('dragstart', (e) => { if (isProtected(e.target)) e.preventDefault(); });

  // ---------- Musikkspiller ----------
  // Spilleren ligger utenfor <main>, så musikken fortsetter når man bytter side.

  const ICONS = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="6" width="2.5" height="12" rx="1"/><path d="M19 6.8v10.4a.8.8 0 0 1-1.25.66L10 12.66a.8.8 0 0 1 0-1.32l7.75-5.2A.8.8 0 0 1 19 6.8z"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="16.5" y="6" width="2.5" height="12" rx="1"/><path d="M5 6.8v10.4a.8.8 0 0 0 1.25.66L14 12.66a.8.8 0 0 0 0-1.32L6.25 6.14A.8.8 0 0 0 5 6.8z"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h4v4"/><path d="M4 19 20 4"/><path d="M20 16v4h-4"/><path d="m14.5 14.5 5.5 5.5"/><path d="M4 5l5 5"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="m7 22-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></svg>',
    repeatOne: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="m7 22-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/><path d="M11 10h1.2v4.5"/></svg>',
    queue: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h12M4 12h12M4 18h8"/><path d="M18 15v6l4-3z" fill="currentColor" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  };

  const audio = new Audio();
  audio.preload = 'metadata';
  const player = $('#player');
  let baseList = [];  // sporene i den rekkefølgen de ble valgt
  let queue = [];     // det som faktisk spilles (blandet hvis «bland» er på)
  let qi = 0;
  let shuffle = store.get('shuffle') === '1';
  let repeat = ['off', 'all', 'one'].includes(store.get('repeat')) ? store.get('repeat') : 'off';
  const now = () => queue[qi] || null;

  const v = parseFloat(store.get('volume'));
  if (v >= 0 && v <= 1) audio.volume = v;
  $('#plVol').value = audio.volume;
  $('#plPrev').innerHTML = ICONS.prev;
  $('#plNext').innerHTML = ICONS.next;
  $('#plShuffle').innerHTML = ICONS.shuffle;
  $('#plQueue').innerHTML = ICONS.queue;

  const shuffled = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  // Den valgte sangen spilles først, resten blandes etter den.
  const buildQueue = (start) => shuffle ? [baseList[start], ...shuffled(baseList.filter((_, i) => i !== start))] : baseList.slice();

  // forceShuffle: true = slå på bland, false = slå av, null = behold innstillingen
  function playList(list, start, forceShuffle) {
    if (!list.length) return;
    if (forceShuffle !== null && forceShuffle !== shuffle) setShuffle(forceShuffle, false);
    baseList = list.slice();
    queue = buildQueue(start);
    qi = shuffle ? 0 : start;
    loadTrack(true);
  }

  function loadTrack(autoplay) {
    const r = now();
    if (!r) return;
    audio.src = r.track.src;
    if (autoplay) audio.play().catch(() => {});
    player.hidden = false;
    document.body.classList.add('has-player');
    $('#plCover').innerHTML = coverHTML(r.album);
    $('#plAlbum').href = `#/album/${encodeURIComponent(r.album.id)}`;
    $('#plDur').textContent = r.track.duration ? fmt(r.track.duration) : '0:00';
    updatePlayerText();
    markPlaying();
    renderQueue();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: trackTitle(r),
        artist: r.album.artist || 'Redfox',
        album: tr(r.album.title),
        artwork: r.album.cover ? [{ src: new URL(r.album.cover, location.href).href }] : [{ src: new URL('bilder/redfox-hode.webp', location.href).href, type: 'image/webp' }],
      });
    }
  }

  function updatePlayerText() {
    $('#plPlay').setAttribute('aria-label', t(audio.paused ? 'play' : 'pause'));
    $('#plPrev').setAttribute('aria-label', t('prev'));
    $('#plNext').setAttribute('aria-label', t('next'));
    $('#plClose').setAttribute('aria-label', t('close_player'));
    $('#plVol').setAttribute('aria-label', t('volume'));
    $('#plSeek').setAttribute('aria-label', t('seek'));
    $('#plQueue').setAttribute('aria-label', t('queue'));
    $('#plQueue').title = t('queue');
    $('#queueClose').setAttribute('aria-label', t('close_player'));
    const sh = $('#plShuffle');
    sh.setAttribute('aria-label', t('shuffle')); sh.title = t('shuffle');
    sh.setAttribute('aria-pressed', shuffle);
    const rp = $('#plRepeat');
    rp.innerHTML = repeat === 'one' ? ICONS.repeatOne : ICONS.repeat;
    rp.setAttribute('aria-label', t('repeat_' + repeat)); rp.title = t('repeat_' + repeat);
    rp.setAttribute('aria-pressed', repeat !== 'off');
    const r = now();
    if (!r) return;
    $('#plTitle').textContent = trackTitle(r);
    $('#plAlbum').textContent = [r.album.artist, tr(r.album.title)].filter(Boolean).join(' · ');
  }

  function markPlaying() {
    const r = now();
    document.querySelectorAll('.track[data-key]').forEach((b) => {
      const on = !!r && b.dataset.key === r.key;
      b.classList.toggle('playing', on);
      b.classList.toggle('paused', on && audio.paused);
      if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
  }

  function renderQueue() {
    const list = $('#queueList');
    if (!list) return;
    list.innerHTML = queue.slice(qi, qi + 60).map((r, i) => `
      <li><button class="q-item ${i === 0 ? 'current' : ''}" data-q="${qi + i}">
        <span class="q-cover">${coverHTML(r.album)}</span>
        <span class="t"><span class="tt">${esc(trackTitle(r))}</span><span class="ta">${esc(tr(r.album.title))}</span></span>
        <span class="d">${r.track.duration ? fmt(r.track.duration) : ''}</span>
      </button></li>`).join('');
  }
  $('#queueList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-q]');
    if (!b) return;
    qi = +b.dataset.q;
    loadTrack(true);
  });
  const queuePanel = $('#queuePanel');
  $('#plQueue').addEventListener('click', () => {
    queuePanel.hidden = !queuePanel.hidden;
    $('#plQueue').setAttribute('aria-expanded', !queuePanel.hidden);
    if (!queuePanel.hidden) renderQueue();
  });
  $('#queueClose').addEventListener('click', () => { queuePanel.hidden = true; $('#plQueue').setAttribute('aria-expanded', 'false'); });

  function togglePlay() {
    if (!now()) return;
    if (audio.paused) audio.play().catch(() => {}); else audio.pause();
  }

  function skip(d, auto = false) {
    if (!now()) return;
    if (d < 0 && audio.currentTime > 3) { audio.currentTime = 0; return; }
    let next = qi + d;
    if (next >= queue.length) {
      if (repeat !== 'all' && auto) { audio.currentTime = 0; audio.pause(); return; }
      if (repeat !== 'all' && !auto) return;
      if (shuffle) { queue = shuffled(baseList); }
      next = 0;
    }
    if (next < 0) next = repeat === 'all' ? queue.length - 1 : 0;
    qi = next;
    loadTrack(true);
  }

  function setShuffle(on, keepPlaying = true) {
    shuffle = on;
    store.set('shuffle', on ? '1' : '0');
    if (keepPlaying && now()) {
      const cur = now();
      const start = baseList.indexOf(cur);
      queue = shuffle ? [cur, ...shuffled(baseList.filter((r) => r !== cur))] : baseList.slice();
      qi = shuffle ? 0 : Math.max(0, start);
      renderQueue();
    }
    updatePlayerText();
  }

  function closePlayer() {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    queue = []; baseList = []; qi = 0;
    player.hidden = true;
    queuePanel.hidden = true;
    document.body.classList.remove('has-player');
    markPlaying();
  }

  function syncPlayState() {
    $('#plPlay').innerHTML = audio.paused ? ICONS.play : ICONS.pause;
    player.classList.toggle('is-playing', !audio.paused);
    updatePlayerText();
    markPlaying();
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
  }
  audio.addEventListener('play', syncPlayState);
  audio.addEventListener('pause', syncPlayState);
  audio.addEventListener('ended', () => {
    if (repeat === 'one') { audio.currentTime = 0; audio.play().catch(() => {}); return; }
    skip(1, true);
  });
  let seeking = false;
  const seek = $('#plSeek');
  audio.addEventListener('timeupdate', () => {
    if (seeking) return;
    const d = audio.duration;
    seek.value = isFinite(d) && d ? (audio.currentTime / d) * 1000 : 0;
    seek.style.setProperty('--p', `${seek.value / 10}%`);
    $('#plTime').textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('loadedmetadata', () => { $('#plDur').textContent = fmt(audio.duration); });

  seek.addEventListener('input', () => {
    seeking = true;
    seek.style.setProperty('--p', `${seek.value / 10}%`);
    if (isFinite(audio.duration)) $('#plTime').textContent = fmt((seek.value / 1000) * audio.duration);
  });
  seek.addEventListener('change', () => {
    if (isFinite(audio.duration)) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
  });
  const vol = $('#plVol');
  vol.addEventListener('input', () => {
    audio.volume = +vol.value;
    vol.style.setProperty('--p', `${audio.volume * 100}%`);
    store.set('volume', audio.volume);
  });
  vol.style.setProperty('--p', `${audio.volume * 100}%`);
  $('#plPlay').addEventListener('click', togglePlay);
  $('#plPrev').addEventListener('click', () => skip(-1));
  $('#plNext').addEventListener('click', () => skip(1));
  $('#plShuffle').addEventListener('click', () => setShuffle(!shuffle));
  $('#plRepeat').addEventListener('click', () => {
    repeat = { off: 'all', all: 'one', one: 'off' }[repeat];
    store.set('repeat', repeat);
    updatePlayerText();
  });
  $('#plClose').addEventListener('click', closePlayer);
  syncPlayState();

  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => audio.play());
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => skip(-1));
    navigator.mediaSession.setActionHandler('nexttrack', () => skip(1));
  }

  // Tastatur: mellomrom = spill/pause, Esc lukker bildevisning og køen.
  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      return;
    }
    if (e.key === 'Escape' && !queuePanel.hidden) { queuePanel.hidden = true; return; }
    const typing = e.target.closest?.('input, textarea, select, button, a, [contenteditable]');
    if (e.key === ' ' && !typing && now()) { e.preventDefault(); togglePlay(); }
  });

  // ---------- Toast ----------

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  // ---------- Start ----------

  $('#year').textContent = new Date().getFullYear();
  applyStaticText();

  fetch('data/site.json?v=' + Date.now())
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((json) => {
      data = json;
      applyStaticText();
      render();
      window.addEventListener('hashchange', render);
    })
    .catch(() => {
      main.innerHTML = `<div class="empty glass"><span class="emoji">🦊</span><p>${t('load_error')}</p></div>`;
    });
})();
