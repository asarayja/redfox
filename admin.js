// Admin Panel JavaScript
class RedfoxAdmin {
    constructor() {
        this.currentAlbum = null;
        this.currentImage = null;
        this.currentTheme = null;
        this.currentPage = null;
        this.currentTranslationLang = 'no';
        this.currentLang = 'no'; // Current admin language
        
        this.initializeData();
        this.loadAdminData();
    }

    // Initialize default data structure
    initializeData() {
        const defaultData = {
            personal: {
                name: "Redfox",
                birthday: "30. november",
                age: "37 år",
                interests: "Spille pc‑spill og se serier",
                likes: "Gå turer, være med venner, være kreativ i furry‑fellesskapet og le",
                favgame: "VR Chat",
                profilePicture: "https://i.imgur.com/pMJfpb3.png"
            },
            fursona: {
                name: "Redfox",
                type: "Rev",
                origin: "Nordisk ørkenrev",
                traits: "Lur, leken, nysgjerrig",
                story: "Vokste opp på tundraen, elsker eventyr og samspill med venner."
            },
            albums: [
                {
                    id: 1,
                    name: "Redfox_Full_Rulle",
                    titleNo: "Album: Redfox – Full Rulle",
                    titleEn: "Album: Redfox – Full Throttle",
                    songs: [
                        { title: "Redfox – Kveldens Leveranse", fileName: "Redfox_Kveldens_Leveranse.mp3" },
                        { title: "Redfox – Sparkesykkel Syndrom", fileName: "Redfox_Sparkesykkel_Syndrom.mp3" },
                        { title: "Redfox – Vannverk i Varsel", fileName: "Redfox_Vannverk_i_Varsel.mp3" },
                        { title: "Redfox – Fjertelykke", fileName: "Redfox_Fjertelykke.mp3" },
                        { title: "Redfox – Fisefart i VR", fileName: "Redfox_Fisefart_i_VR.mp3" },
                        { title: "Redfox – Tryne med Stil", fileName: "Redfox_Tryne med_Stil.mp3" },
                        { title: "Redfox – Kenguvogn", fileName: "Redfox_Kenguvogn.mp3" },
                        { title: "Redfox – Latterlig Sjanse", fileName: "Redfox_Latterlig_Sjanse.mp3" },
                        { title: "Redfox – Bortevekk med Vind i Pelsen", fileName: "Redfox_Bortevekk_med_Vind_i_Pelsen.mp3" },
                        { title: "Redfox – Slipp Latteren Fri", fileName: "Redfox_Slipp_Latteren_Fri.mp3" },
                        { title: "Redfox – Theme", fileName: "Redfox_Redfox_Theme.mp3" }
                    ]
                },
                {
                    id: 2,
                    name: "Redfox_Turbopels_og_Toys",
                    titleNo: "Album: Redfox – Turbopels og Tøys",
                    titleEn: "Album: Redfox – Turbo Fur and Toys",
                    songs: [
                        { title: "Redfox – Rev i Rute", fileName: "Redfox_Rev_i_Rute.mp3" }
                    ]
                },
                {
                    id: 3,
                    name: "Redfox_Tails_of_Trouble",
                    titleNo: "Album: Redfox – Tails of Trouble",
                    titleEn: "Album: Redfox – Tails of Trouble",
                    songs: [
                        { title: "Redfox – Disco Detour", fileName: "Redfox_Disco_Detour.mp3" },
                        { title: "Redfox – Flush the Funk", fileName: "Redfox_Flush_the_Funk.mp3" },
                        { title: "Redfox – Goldfish Parade", fileName: "Redfox_Goldfish_Parade.mp3" },
                        { title: "Redfox – Headset Hero", fileName: "Redfox_Headset_Hero.mp3" },
                        { title: "Redfox – Laugh Attack", fileName: "Redfox_Laugh_Attack.mp3" },
                        { title: "Redfox – Rocket Sneakers", fileName: "Redfox_Rocket_Sneakers.mp3" },
                        { title: "Redfox – Skater on the Moon", fileName: "Redfox_Skater_on_the_Moon.mp3" },
                        { title: "Redfox – Toilet Paper Tango", fileName: "Redfox_Toilet_Paper_Tango.mp3" },
                        { title: "Redfox – Trail Tricks", fileName: "Redfox_Trail_Tricks.mp3" },
                        { title: "Redfox – Windchaser", fileName: "Redfox_Windchaser.mp3" }
                    ]
                },
                {
                    id: 4,
                    name: "Redfox_Linje_9_er_Opptatt",
                    titleNo: "Album: Redfox – Linje 9 er Opptatt",
                    titleEn: "Album: Redfox – Line 9 is Busy",
                    songs: [
                        { title: "Redfox – Alarm i Arkivet", fileName: "Redfox_Alarm_i_Arkivet.mp3" },
                        { title: "Redfox – Fax med Følelser", fileName: "Redfox_Fax_med_Folelser.mp3" },
                        { title: "Redfox – Feil Tilkoblet", fileName: "Redfox_Feil_Tilkoblet.mp3" },
                        { title: "Redfox – Koble Meg Fri", fileName: "Redfox_Koble_Meg_Fri.mp3" },
                        { title: "Redfox – Linje 9 er Opptatt", fileName: "Redfox_Linje_9_er_Opptatt.mp3" },
                        { title: "Redfox – Rør ikke Kabler", fileName: "Redfox_Ror_ikke_Kabler.mp3" },
                        { title: "Redfox – Sentralen AS", fileName: "Redfox_Sentralen_AS.mp3" },
                        { title: "Redfox – Timeout på Tast 3", fileName: "Redfox_Timeout_på_Tast 3.mp3" },
                        { title: "Redfox – Vennligst Hold Linjen", fileName: "Redfox_Vennligst_Hold_Linjen.mp3" },
                        { title: "Redfox – Videresendt til Feil Rev", fileName: "Redfox_Videresendt_til_Feil_Rev.mp3" }
                    ]
                },
                {
                    id: 5,
                    name: "Redfox_Toalettrock",
                    titleNo: "Album: Redfox – Toalettrock",
                    titleEn: "Album: Redfox – Toilet Rock",
                    songs: [
                        { title: "Redfox – Bom i Buksa", fileName: "Redfox_Bom_i_Buksa.mp3" }
                    ]
                },
                {
                    id: 6,
                    name: "Redfox_Furry_med_Fullt_Register",
                    titleNo: "Album: Redfox – Furry med Fullt Register",
                    titleEn: "Album: Redfox – Furry with Full Range",
                    songs: [
                        { title: "Redfox – Den Røde Furry Reven", fileName: "Redfox_Den_Rode_Furry_Reven.mp3" },
                        { title: "Redfox – I Sommervær", fileName: "Redfox_I_Sommervær.mp3" },
                        { title: "Redfox – Kongen av Sprell", fileName: "Redfox_Kongen_av_sprell.mp3" },
                        { title: "Redfox – Naken og Fri", fileName: "Redfox_Naken_og_Fri.mp3" },
                        { title: "Redfox – Redfox du e vår helt", fileName: "Redfox_Redfox_du_e_vår helt.mp3" },
                        { title: "Redfox – Redfox og Pekkene", fileName: "Redfox_Redfox_og_Pekkene.mp3" },
                        { title: "Redfox – Redfox på Leting", fileName: "Redfox_Redfox_på_Leting.mp3" },
                        { title: "Redfox – Redfox på Tur", fileName: "Redfox_Redfox_paa_Tur.mp3" },
                        { title: "Redfox – Redfox Rocker", fileName: "Redfox_Redfox_Rocker.mp3" },
                        { title: "Redfox – Redfox's Reise", fileName: "Redfox_Redfox_s_Reise.mp3" },
                        { title: "Redfox – Redfox Sangen", fileName: "Redfox_Redfox_sangen.mp3" },
                        { title: "Redfox – Redfox Skogens Spellemester", fileName: "Redfox_Redfox_Skogens_Spellemester.mp3" },
                        { title: "Redfox – Sangen om Redfox", fileName: "Redfox_Sangen_om_Redfox.mp3" },
                        { title: "Redfox – Skogens Ville Sjarmør", fileName: "Redfox_Skogens_Ville_Sjarmør.mp3" }
                    ]
                },
                {
                    id: 7,
                    name: "Redfox_Full_Systemfeil",
                    titleNo: "Album: Redfox – Full Systemfeil",
                    titleEn: "Album: Redfox – System Error",
                    songs: [
                        { title: "Redfox – Brev uten Porto", fileName: "Redfox_Brev_uten_Porto.mp3" },
                        { title: "Redfox – Feil Dør Feil Fest", fileName: "Redfox_Feil_Dør_Feil_Fest.mp3" },
                        { title: "Redfox – Handlepose med Hull", fileName: "Redfox_Handlepose_med_Hull.mp3" },
                        { title: "Redfox – Kontaktløs Kaos", fileName: "Redfox_Kontaktløs_Kaos.mp3" },
                        { title: "Redfox – Matpakke Med Mot", fileName: "Redfox_Matpakke_Med_Mot.mp3" },
                        { title: "Redfox – Pakke På Avveie", fileName: "Redfox_Pakke_Paa_Avveie.mp3" },
                        { title: "Redfox – Såpeglatt Show", fileName: "Redfox_Såpeglatt_Show.mp3" },
                        { title: "Redfox – Skjermfrosset Farse", fileName: "Redfox_Skjermfrosset_Farse.mp3" },
                        { title: "Redfox – Snooze-knappens Herre", fileName: "Redfox_Snooze_knappens_Herre.mp3" },
                        { title: "Redfox – Tastetrykk Tornado", fileName: "Redfox_Tastetrykk_Tornado.mp3" },
                        { title: "Redfox – Trådløs Trøbbel", fileName: "Redfox_Trodlos_Trobbel.mp3" },
                        { title: "Redfox – Trykk på Knappen", fileName: "Redfox_Trykk_på_Knappen.mp3" }
                    ]
                }
            ],
            images: [
                {
                    id: 1,
                    fileName: "logo.png",
                    url: "https://i.imgur.com/pMJfpb3.png",
                    alt: "Redfox-logo",
                    captionNo: "Redfox-logo",
                    captionEn: "Redfox-logo"
                },
                {
                    id: 2,
                    fileName: "2.jpg",
                    url: "https://asarayja.github.io/redfox/bilder/2.jpg",
                    alt: "VR Redfox",
                    captionNo: "VR Redfox",
                    captionEn: "VR Redfox"
                },
                {
                    id: 3,
                    fileName: "3.jpg",
                    url: "https://asarayja.github.io/redfox/bilder/3.jpg",
                    alt: "VR Redfox",
                    captionNo: "VR Redfox",
                    captionEn: "VR Redfox"
                },
                {
                    id: 4,
                    fileName: "4.jpg",
                    url: "https://asarayja.github.io/redfox/bilder/4.jpg",
                    alt: "Real Redfox",
                    captionNo: "Real Redfox",
                    captionEn: "Real Redfox"
                }
            ],
            themes: [
                {
                    id: 1,
                    name: {
                        no: "Mørk Redfox (Standard)",
                        en: "Dark Redfox (Standard)"
                    },
                    isDefault: true,
                    colors: {
                        background: "#1e1e1e",
                        textColor: "#f0f0f0",
                        headerColor: "#3b0000",
                        accentColor: "#a70101",
                        navColor: "#2e2e2e"
                    }
                },
                {
                    id: 2,
                    name: {
                        no: "Lys Redfox",
                        en: "Light Redfox"
                    },
                    isDefault: false,
                    colors: {
                        background: "#f5f5f5",
                        textColor: "#333333",
                        headerColor: "#a70101",
                        accentColor: "#d63031",
                        navColor: "#ffffff"
                    }
                }
            ],
            pages: [
            ],
            translations: {
                no: {
                    site_title: "Velkommen til Redfox sin verden!",
                    nav_about: "Om Meg",
                    nav_music: "Musikk",
                    nav_gallery: "Bilder",
                    about_title: "Om Redfox",
                    personal_title: "Personlig Profil",
                    about_label_name: "Navn:",
                    about_value_name: "Redfox",
                    about_label_birthday: "Bursdag:",
                    about_value_birthday: "30. november",
                    about_label_age: "Alder:",
                    about_value_age: "37 år",
                    about_label_interests: "Interesser:",
                    about_value_interests: "Spille pc‑spill og se serier",
                    about_label_likes: "Liker:",
                    about_value_likes: "Gå turer, være med venner, være kreativ i furry‑fellesskapet og le",
                    about_label_favgame: "Favorittspill:",
                    about_value_favgame: "VR Chat",
                    fursona_title: "Fursona‑profil",
                    fursona_label_name: "Navn:",
                    fursona_value_name: "Redfox",
                    fursona_label_fursona: "Fursona:",
                    fursona_value_fursona: "Rev",
                    fursona_label_origin: "Opprinnelse:",
                    fursona_value_origin: "Nordisk ørkenrev",
                    fursona_label_traits: "Egenskaper:",
                    fursona_value_traits: "Lur, leken, nysgjerrig",
                    fursona_label_story: "Bakgrunn:",
                    fursona_value_story: "Vokste opp på tundraen, elsker eventyr og samspill med venner.",
                    music_title: "Musikk",
                    gallery_title: "Bilder",
                    album1_title: "Album: Redfox – Full Rulle",
                    album2_title: "Album: Redfox – Turbopels og Tøys",
                    album3_title: "Album: Redfox – Tails of Trouble",
                    album4_title: "Album: Redfox – Linje 9 er Opptatt",
                    album5_title: "Album: Redfox – Toalettrock",
                    album6_title: "Album: Redfox – Furry med Fullt Register",
                    album7_title: "Album: Redfox – Full Systemfeil"
                },
                en: {
                    site_title: "Welcome to Redfox's world!",
                    nav_about: "About Me",
                    nav_music: "Music",
                    nav_gallery: "Gallery",
                    about_title: "About Redfox",
                    personal_title: "Personal Profile",
                    about_label_name: "Name:",
                    about_value_name: "Redfox",
                    about_label_birthday: "Birthday:",
                    about_value_birthday: "November 30",
                    about_label_age: "Age:",
                    about_value_age: "37 years",
                    about_label_interests: "Interests:",
                    about_value_interests: "Playing PC games and watching series",
                    about_label_likes: "Likes:",
                    about_value_likes: "Going for walks, hanging out with friends, being creative in the furry community and laughing",
                    about_label_favgame: "Favorite game:",
                    about_value_favgame: "VR Chat",
                    fursona_title: "Fursona Profile",
                    fursona_label_name: "Name:",
                    fursona_value_name: "Redfox",
                    fursona_label_fursona: "Fursona:",
                    fursona_value_fursona: "Fox",
                    fursona_label_origin: "Origin:",
                    fursona_value_origin: "Nordic desert fox",
                    fursona_label_traits: "Traits:",
                    fursona_value_traits: "Cunning, playful, curious",
                    fursona_label_story: "Background:",
                    fursona_value_story: "Grew up on the tundra, loves adventure and hanging out with friends.",
                    music_title: "Music",
                    gallery_title: "Pictures",
                    album1_title: "Album: Redfox – Full Throttle",
                    album2_title: "Album: Redfox – Turbo Fur and Toys",
                    album3_title: "Album: Redfox – Tails of Trouble",
                    album4_title: "Album: Redfox – Line 9 is Busy",
                    album5_title: "Album: Redfox – Toilet Rock",
                    album6_title: "Album: Redfox – Furry with Full Range",
                    album7_title: "Album: Redfox – System Error"
                }
            },
            settings: {
                activeTheme: 1,
                defaultLanguage: 'no'
            }
        };

        // Initialize if no data exists
        if (!localStorage.getItem('redfoxAdminData')) {
            localStorage.setItem('redfoxAdminData', JSON.stringify(defaultData));
        }
    }

