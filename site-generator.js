// Site Generator - Generates the main site from admin data
function generateMainSite() {
    // Get admin data
    const adminData = JSON.parse(localStorage.getItem('redfoxAdminData'));
    if (!adminData) return;

    const theme = adminData.themes.find(t => t.id === adminData.settings.activeTheme) || adminData.themes[0];
    const translations = adminData.translations;
    const personal = adminData.personal;
    const fursona = adminData.fursona;
    
    // Update translations with personal data
    translations.no.about_value_name = personal.name;
    translations.no.about_value_birthday = personal.birthday;
    translations.no.about_value_age = personal.age;
    translations.no.about_value_interests = personal.interests;
    translations.no.about_value_likes = personal.likes;
    translations.no.about_value_favgame = personal.favgame;
    translations.no.fursona_value_name = fursona.name;
    translations.no.fursona_value_fursona = fursona.type;
    translations.no.fursona_value_origin = fursona.origin;
    translations.no.fursona_value_traits = fursona.traits;
    translations.no.fursona_value_story = fursona.story;
    
    translations.en.about_value_name = personal.name;
    translations.en.about_value_birthday = personal.birthday;
    translations.en.about_value_age = personal.age;
    translations.en.about_value_interests = personal.interests;
    translations.en.about_value_likes = personal.likes;
    translations.en.about_value_favgame = personal.favgame;
    translations.en.fursona_value_name = fursona.name;
    translations.en.fursona_value_fursona = fursona.type;
    translations.en.fursona_value_origin = fursona.origin;
    translations.en.fursona_value_traits = fursona.traits;
    translations.en.fursona_value_story = fursona.story;

    const html = `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${translations.no.site_title}</title>
  <link href="https://fonts.cdnfonts.com/css/comic-sans-ms" rel="stylesheet">
  <style>
    body {
      margin: 0;
      background-color: ${theme.colors.background};
      color: ${theme.colors.textColor};
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }
    header {
      background-color: ${theme.colors.headerColor};
      text-align: center;
      padding: 20px;
      border-bottom: 3px solid ${theme.colors.accentColor};
    }
    header img {
      max-width: 180px;
      height: auto;
      margin: 0 auto 10px;
      display: block;
    }
    header h1 {
      margin: 0;
      font-size: 2em;
      color: ${theme.colors.textColor};
    }
    #langToggle {
      margin-top: 10px;
      padding: 5px 10px;
      background-color: ${theme.colors.navColor};
      color: ${theme.colors.textColor};
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    #langToggle:hover {
      background-color: ${theme.colors.accentColor};
    }
    nav {
      background-color: ${theme.colors.navColor};
      border-bottom: 3px solid ${theme.colors.accentColor};
      position: sticky;
      top: 0;
      z-index: 999;
    }
    nav ul {
      list-style: none;
      display: flex;
      justify-content: center;
      padding: 0;
      margin: 0;
    }
    nav li {
      margin: 0;
    }
    nav a {
      display: block;
      padding: 15px 25px;
      text-decoration: none;
      color: ${theme.colors.textColor};
      background-color: transparent;
      border-bottom: 3px solid transparent;
      transition: background-color 0.3s ease;
    }
    nav a:hover {
      background-color: ${theme.colors.accentColor};
    }
    nav a.active {
      background-color: ${theme.colors.accentColor};
    }
    section {
      padding: 20px;
      max-width: 900px;
      margin: auto;
    }
    #about h1, #music h1, #gallery h1 {
      margin-top: 0;
      color: ${theme.colors.accentColor};
    }
    .album {
      margin-bottom: 40px;
    }
    .album h2 {
      color: ${theme.colors.accentColor};
      margin-bottom: 10px;
    }
    .album audio {
      width: 100%;
      background-color: transparent;
      border-radius: 5px;
    }
    .playlist {
      list-style: none;
      padding: 0;
      margin: 10px 0 0;
    }
    .playlist li {
      padding: 8px;
      cursor: pointer;
      color: ${theme.colors.textColor};
      border-radius: 4px;
      transition: background-color 0.2s, color 0.2s;
    }
    .playlist li:hover {
      background-color: ${theme.colors.accentColor};
      color: ${theme.colors.textColor};
    }
    .playlist li.playing {
      color: ${theme.colors.accentColor};
      background: rgba(167, 1, 1, 0.3);
      font-weight: bold;
    }
    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    .image-grid img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    .image-grid img:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 15px rgba(255,26,64,0.5);
    }
    .image-grid figure {
      margin: 0;
    }
    .image-grid figcaption {
      text-align: center;
      margin-top: 8px;
      font-style: italic;
      color: ${theme.colors.textColor};
    }
    #lightbox {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.9);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    #lightbox img {
      max-width: 90%;
      max-height: 90%;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(255,26,64,0.4);
    }
    #lightbox-close {
      position: absolute;
      top: 20px; right: 30px;
      font-size: 40px;
      color: #fff;
      cursor: pointer;
      z-index: 1000;
      font-weight: bold;
    }
    #backToTop {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 48px;
      height: 48px;
      background-color: ${theme.colors.accentColor};
      color: ${theme.colors.textColor};
      border: none;
      border-radius: 50%;
      font-size: 24px;
      line-height: 1;
      display: none;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 2px 6px rgba(0,0,0,0.5);
      transition: opacity 0.3s;
      font-size: 32px;
      font-weight: 900;
      text-shadow: 1px 0 0 currentColor, -1px 0 0 currentColor, 0 1px 0 currentColor, 0 -1px 0 currentColor;
    }
    #backToTop.show {
      display: flex;
      opacity: 0.8;
    }
    #backToTop:hover {
      opacity: 1;
    }
    .subsection {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 2px solid #444;
    }
    .subsection h2 {
      color: ${theme.colors.accentColor};
      margin-bottom: 10px;
    }
    .subsection p {
      margin: 6px 0;
    }
    .subsection p strong {
      display: inline-block;
      width: 120px;
    }
    @media (max-width: 600px) {
      header img { max-width: 100px; }
      nav ul { flex-direction: column; }
    }
    
    /* Admin Panel Button */
    #adminPanelBtn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 20px;
      cursor: pointer;
      z-index: 1001;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    #adminPanelBtn:hover {
      transform: scale(1.1);
    }
  </style>
</head>

<body>
  <button id="adminPanelBtn" onclick="window.open('admin.html', '_blank')" title="Åpne Admin Panel">⚙️</button>

  <header>
    <img src="${adminData.images[0] ? adminData.images[0].url : 'https://i.imgur.com/pMJfpb3.png'}" alt="Redfox logo">
    <h1 data-i18n="site_title">${translations.no.site_title}</h1>
    <button id="langToggle">English</button>
  </header>

  <nav>
    <ul>
      ${adminData.pages.map((page, index) => `
        <li><a href="#" id="menu-${page.name}" ${index === 0 ? 'class="active"' : ''} data-i18n="nav_${page.name}">${page.titleNo}</a></li>
      `).join('')}
    </ul>
  </nav>

  ${adminData.pages.map((page, index) => `
    <section id="${page.name}" ${index !== 0 ? 'style="display: none;"' : ''}>
      <h1 data-i18n="${page.name}_title">${page.titleNo}</h1>
      ${page.name === 'about' ? `
        <div class="subsection" id="personal-profile">
          <h2 data-i18n="personal_title">${translations.no.personal_title}</h2>
          <p><strong data-i18n="about_label_name">${translations.no.about_label_name}</strong><span data-i18n="about_value_name">${personal.name}</span></p>
          <p><strong data-i18n="about_label_birthday">${translations.no.about_label_birthday}</strong><span data-i18n="about_value_birthday">${personal.birthday}</span></p>
          <p><strong data-i18n="about_label_age">${translations.no.about_label_age}</strong><span data-i18n="about_value_age">${personal.age}</span></p>
          <p><strong data-i18n="about_label_interests">${translations.no.about_label_interests}</strong><span data-i18n="about_value_interests">${personal.interests}</span></p>
          <p><strong data-i18n="about_label_likes">${translations.no.about_label_likes}</strong><span data-i18n="about_value_likes">${personal.likes}</span></p>
          <p><strong data-i18n="about_label_favgame">${translations.no.about_label_favgame}</strong><span data-i18n="about_value_favgame">${personal.favgame}</span></p>
        </div>
        <div class="subsection" id="fursona-profile">
          <h2 data-i18n="fursona_title">${translations.no.fursona_title}</h2>
          <p><strong data-i18n="fursona_label_name">${translations.no.fursona_label_name}</strong><span data-i18n="fursona_value_name">${fursona.name}</span></p>
          <p><strong data-i18n="fursona_label_fursona">${translations.no.fursona_label_fursona}</strong><span data-i18n="fursona_value_fursona">${fursona.type}</span></p>
          <p><strong data-i18n="fursona_label_origin">${translations.no.fursona_label_origin}</strong><span data-i18n="fursona_value_origin">${fursona.origin}</span></p>
          <p><strong data-i18n="fursona_label_traits">${translations.no.fursona_label_traits}</strong><span data-i18n="fursona_value_traits">${fursona.traits}</span></p>
          <p><strong data-i18n="fursona_label_story">${translations.no.fursona_label_story}</strong><span data-i18n="fursona_value_story">${fursona.story}</span></p>
        </div>
      ` : ''}
      ${page.name === 'music' ? `
        ${adminData.albums.map(album => `
          <div class="album">
            <h2 data-i18n="album${album.id}_title">${album.titleNo}</h2>
            <audio controls></audio>
            <ul class="playlist">
              ${album.songs.map(song => {
                const url = song.url || `https://asarayja.github.io/redfox/Redfox/${album.name}/${song.fileName}`;
                return `<li data-src="${url}">${song.title}</li>`;
              }).join('')}
            </ul>
          </div>
        `).join('')}
      ` : ''}
      ${page.name === 'gallery' ? `
        <div class="image-grid">
          ${adminData.images.slice(1).map((image, index) => `
            <figure>
              <img src="${image.url}" alt="${image.alt}">
              <figcaption data-i18n="gallery_caption${index + 2}">${image.captionNo}</figcaption>
            </figure>
          `).join('')}
        </div>
      ` : ''}
    </section>
  `).join('')}

  <div id="lightbox">
    <span id="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="">
  </div>

  <button id="backToTop" aria-label="Gå til toppen">↑</button>

  <script>
    const translations = ${JSON.stringify(translations)};
    
    document.addEventListener('DOMContentLoaded', function () {
      // Menu functionality
      const menuItems = document.querySelectorAll('nav a');
      const sections = document.querySelectorAll('section');
      
      function showSection(targetId) {
        sections.forEach(s => s.style.display = 'none');
        menuItems.forEach(a => a.classList.remove('active'));
        
        const targetSection = document.getElementById(targetId);
        const targetMenu = document.getElementById('menu-' + targetId);
        
        if (targetSection) targetSection.style.display = 'block';
        if (targetMenu) targetMenu.classList.add('active');
      }
      
      menuItems.forEach(item => {
        item.onclick = e => {
          e.preventDefault();
          const targetId = item.id.replace('menu-', '');
          showSection(targetId);
        };
      });

      // Audio/playlist functionality
      function pauseAll(curr) {
        document.querySelectorAll('.album audio').forEach(p => {
          if (p !== curr) p.pause();
        });
      }

      document.getElementById('music').addEventListener('click', function (e) {
        const li = e.target.closest('li[data-src]');
        if (!li) return;

        const album = li.closest('.album');
        const aud = album.querySelector('audio');
        if (!aud) return;

        pauseAll(aud);
        aud.src = li.getAttribute('data-src');
        aud.load();
        aud.play();

        document.querySelectorAll('.playlist li.playing').forEach(el =>
          el.classList.remove('playing')
        );
        li.classList.add('playing');
      });

      document.querySelectorAll('.album audio').forEach(p =>
        p.addEventListener('play', () => pauseAll(p))
      );

      // Lightbox functionality
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lightbox-img');
      const lbClose = document.getElementById('lightbox-close');

      document.querySelectorAll('.image-grid img').forEach(img => {
        img.onclick = () => {
          lbImg.src = img.src;
          lb.style.display = 'flex';
        };
      });

      lbClose.onclick = () => { lb.style.display = 'none'; };
      lb.onclick = e => { if (e.target === lb) lb.style.display = 'none'; };

      // Language functionality
      let currentLang = 'no';
      const elems = document.querySelectorAll('[data-i18n]');

      function updateLang(lang) {
        elems.forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[lang][key]) el.textContent = translations[lang][key];
        });
        document.getElementById('langToggle').textContent = lang === 'no' ? 'English' : 'Norsk';
        document.documentElement.lang = lang;
        currentLang = lang;
      }

      document.getElementById('langToggle').onclick = () => {
        updateLang(currentLang === 'no' ? 'en' : 'no');
      };

      updateLang(currentLang);
      showSection('${adminData.pages[0].name}');

      // Back to top functionality
      const backToTop = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  </script>
</body>
</html>`;

    return html;
}

// Function to update the main site
function updateMainSite() {
    const newHtml = generateMainSite();
    if (newHtml) {
        // Create a new file and replace the current one
        const blob = new Blob([newHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // For now, just open a new window - in a real server environment,
        // you would save this to index.html
        const newWindow = window.open(url, '_blank');
        newWindow.document.title = 'Oppdatert Redfox Side';
    }
}

// Auto-update site when localStorage changes (for real-time updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'redfoxAdminData') {
        console.log('Admin data updated, regenerating site...');
        // In a real environment, you would auto-update the main site here
    }
});

// Export for use in admin panel
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateMainSite, updateMainSite };
}