    // Load admin data from localStorage
    loadAdminData() {
        const data = localStorage.getItem('redfoxAdminData');
        if (data) {
            this.adminData = JSON.parse(data);
        } else {
            // If no data exists, use default data and save it
            this.initializeData();
            this.adminData = JSON.parse(localStorage.getItem('redfoxAdminData'));
        }
        this.loadPersonalProfile();
        this.loadFursonaProfile();
        // this.loadTranslations(); // Removed since translations UI is removed
        this.loadAlbums();
        this.loadImages();
        this.loadThemes();
        this.loadPages();
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('redfoxAdminData', JSON.stringify(this.adminData));
        this.showSuccessMessage('Data lagret!');
    }

    // Show success message
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const main = document.querySelector('.admin-main');
        main.insertBefore(successDiv, main.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Show error message
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const main = document.querySelector('.admin-main');
        main.insertBefore(errorDiv, main.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Load personal profile data
    loadPersonalProfile() {
        const personal = this.adminData.personal;
        
        // Initialize with default data if language structure doesn't exist
        if (!personal.no) {
            personal.no = {
                name: "Redfox",
                birthday: "30. november",
                age: "37 år",
                interests: "Spille pc‑spill og se serier",
                likes: "Gå turer, være med venner, være kreativ i furry‑fellesskapet og le",
                favgame: "VR Chat"
            };
        }
        if (!personal.en) {
            personal.en = {
                name: "Redfox",
                birthday: "November 30",
                age: "37 years",
                interests: "Playing PC games and watching series",
                likes: "Going for walks, hanging out with friends, being creative in the furry community and laughing",
                favgame: "VR Chat"
            };
        }
        
        // Load Norwegian data
        const noElements = [
            { id: 'personal-name-no', value: personal.no.name || '' },
            { id: 'personal-birthday-no', value: personal.no.birthday || '' },
            { id: 'personal-age-no', value: personal.no.age || '' },
            { id: 'personal-interests-no', value: personal.no.interests || '' },
            { id: 'personal-likes-no', value: personal.no.likes || '' },
            { id: 'personal-favgame-no', value: personal.no.favgame || '' }
        ];
        
        // Load English data
        const enElements = [
            { id: 'personal-name-en', value: personal.en.name || '' },
            { id: 'personal-birthday-en', value: personal.en.birthday || '' },
            { id: 'personal-age-en', value: personal.en.age || '' },
            { id: 'personal-interests-en', value: personal.en.interests || '' },
            { id: 'personal-likes-en', value: personal.en.likes || '' },
            { id: 'personal-favgame-en', value: personal.en.favgame || '' }
        ];
        
        // Profile picture (language independent)
        const profilePictureElement = document.getElementById('personal-profilePicture');
        if (profilePictureElement) {
            profilePictureElement.value = personal.profilePicture || '';
        }
        
        [...noElements, ...enElements].forEach(elem => {
            const element = document.getElementById(elem.id);
            if (element) {
                element.value = elem.value;
            }
        });
    }

    // Load fursona profile data
    loadFursonaProfile() {
        const fursona = this.adminData.fursona;
        
        // Initialize with default data if language structure doesn't exist
        if (!fursona.no) {
            fursona.no = {
                name: "Redfox",
                type: "Rev",
                origin: "Nordisk ørkenrev",
                traits: "Lur, leken, nysgjerrig",
                story: "Vokste opp på tundraen, elsker eventyr og samspill med venner."
            };
        }
        if (!fursona.en) {
            fursona.en = {
                name: "Redfox",
                type: "Fox",
                origin: "Nordic desert fox",
                traits: "Cunning, playful, curious",
                story: "Grew up on the tundra, loves adventure and hanging out with friends."
            };
        }
        
        // Load Norwegian data
        const noElements = [
            { id: 'fursona-name-no', value: fursona.no.name || '' },
            { id: 'fursona-type-no', value: fursona.no.type || '' },
            { id: 'fursona-origin-no', value: fursona.no.origin || '' },
            { id: 'fursona-traits-no', value: fursona.no.traits || '' },
            { id: 'fursona-story-no', value: fursona.no.story || '' }
        ];
        
        // Load English data
        const enElements = [
            { id: 'fursona-name-en', value: fursona.en.name || '' },
            { id: 'fursona-type-en', value: fursona.en.type || '' },
            { id: 'fursona-origin-en', value: fursona.en.origin || '' },
            { id: 'fursona-traits-en', value: fursona.en.traits || '' },
            { id: 'fursona-story-en', value: fursona.en.story || '' }
        ];
        
        [...noElements, ...enElements].forEach(elem => {
            const element = document.getElementById(elem.id);
            if (element) {
                element.value = elem.value;
            }
        });
    }

    // Load translations
    loadTranslations() {
        // Translations section removed - skip loading
        // this.renderTranslations('no');
        // this.renderTranslations('en');
    }

    renderTranslations(lang) {
        // Translations section removed - check if container exists before rendering
        const container = document.getElementById(`${lang === 'no' ? 'norwegian' : 'english'}-translations`);
        if (!container) {
            return; // Exit early if translations container doesn't exist
        }
        
        container.innerHTML = '';
        
        const translations = this.adminData.translations[lang];
        
        Object.entries(translations).forEach(([key, value]) => {
            const div = document.createElement('div');
            div.className = 'translation-item';
            div.innerHTML = `
                <div class="translation-key">${key}</div>
                <input type="text" class="form-input translation-value" 
                       value="${value}" 
                       onchange="admin.updateTranslation('${lang}', '${key}', this.value)">
            `;
            container.appendChild(div);
        });
    }

    updateTranslation(lang, key, value) {
        this.adminData.translations[lang][key] = value;
    }

    // Load albums
    loadAlbums() {
        const container = document.getElementById('albumList');
        container.innerHTML = '';
        
        this.adminData.albums.forEach(album => {
            const div = document.createElement('div');
            div.className = 'album-item';
            div.innerHTML = `
                <div class="item-title">${album.titleNo}</div>
                <div>Sanger: ${album.songs.length}</div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="admin.editAlbum(${album.id})">✏️ Rediger</button>
                    <button class="delete-btn" onclick="admin.deleteAlbum(${album.id})">🗑️ Slett</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Load images
    loadImages() {
        const container = document.getElementById('imageList');
        container.innerHTML = '';
        
        this.adminData.images.forEach(image => {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.innerHTML = `
                <div class="item-title">${image.captionNo}</div>
                <img src="${image.url}" alt="${image.alt}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 8px; margin: 10px 0;">
                <div class="item-actions">
                    <button class="edit-btn" onclick="admin.editImage(${image.id})">✏️ Rediger</button>
                    <button class="delete-btn" onclick="admin.deleteImage(${image.id})">🗑️ Slett</button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Load themes
    loadThemes() {
        const container = document.getElementById('themeList');
        const select = document.getElementById('activeThemeSelect');
        
        if (!container || !select) {
            return;
        }
        
        container.innerHTML = '';
        select.innerHTML = '<option value="">Velg aktivt tema</option>';
        
        if (!this.adminData || !this.adminData.themes) {
            return;
        }
        
        this.adminData.themes.forEach(theme => {
            const themeName = typeof theme.name === 'object' ? 
                (theme.name[this.currentLang] || theme.name.no || theme.name.en) : 
                theme.name;
                
            const div = document.createElement('div');
            div.className = 'theme-item';
            div.innerHTML = `
                <div class="item-title">${themeName} ${theme.isDefault ? '(Standard)' : ''}</div>
                <div style="display: flex; gap: 10px; margin: 10px 0;">
                    <div style="width: 30px; height: 30px; background: ${theme.colors.background}; border-radius: 50%; border: 2px solid white;"></div>
                    <div style="width: 30px; height: 30px; background: ${theme.colors.headerColor}; border-radius: 50%; border: 2px solid white;"></div>
                    <div style="width: 30px; height: 30px; background: ${theme.colors.accentColor}; border-radius: 50%; border: 2px solid white;"></div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="admin.editTheme(${theme.id})">✏️ Rediger</button>
                    ${!theme.isDefault ? `<button class="delete-btn" onclick="admin.deleteTheme(${theme.id})">🗑️ Slett</button>` : ''}
                </div>
            `;
            container.appendChild(div);
            
            const option = document.createElement('option');
            option.value = theme.id;
            option.textContent = themeName;
            if (this.adminData.settings && this.adminData.settings.activeTheme === theme.id) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    // Load pages
    loadPages() {
        const container = document.getElementById('pageList');
        container.innerHTML = '';
        
        // Filter out standard pages (about, music, gallery) - these are managed separately
        const standardPages = ['about', 'music', 'gallery'];
        const customPages = this.adminData.pages.filter(page => !standardPages.includes(page.name));
        
        customPages.forEach(page => {
            const div = document.createElement('div');
            div.className = 'page-item';
            div.innerHTML = `
                <div class="item-title">${page.titleNo}</div>
                <div>ID: ${page.name}</div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="admin.editPage(${page.id})">✏️ Rediger</button>
                    <button class="delete-btn" onclick="admin.deletePage(${page.id})">🗑️ Slett</button>
                </div>
            `;
            container.appendChild(div);
        });
        
        if (customPages.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Ingen egendefinerte sider opprettet ennå. Klikk "Ny Side" for å legge til en.</p>';
        }
    }

    // Generate updated main site
    generateMainSite() {
        const theme = this.adminData.themes.find(t => t.id === this.adminData.settings.activeTheme) || this.adminData.themes[0];
        const translations = this.adminData.translations;
        const personal = this.adminData.personal;
        const fursona = this.adminData.fursona;
        
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
    }

    // Format page content with simple markdown-like formatting
    formatPageContent(content) {
        if (!content) return '';
        
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/<small>(.*?)<\/small>/g, '<span style="font-size: 0.8em;">$1</span>')
            .replace(/<large>(.*?)<\/large>/g, '<span style="font-size: 1.2em;">$1</span>')
            .replace(/<xlarge>(.*?)<\/xlarge>/g, '<span style="font-size: 1.4em;">$1</span>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^(.*)$/gim, '<p>$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
    }

    generateSiteHTML() {
        const theme = this.adminData.themes.find(t => t.id === this.adminData.settings.activeTheme) ||
            this.adminData.themes.find(t => t.isDefault);
        const personal = this.adminData.personal;
        const fursona = this.adminData.fursona;
        
        const translations = {
            no: {
                site_title: "Velkommen til Redfox sin verden!",
                nav_about: "Om Meg",
                nav_music: "Musikk",
                nav_gallery: "Galleri",
                about_title: "Om Redfox",
                personal_title: "Personlig Profil",
                about_label_name: "Navn:",
                about_value_name: personal.name,
                about_label_birthday: "Bursdag:",
                about_value_birthday: personal.birthday,
                about_label_age: "Alder:",
                about_value_age: personal.age,
                about_label_interests: "Interesser:",
                about_value_interests: personal.interests,
                about_label_likes: "Liker:",
                about_value_likes: personal.likes,
                about_label_favgame: "Favorittspill:",
                about_value_favgame: personal.favgame,
                fursona_title: "Fursona Profil",
                fursona_label_name: "Navn:",
                fursona_value_name: fursona.name,
                fursona_label_fursona: "Fursona:",
                fursona_value_fursona: fursona.type,
                fursona_label_origin: "Opprinnelse:",
                fursona_value_origin: fursona.origin,
                fursona_label_traits: "Egenskaper:",
                fursona_value_traits: fursona.traits,
                fursona_label_story: "Bakgrunn:",
                fursona_value_story: fursona.story,
                music_title: "Musikk",
                search_music: "Søk i album og sanger...",
                clear_search: "✕ Tøm søk",
                no_results: "Ingen resultater funnet",
                try_another: "Prøv et annet søkeord...",
                theme_dark: "Mørk modus",
                theme_light: "Lys modus",
                album1_title: "Album: Redfox – Full Rulle (Norsk album)",
                album2_title: "Album: Redfox – Turbopels og Tøys (Norsk album)",
                album3_title: "Album: Redfox – Haler av problemer (Engelsk album)",
                album4_title: "Album: Redfox – Linje 9 er Opptatt (Norsk album)",
                album5_title: "Album: Redfox – Toalettrock (Norsk album)",
                album6_title: "Album: Redfox – Furry med Fullt Register (Norsk album)",
                album7_title: "Album: Redfox – Full – Systemfeil (Norsk album)",
                gallery_title: "Bilder",
                gallery_caption1: "Redfox-logo",
                gallery_caption2: "VR Redfox",
                gallery_caption3: "VR Redfox",
                gallery_caption4: "Ekte Redfox"
            },
            en: {
                site_title: "Welcome to Redfox's world!",
                nav_about: "About Me",
                nav_music: "Music",
                nav_gallery: "Gallery",
                about_title: "About Redfox",
                personal_title: "Personal Profile",
                about_label_name: "Name:",
                about_value_name: personal.name,
                about_label_birthday: "Birthday:",
                about_value_birthday: personal.birthday,
                about_label_age: "Age:",
                about_value_age: personal.age,
                about_label_interests: "Interests:",
                about_value_interests: personal.interests,
                about_label_likes: "Likes:",
                about_value_likes: personal.likes,
                about_label_favgame: "Favorite game:",
                about_value_favgame: personal.favgame,
                fursona_title: "Fursona Profile",
                fursona_label_name: "Name:",
                fursona_value_name: fursona.name,
                fursona_label_fursona: "Fursona:",
                fursona_value_fursona: fursona.type,
                fursona_label_origin: "Origin:",
                fursona_value_origin: fursona.origin,
                fursona_label_traits: "Traits:",
                fursona_value_traits: fursona.traits,
                fursona_label_story: "Background:",
                fursona_value_story: fursona.story,
                music_title: "Music",
                search_music: "Search albums and songs...",
                clear_search: "✕ Clear search",
                no_results: "No results found",
                try_another: "Try another search term...",
                theme_dark: "Dark mode",
                theme_light: "Light mode",
                album1_title: "Album: Redfox – Full Throttle (Norwegian album)",
                album2_title: "Album: Redfox – Turbofur & Tomfoolery (Norwegian album)",
                album3_title: "Album: Redfox – Tails of Trouble (English album)",
                album4_title: "Album: Redfox – Line 9 is Busy (Norwegian album)",
                album5_title: "Album: Redfox – Toiletrock (Norwegian album)",
                album6_title: "Album: Redfox – Furry with Full Register (Norwegian album)",
                album7_title: "Album: Redfox – Full System Failure (Norwegian album)",
                gallery_title: "Pictures",
                gallery_caption1: "Redfox-logo",
                gallery_caption2: "VR Redfox",
                gallery_caption3: "VR Redfox",
                gallery_caption4: "Real Redfox"
            }
        };

        const html = `<!DOCTYPE html>
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
    .header-buttons {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    #langToggle, #themeToggle {
      padding: 5px 10px;
      background-color: ${theme.colors.navColor};
      color: ${theme.colors.textColor};
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.9em;
      transition: background-color 0.3s ease;
    }
    #langToggle:hover, #themeToggle:hover {
      background-color: ${theme.colors.accentColor};
    }
    #themeToggle {
      display: flex;
      align-items: center;
      gap: 5px;
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
    
    /* Music Search Styles */
    .music-search {
      margin: 20px 0;
      text-align: center;
    }
    .music-search input {
      padding: 10px 15px;
      font-size: 16px;
      border: 2px solid ${theme.colors.accentColor};
      border-radius: 25px;
      background: ${theme.colors.navColor};
      color: ${theme.colors.textColor};
      width: 300px;
      margin-right: 10px;
      font-family: inherit;
    }
    .music-search button {
      padding: 10px 15px;
      background: ${theme.colors.accentColor};
      color: ${theme.colors.textColor};
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-family: inherit;
    }
    .music-search button:hover {
      background: ${theme.colors.headerColor};
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
      background: linear-gradient(45deg, #a70101, #8b0000);
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
    
    /* Light Theme Styles */
    body.light-theme {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: #333;
    }
    body.light-theme header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    body.light-theme nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    body.light-theme nav a {
      color: #4a5568;
    }
    body.light-theme nav a:hover, body.light-theme nav a.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    body.light-theme .album, body.light-theme .subsection, body.light-theme figure {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    }
    body.light-theme .music-search input {
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      border: 1px solid #ddd;
    }
    body.light-theme .music-search button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  </style>
</head>

<body>
  <button id="adminPanelBtn" onclick="window.open('admin.html', '_blank')" title="Åpne Admin Panel">⚙️</button>

  <header>
    <img src="${this.adminData.images[0] ? this.adminData.images[0].url : 'https://i.imgur.com/pMJfpb3.png'}" alt="Redfox logo">
    <h1 data-i18n="site_title">${translations.no.site_title}</h1>
    <div class="header-buttons">
      <button id="themeToggle" title="Bytt tema">🌙 <span id="themeText" data-i18n="theme_light">Lys modus</span></button>
      <button id="langToggle">English</button>
    </div>
  </header>

  <nav>
    <ul>
      <li><a href="#" id="menu-about" class="active" data-i18n="nav_about">Om Meg</a></li>
      <li><a href="#" id="menu-music" data-i18n="nav_music">Musikk</a></li>
      <li><a href="#" id="menu-gallery" data-i18n="nav_gallery">Bilder</a></li>
      ${this.adminData.pages.filter(page => !['about', 'music', 'gallery'].includes(page.name)).map(page => `
        <li><a href="#" id="menu-${page.name}" data-i18n="nav_${page.name}">${page.titleNo}</a></li>
      `).join('')}
    </ul>
  </nav>

  <!-- Om Meg -->
  <section id="about">
    <h1 data-i18n="about_title">Om Redfox</h1>
    <div class="subsection" id="personal-profile">
      <h2 data-i18n="personal_title">${translations.no.personal_title}</h2>
      <img id="profilePicture" src="${personal.profilePicture || 'https://i.imgur.com/pMJfpb3.png'}" alt="Redfox Profile Picture" class="profile-picture">
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
  </section>

  <!-- Musikk -->
  <section id="music" style="display: none;">
    <h1 data-i18n="music_title">Musikk</h1>
    <div class="music-search">
      <input type="text" id="musicSearchInput" placeholder="Søk i album og sanger..." data-i18n-placeholder="search_music">
      <button id="clearSearch" data-i18n="clear_search">✕ Tøm søk</button>
    </div>
    <div id="musicResults">
      ${this.adminData.albums.map(album => `
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
    </div>
  </section>

  <!-- Bilder -->
  <section id="gallery" style="display: none;">
    <h1 data-i18n="gallery_title">Bilder</h1>
    <div class="image-grid">
      ${this.adminData.images.slice(1).map((image, index) => `
        <figure>
          <img src="${image.url}" alt="${image.alt}">
          <figcaption data-i18n="gallery_caption${index + 2}">${image.captionNo}</figcaption>
        </figure>
      `).join('')}
    </div>
  </section>

  <!-- Custom Pages -->
  ${this.adminData.pages.map(page => `
    <section id="${page.name}" style="display: none;">
      <h1 data-i18n="${page.name}_title">${page.titleNo}</h1>
      <div class="custom-page-content">
        ${this.formatPageContent(page.contentNo)}
      </div>
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

      // Theme toggle functionality
      const themeToggle = document.getElementById('themeToggle');
      
      // Load saved theme
      const savedTheme = localStorage.getItem('redfox-theme') || 'dark';
      applyTheme(savedTheme);
      
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('redfox-theme', newTheme);
      });
      
      function applyTheme(theme) {
        if (theme === 'light') {
          document.body.classList.add('light-theme');
          themeToggle.innerHTML = '☀️ <span id="themeText" data-i18n="theme_dark">Mørk modus</span>';
        } else {
          document.body.classList.remove('light-theme');
          themeToggle.innerHTML = '🌙 <span id="themeText" data-i18n="theme_light">Lys modus</span>';
        }
        // Update theme text with current language
        updateThemeText();
      }

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
      showSection('${this.adminData.pages[0].name}');

      // Music search functionality
      const musicSearch = document.getElementById('musicSearch');
      const clearSearch = document.getElementById('clearSearch');
      const musicItems = document.querySelectorAll('.music-item');

      function performMusicSearch(query) {
        const searchTerm = query.toLowerCase();
        let hasResults = false;
        
        musicItems.forEach(item => {
          const title = item.querySelector('p').textContent.toLowerCase();
          if (searchTerm === '' || title.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
          } else {
            item.style.display = 'none';
          }
        });
      }

      if (musicSearch) {
        musicSearch.addEventListener('input', (e) => {
          performMusicSearch(e.target.value);
        });
      }

      if (clearSearch) {
        clearSearch.addEventListener('click', () => {
          if (musicSearch) {
            musicSearch.value = '';
            performMusicSearch('');
          }
        });
      }

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

    // Page management methods
    editPage(pageId) {
        const page = this.adminData.pages.find(p => p.id === pageId);
        if (!page) return;
        
        this.currentPage = page;
        document.getElementById('pageModalTitle').textContent = 'Rediger Side';
        document.getElementById('pageName').value = page.name;
        document.getElementById('pageTitleNo').value = page.titleNo;
        document.getElementById('pageTitleEn').value = page.titleEn;
        document.getElementById('pageContentNo').value = page.contentNo;
        document.getElementById('pageContentEn').value = page.contentEn;
        document.getElementById('pageModal').style.display = 'block';
    }

    deletePage(pageId) {
        const page = this.adminData.pages.find(p => p.id === pageId);
        if (!page) return;
        
        // Prevent deletion of standard pages
        const standardPages = ['about', 'music', 'gallery'];
        if (standardPages.includes(page.name)) {
            this.showErrorMessage('Kan ikke slette standardsider (Om Meg, Musikk, Bilder). Disse håndteres via egne faner.');
            return;
        }
        
        const confirmation = prompt('For å slette denne siden, skriv "SLETT" i store bokstaver:');
        if (confirmation === 'SLETT') {
            this.adminData.pages = this.adminData.pages.filter(p => p.id !== pageId);
            this.saveData();
            this.loadPages();
            this.generateMainSite(); // Regenerate main site to remove page
            this.showSuccessMessage('Side slettet!');
        } else if (confirmation !== null) {
            this.showErrorMessage('Sletting avbrutt - feil bekreftelse');
        }
    }
}

// Global admin instance
let admin;

// Login functionality
function handleLoginKeypress(event) {
    if (event.key === 'Enter') {
        login();
    }
}

function login() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    
    // Get stored users or use defaults
    const storedUsers = localStorage.getItem('redfoxUsers');
    let validUsers;
    
    if (storedUsers) {
        validUsers = JSON.parse(storedUsers);
    } else {
        // Default users with encrypted passwords
        validUsers = {
            'redfox': hashPassword('M1ttNavn3rRedfox2025?'),
            'Asarayja': hashPassword('JegH3terMel1ssa1dag2025?')
        };
        localStorage.setItem('redfoxUsers', JSON.stringify(validUsers));
    }
    
    const inputPasswordHash = hashPassword(password);
    
    // Check if username exists and password matches
    if (validUsers[username] && inputPasswordHash === validUsers[username]) {
        // Set session with 24 hour expiry
        const sessionExpiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        localStorage.setItem('redfoxAdminSession', sessionExpiry.toString());
        localStorage.setItem('redfoxCurrentUser', username);
        
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        
        // Update user display
        document.getElementById('currentUserDisplay').textContent = `Innlogget som: ${username}`;
        
        // Initialize admin
        admin = new RedfoxAdmin();
        admin.showSuccessMessage(`Velkommen, ${username}!`);
    } else {
        document.getElementById('loginError').textContent = 'Feil brukernavn eller passord!';
    }
}

function logout() {
    // Clear session and user data
    localStorage.removeItem('redfoxAdminSession');
    localStorage.removeItem('redfoxCurrentUser');
    
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
    document.getElementById('loginError').textContent = '';
    document.getElementById('currentUserDisplay').textContent = '';
}

function checkSession() {
    const sessionExpiry = localStorage.getItem('redfoxAdminSession');
    const currentUser = localStorage.getItem('redfoxCurrentUser');
    
    if (sessionExpiry && Date.now() < parseInt(sessionExpiry)) {
        // Valid session - auto login
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        
        // Update user display
        if (currentUser) {
            document.getElementById('currentUserDisplay').textContent = `Innlogget som: ${currentUser}`;
        }
        
        admin = new RedfoxAdmin();
        if (currentUser) {
            admin.showSuccessMessage(`Automatisk innlogget som ${currentUser}`);
        }
        return true;
    } else {
        // Expired or no session
        localStorage.removeItem('redfoxAdminSession');
        localStorage.removeItem('redfoxCurrentUser');
        return false;
    }
}

// Navigation
function showAdminSection(sectionName) {
    document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('admin-' + sectionName).style.display = 'block';
    document.getElementById('nav-' + sectionName).classList.add('active');
    
    // Update current user display in settings
    if (sectionName === 'settings') {
        const currentUser = localStorage.getItem('redfoxCurrentUser');
        const userDisplay = document.getElementById('currentUserSettings');
        if (userDisplay && currentUser) {
            userDisplay.textContent = currentUser;
        }
    }
}

function showContentTab(tabName) {
    document.querySelectorAll('.content-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('content-' + tabName).style.display = 'block';
    document.getElementById('tab-' + tabName).classList.add('active');
}

function showPersonalLang(lang) {
    document.querySelectorAll('#content-personal .lang-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('#content-personal .lang-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('personal-' + lang).style.display = 'block';
    document.getElementById('personal-lang-' + lang).classList.add('active');
}

function showFursonaLang(lang) {
    document.querySelectorAll('#content-fursona .lang-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('#content-fursona .lang-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('fursona-' + lang).style.display = 'block';
    document.getElementById('fursona-lang-' + lang).classList.add('active');
}

function showTranslationLang(lang) {
    document.querySelectorAll('.translation-content').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('translation-' + lang).style.display = 'block';
    document.getElementById('lang-' + lang).classList.add('active');
    
    admin.currentTranslationLang = lang;
}

// Save functions
function savePersonalProfile() {
    const profilePictureInput = document.getElementById('personal-profilePicture').value;
    const profilePictureUrl = profilePictureInput ? 
        (profilePictureInput.startsWith('http') ? profilePictureInput : `https://asarayja.github.io/redfox/bilder/${profilePictureInput}`) 
        : '';
        
    admin.adminData.personal = {
        no: {
            name: document.getElementById('personal-name-no').value,
            birthday: document.getElementById('personal-birthday-no').value,
            age: document.getElementById('personal-age-no').value,
            interests: document.getElementById('personal-interests-no').value,
            likes: document.getElementById('personal-likes-no').value,
            favgame: document.getElementById('personal-favgame-no').value
        },
        en: {
            name: document.getElementById('personal-name-en').value,
            birthday: document.getElementById('personal-birthday-en').value,
            age: document.getElementById('personal-age-en').value,
            interests: document.getElementById('personal-interests-en').value,
            likes: document.getElementById('personal-likes-en').value,
            favgame: document.getElementById('personal-favgame-en').value
        },
        profilePicture: profilePictureUrl
    };
    admin.saveData();
    alert('Personlig profil lagret!');
}

function saveFursonaProfile() {
    admin.adminData.fursona = {
        no: {
            name: document.getElementById('fursona-name-no').value,
            type: document.getElementById('fursona-type-no').value,
            origin: document.getElementById('fursona-origin-no').value,
            traits: document.getElementById('fursona-traits-no').value,
            story: document.getElementById('fursona-story-no').value
        },
        en: {
            name: document.getElementById('fursona-name-en').value,
            type: document.getElementById('fursona-type-en').value,
            origin: document.getElementById('fursona-origin-en').value,
            traits: document.getElementById('fursona-traits-en').value,
            story: document.getElementById('fursona-story-en').value
        }
    };
    admin.saveData();
    alert('Fursona profil lagret!');
}

function saveTranslations() {
    admin.saveData();
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Album functions
function addNewAlbum() {
    admin.currentAlbum = null;
    document.getElementById('albumModalTitle').textContent = 'Nytt Album';
    document.getElementById('albumName').value = '';
    document.getElementById('albumTitleNo').value = '';
    document.getElementById('albumTitleEn').value = '';
    document.getElementById('songList').innerHTML = '';
    document.getElementById('albumModal').style.display = 'block';
}

function editAlbum(albumId) {
    const album = admin.adminData.albums.find(a => a.id === albumId);
    if (!album) return;
    
    admin.currentAlbum = album;
    document.getElementById('albumModalTitle').textContent = 'Rediger Album';
    document.getElementById('albumName').value = album.name || '';
    document.getElementById('albumTitleNo').value = album.titleNo;
    document.getElementById('albumTitleEn').value = album.titleEn;
    
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    
    album.songs.forEach((song, index) => {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.innerHTML = `
            <input type="text" placeholder="Sangtittel" value="${song.title}" class="form-input" data-field="title" data-index="${index}">
            <input type="text" placeholder="Filnavn (f.eks: sang.mp3)" value="${song.fileName || ''}" class="form-input" data-field="fileName" data-index="${index}">
            <button class="song-remove" onclick="removeSong(${index})">×</button>
        `;
        songList.appendChild(div);
    });
    
    document.getElementById('albumModal').style.display = 'block';
}

function addSong() {
    const songList = document.getElementById('songList');
    const index = songList.children.length;
    
    const div = document.createElement('div');
    div.className = 'song-item';
    div.innerHTML = `
        <input type="text" placeholder="Sangtittel" value="" class="form-input" data-field="title" data-index="${index}">
        <input type="text" placeholder="Filnavn (f.eks: sang.mp3)" value="" class="form-input" data-field="fileName" data-index="${index}">
        <button class="song-remove" onclick="removeSong(${index})">×</button>
    `;
    songList.appendChild(div);
}

function removeSong(index) {
    const songList = document.getElementById('songList');
    songList.children[index].remove();
    
    // Update indices
    Array.from(songList.children).forEach((item, newIndex) => {
        item.querySelectorAll('input').forEach(input => {
            input.setAttribute('data-index', newIndex);
        });
        item.querySelector('.song-remove').setAttribute('onclick', `removeSong(${newIndex})`);
    });
}

function saveAlbum() {
    const albumName = document.getElementById('albumName').value;
    const titleNo = document.getElementById('albumTitleNo').value;
    const titleEn = document.getElementById('albumTitleEn').value;
    
    if (!albumName || !titleNo || !titleEn) {
        admin.showErrorMessage('Album navn og begge titler må fylles ut!');
        return;
    }
    
    const songs = [];
    const songInputs = document.querySelectorAll('#songList .song-item');
    
    songInputs.forEach(item => {
        const title = item.querySelector('[data-field="title"]').value;
        const fileName = item.querySelector('[data-field="fileName"]').value;
        
        if (title && fileName) {
            songs.push({ title, fileName });
        }
    });
    
    if (admin.currentAlbum) {
        // Edit existing
        admin.currentAlbum.name = albumName;
        admin.currentAlbum.titleNo = titleNo;
        admin.currentAlbum.titleEn = titleEn;
        admin.currentAlbum.songs = songs;
        
        // Update translations for the existing album
        admin.adminData.translations.no[`album${admin.currentAlbum.id}_title`] = titleNo;
        admin.adminData.translations.en[`album${admin.currentAlbum.id}_title`] = titleEn;
    } else {
        // Add new
        const newId = Math.max(...admin.adminData.albums.map(a => a.id), 0) + 1;
        admin.adminData.albums.push({
            id: newId,
            name: albumName,
            titleNo,
            titleEn,
            songs
        });
        
        // Add translations for the new album
        admin.adminData.translations.no[`album${newId}_title`] = titleNo;
        admin.adminData.translations.en[`album${newId}_title`] = titleEn;
    }
    
    admin.saveData();
    admin.loadAlbums();
    closeModal('albumModal');
}

function deleteAlbum(albumId) {
    const confirmation = prompt('For å slette dette albumet, skriv "SLETT" i store bokstaver:');
    if (confirmation === 'SLETT') {
        admin.adminData.albums = admin.adminData.albums.filter(a => a.id !== albumId);
        admin.saveData();
        admin.loadAlbums();
        admin.showSuccessMessage('Album slettet!');
    } else if (confirmation !== null) {
        admin.showErrorMessage('Sletting avbrutt - feil bekreftelse');
    }
}

// Image functions
function addNewImage() {
    admin.currentImage = null;
    document.getElementById('imageModalTitle').textContent = 'Nytt Bilde';
    document.getElementById('imageFileName').value = '';
    document.getElementById('imageAlt').value = '';
    document.getElementById('imageCaptionNo').value = '';
    document.getElementById('imageCaptionEn').value = '';
    document.getElementById('imageModal').style.display = 'block';
}

function editImage(imageId) {
    const image = admin.adminData.images.find(i => i.id === imageId);
    if (!image) return;
    
    admin.currentImage = image;
    document.getElementById('imageModalTitle').textContent = 'Rediger Bilde';
    document.getElementById('imageFileName').value = image.fileName || '';
    document.getElementById('imageAlt').value = image.alt;
    document.getElementById('imageCaptionNo').value = image.captionNo;
    document.getElementById('imageCaptionEn').value = image.captionEn;
    document.getElementById('imageModal').style.display = 'block';
}

function saveImage() {
    const fileName = document.getElementById('imageFileName').value;
    const alt = document.getElementById('imageAlt').value;
    const captionNo = document.getElementById('imageCaptionNo').value;
    const captionEn = document.getElementById('imageCaptionEn').value;
    
    if (!fileName || !alt || !captionNo || !captionEn) {
        admin.showErrorMessage('Alle felter må fylles ut!');
        return;
    }
    
    // Generate URL from filename
    let url;
    if (fileName === 'logo.png' || fileName.includes('imgur.com') || fileName.startsWith('https://')) {
        // Special case for logo or full URLs
        url = fileName.startsWith('https://') ? fileName : 'https://i.imgur.com/pMJfpb3.png';
    } else {
        url = `https://asarayja.github.io/redfox/bilder/${fileName}`;
    }
    
    if (admin.currentImage) {
        // Edit existing
        admin.currentImage.fileName = fileName;
        admin.currentImage.url = url;
        admin.currentImage.alt = alt;
        admin.currentImage.captionNo = captionNo;
        admin.currentImage.captionEn = captionEn;
    } else {
        // Add new
        const newId = Math.max(...admin.adminData.images.map(i => i.id), 0) + 1;
        admin.adminData.images.push({
            id: newId,
            fileName,
            url,
            alt,
            captionNo,
            captionEn
        });
    }
    
    admin.saveData();
    admin.loadImages();
    closeModal('imageModal');
}

function deleteImage(imageId) {
    const confirmation = prompt('For å slette dette bildet, skriv "SLETT" i store bokstaver:');
    if (confirmation === 'SLETT') {
        admin.adminData.images = admin.adminData.images.filter(i => i.id !== imageId);
        admin.saveData();
        admin.loadImages();
        admin.showSuccessMessage('Bilde slettet!');
    } else if (confirmation !== null) {
        admin.showErrorMessage('Sletting avbrutt - feil bekreftelse');
    }
}

// Theme functions
function addNewTheme() {
    admin.currentTheme = null;
    document.getElementById('themeModalTitle').textContent = 'Nytt Tema';
    document.getElementById('themeNameNo').value = '';
    document.getElementById('themeNameEn').value = '';
    document.getElementById('themeBackground').value = '#1e1e1e';
    document.getElementById('themeTextColor').value = '#f0f0f0';
    document.getElementById('themeHeaderColor').value = '#3b0000';
    document.getElementById('themeAccentColor').value = '#a70101';
    document.getElementById('themeNavColor').value = '#2e2e2e';
    document.getElementById('themeModal').style.display = 'block';
}

function editTheme(themeId) {
    const theme = admin.adminData.themes.find(t => t.id === themeId);
    if (!theme) return;
    
    admin.currentTheme = theme;
    document.getElementById('themeModalTitle').textContent = 'Rediger Tema';
    document.getElementById('themeNameNo').value = theme.name?.no || theme.name || '';
    document.getElementById('themeNameEn').value = theme.name?.en || theme.name || '';
    document.getElementById('themeBackground').value = theme.colors.background;
    document.getElementById('themeTextColor').value = theme.colors.textColor;
    document.getElementById('themeHeaderColor').value = theme.colors.headerColor;
    document.getElementById('themeAccentColor').value = theme.colors.accentColor;
    document.getElementById('themeNavColor').value = theme.colors.navColor;
    document.getElementById('themeModal').style.display = 'block';
}

function saveTheme() {
    const nameNo = document.getElementById('themeNameNo').value;
    const nameEn = document.getElementById('themeNameEn').value;
    const colors = {
        background: document.getElementById('themeBackground').value,
        textColor: document.getElementById('themeTextColor').value,
        headerColor: document.getElementById('themeHeaderColor').value,
        accentColor: document.getElementById('themeAccentColor').value,
        navColor: document.getElementById('themeNavColor').value
    };
    
    if (!nameNo || !nameEn) {
        admin.showErrorMessage('Begge tema navn må fylles ut!');
        return;
    }
    
    const themeName = {
        no: nameNo,
        en: nameEn
    };
    
    if (admin.currentTheme) {
        // Edit existing
        admin.currentTheme.name = themeName;
        admin.currentTheme.colors = colors;
    } else {
        // Add new
        const newId = Math.max(...admin.adminData.themes.map(t => t.id), 0) + 1;
        admin.adminData.themes.push({
            id: newId,
            name: themeName,
            isDefault: false,
            colors
        });
    }
    
    admin.saveData();
    admin.loadThemes();
    closeModal('themeModal');
}

function deleteTheme(themeId) {
    const theme = admin.adminData.themes.find(t => t.id === themeId);
    if (theme && theme.isDefault) {
        admin.showErrorMessage('Kan ikke slette standard tema!');
        return;
    }
    
    const confirmation = prompt('For å slette dette temaet, skriv "SLETT" i store bokstaver:');
    if (confirmation === 'SLETT') {
        admin.adminData.themes = admin.adminData.themes.filter(t => t.id !== themeId);
        
        // If deleted theme was active, set to default
        if (admin.adminData.settings.activeTheme === themeId) {
            admin.adminData.settings.activeTheme = admin.adminData.themes.find(t => t.isDefault).id;
        }
        
        admin.saveData();
        admin.loadThemes();
        admin.showSuccessMessage('Tema slettet!');
    } else if (confirmation !== null) {
        admin.showErrorMessage('Sletting avbrutt - feil bekreftelse');
    }
}

function setActiveTheme() {
    const themeId = parseInt(document.getElementById('activeThemeSelect').value);
    if (themeId) {
        admin.adminData.settings.activeTheme = themeId;
        admin.saveData();
    }
}

// Page functions
function addNewPage() {
    // Ensure admin is initialized
    if (!admin) {
        // Check if user is logged in and initialize admin
        const sessionExpiry = localStorage.getItem('redfoxAdminSession');
        if (sessionExpiry && Date.now() < parseInt(sessionExpiry)) {
            admin = new RedfoxAdmin();
        } else {
            alert('Du må logge inn først');
            return;
        }
    }
    
    admin.currentPage = null;
    
    const modal = document.getElementById('pageModal');
    if (!modal) {
        alert('Page modal ikke funnet');
        return;
    }
    
    // Check if all required elements exist
    const elements = [
        'pageModalTitle',
        'pageName', 
        'pageTitleNo',
        'pageTitleEn',
        'pageContentNo',
        'pageContentEn'
    ];
    
    for (let elementId of elements) {
        const element = document.getElementById(elementId);
        if (!element) {
            alert(`Element ${elementId} ikke funnet`);
            return;
        }
    }
    
    document.getElementById('pageModalTitle').textContent = 'Ny Side';
    document.getElementById('pageName').value = '';
    document.getElementById('pageTitleNo').value = '';
    document.getElementById('pageTitleEn').value = '';
    document.getElementById('pageContentNo').value = '';
    document.getElementById('pageContentEn').value = '';
    
    modal.style.display = 'block';
}

function editPage(pageId) {
    const page = admin.adminData.pages.find(p => p.id === pageId);
    if (!page) return;
    
    admin.currentPage = page;
    document.getElementById('pageModalTitle').textContent = 'Rediger Side';
    document.getElementById('pageName').value = page.name;
    document.getElementById('pageTitleNo').value = page.titleNo;
    document.getElementById('pageTitleEn').value = page.titleEn;
    document.getElementById('pageContentNo').value = page.contentNo;
    document.getElementById('pageContentEn').value = page.contentEn;
    document.getElementById('pageModal').style.display = 'block';
}

function savePage() {
    const name = document.getElementById('pageName').value;
    const titleNo = document.getElementById('pageTitleNo').value;
    const titleEn = document.getElementById('pageTitleEn').value;
    const contentNo = document.getElementById('pageContentNo').value;
    const contentEn = document.getElementById('pageContentEn').value;
    
    if (!name || !titleNo || !titleEn) {
        admin.showErrorMessage('Navn og titler må fylles ut!');
        return;
    }
    
    // Prevent creating pages with standard page names
    const standardPages = ['about', 'music', 'gallery'];
    if (!admin.currentPage && standardPages.includes(name.toLowerCase())) {
        admin.showErrorMessage(`Kan ikke bruke "${name}" som sidenavn - dette er reservert for standardsider. Bruk et annet navn.`);
        return;
    }
    
    // Check for duplicate names (except when editing current page)
    const existingPage = admin.adminData.pages.find(p => p.name === name && (!admin.currentPage || p.id !== admin.currentPage.id));
    if (existingPage) {
        admin.showErrorMessage(`En side med navnet "${name}" eksisterer allerede. Velg et annet navn.`);
        return;
    }
    
    if (admin.currentPage) {
        // Edit existing
        admin.currentPage.name = name;
        admin.currentPage.titleNo = titleNo;
        admin.currentPage.titleEn = titleEn;
        admin.currentPage.contentNo = contentNo;
        admin.currentPage.contentEn = contentEn;
    } else {
        // Add new
        const newId = Math.max(...admin.adminData.pages.map(p => p.id), 0) + 1;
        admin.adminData.pages.push({
            id: newId,
            name,
            titleNo,
            titleEn,
            contentNo,
            contentEn
        });
    }
    
    admin.saveData();
    admin.loadPages();
    admin.generateMainSite(); // Regenerate main site to include new page
    closeModal('pageModal');
    admin.showSuccessMessage(admin.currentPage ? 'Side oppdatert!' : 'Ny side opprettet!');
}

function deletePage(pageId) {
    const confirmation = prompt('For å slette denne siden, skriv "SLETT" i store bokstaver:');
    if (confirmation === 'SLETT') {
        admin.adminData.pages = admin.adminData.pages.filter(p => p.id !== pageId);
        admin.saveData();
        admin.loadPages();
        admin.generateMainSite(); // Regenerate main site to remove deleted page
        admin.showSuccessMessage('Side slettet!');
    } else if (confirmation !== null) {
        admin.showErrorMessage('Sletting avbrutt - feil bekreftelse');
    }
}

// Settings functions
function changeUsername() {
    const newUsername = document.getElementById('newUsername').value;
    const currentUser = localStorage.getItem('redfoxCurrentUser');
    
    if (!newUsername) {
        admin.showErrorMessage('Nytt brukernavn kan ikke være tomt!');
        return;
    }
    
    if (!currentUser) {
        admin.showErrorMessage('Ingen bruker er logget inn!');
        return;
    }
    
    // Get current users
    const storedUsers = localStorage.getItem('redfoxUsers');
    if (!storedUsers) {
        admin.showErrorMessage('Feil ved lasting av brukerdata!');
        return;
    }
    
    const users = JSON.parse(storedUsers);
    
    // Check if new username already exists
    if (users[newUsername] && newUsername !== currentUser) {
        admin.showErrorMessage('Brukernavnet eksisterer allerede!');
        return;
    }
    
    // Update username
    const userPassword = users[currentUser];
    delete users[currentUser];
    users[newUsername] = userPassword;
    
    // Save updated users
    localStorage.setItem('redfoxUsers', JSON.stringify(users));
    localStorage.setItem('redfoxCurrentUser', newUsername);
    
    // Update display
    document.getElementById('currentUserDisplay').textContent = `Innlogget som: ${newUsername}`;
    document.getElementById('newUsername').value = '';
    admin.showSuccessMessage('Brukernavn endret!');
}

function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    const currentUser = localStorage.getItem('redfoxCurrentUser');
    
    if (!newPassword) {
        admin.showErrorMessage('Nytt passord kan ikke være tomt!');
        return;
    }
    
    if (!currentUser) {
        admin.showErrorMessage('Ingen bruker er logget inn!');
        return;
    }
    
    // Get current users
    const storedUsers = localStorage.getItem('redfoxUsers');
    if (!storedUsers) {
        admin.showErrorMessage('Feil ved lasting av brukerdata!');
        return;
    }
    
    const users = JSON.parse(storedUsers);
    
    // Update password for current user
    const hashedPassword = hashPassword(newPassword);
    users[currentUser] = hashedPassword;
    
    // Save updated users
    localStorage.setItem('redfoxUsers', JSON.stringify(users));
    
    document.getElementById('newPassword').value = '';
    admin.showSuccessMessage('Passord endret!');
    document.getElementById('newPassword').value = '';
    admin.showSuccessMessage('Passord endret!');
}

function exportData() {
    const data = JSON.stringify(admin.adminData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'redfox-backup-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            admin.adminData = data;
            admin.saveData();
            admin.loadAdminData();
            admin.showSuccessMessage('Data importert!');
        } catch (error) {
            admin.showErrorMessage('Feil ved import: Ugyldig fil format!');
        }
    };
    reader.readAsText(file);
}

function previewSite() {
    const htmlContent = admin.generateMainSite();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

// Simple hash function for password encryption
function hashPassword(password) {
    let hash = 0;
    if (password.length === 0) return hash.toString();
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Add salt for additional security
    const salt = 'redfox2025';
    const saltedPassword = password + salt;
    let saltedHash = 0;
    for (let i = 0; i < saltedPassword.length; i++) {
        const char = saltedPassword.charCodeAt(i);
        saltedHash = ((saltedHash << 5) - saltedHash) + char;
        saltedHash = saltedHash & saltedHash;
    }
    return saltedHash.toString();
}

// Text editor functions for page content
function formatText(textareaId, action, value = '') {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let formattedText = '';
    
    switch (action) {
        case 'bold':
            formattedText = `**${selectedText || 'Bold text'}**`;
            break;
        case 'italic':
            formattedText = `*${selectedText || 'Italic text'}*`;
            break;
        case 'heading':
            if (value) {
                const headingLevel = value === 'h1' ? '#' : value === 'h2' ? '##' : '###';
                formattedText = `${headingLevel} ${selectedText || 'Heading text'}`;
            }
            break;
        case 'fontSize':
            if (value) {
                const sizeTag = value === 'small' ? '<small>' : value === 'large' ? '<large>' : '<xlarge>';
                const endTag = value === 'small' ? '</small>' : value === 'large' ? '</large>' : '</xlarge>';
                formattedText = `${sizeTag}${selectedText || 'Sized text'}${endTag}`;
            }
            break;
    }
    
    if (formattedText) {
        textarea.value = beforeText + formattedText + afterText;
        textarea.focus();
        
        // Set cursor position after the formatted text
        const newPosition = start + formattedText.length;
        textarea.setSelectionRange(newPosition, newPosition);
    }
}

function togglePreview(lang) {
    const textareaId = `pageContent${lang}`;
    const previewId = `preview${lang}`;
    const textarea = document.getElementById(textareaId);
    const preview = document.getElementById(previewId);
    
    if (!textarea || !preview) return;
    
    if (preview.style.display === 'none') {
        // Show preview
        const content = textarea.value;
        let html = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/<small>(.*?)<\/small>/g, '<span style="font-size: 0.8em;">$1</span>')
            .replace(/<large>(.*?)<\/large>/g, '<span style="font-size: 1.2em;">$1</span>')
            .replace(/<xlarge>(.*?)<\/xlarge>/g, '<span style="font-size: 1.4em;">$1</span>')
            .replace(/\[img:(.*?)\]/g, '<img src="https://asarayja.github.io/redfox/bilder/$1" alt="Bilde" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 8px;">')
            .replace(/\n/g, '<br>');
        
        preview.innerHTML = html;
        preview.style.display = 'block';
        textarea.style.display = 'none';
    } else {
        // Hide preview
        preview.style.display = 'none';
        textarea.style.display = 'block';
    }
}

function insertImage(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    // Get available images from bilder folder
    const availableImages = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
    
    let imageOptions = 'Velg et bilde:\n\n';
    availableImages.forEach((img, index) => {
        imageOptions += `${index + 1}. ${img}\n`;
    });
    imageOptions += '\nSkriv inn nummeret på bildet du vil sette inn:';
    
    const choice = prompt(imageOptions);
    
    if (choice && !isNaN(choice)) {
        const imageIndex = parseInt(choice) - 1;
        if (imageIndex >= 0 && imageIndex < availableImages.length) {
            const imageName = availableImages[imageIndex];
            const imageTag = `[img:${imageName}]`;
            
            // Insert at cursor position
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            
            const beforeText = text.substring(0, start);
            const afterText = text.substring(end, text.length);
            
            textarea.value = beforeText + imageTag + afterText;
            textarea.focus();
            
            // Set cursor position after the image tag
            const newPosition = start + imageTag.length;
            textarea.setSelectionRange(newPosition, newPosition);
        } else {
            alert('Ugyldig valg. Velg et nummer mellom 1 og ' + availableImages.length);
        }
    }
}
