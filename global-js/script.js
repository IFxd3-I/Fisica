
//01-10-2023, 15-11-2025
// Solo sfondo, niente altri elementi
/**
 * Funzione principale per impostare lo sfondo.
 * Solo console per stato.
 */

const API_KEY = 'DEMO_KEY';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const TODAY = new Date().toISOString().split('T')[0];

function visualizzaAPOD(data, isCached) {
    const status = isCached
        ? "APOD: Sfondo caricato dalla cache locale."
        : "APOD: Dati recuperati dall'API NASA (Richiesta effettuata).";
    console.log(status);
    
    if (data.media_type === 'image') {
        // --- 1. GESTIONE IMMAGINE ---
        const imageUrl = data.hdurl || data.url;
        
        // Applica l'immagine come sfondo
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundColor = 'transparent';

        console.log(`APOD: Sfondo impostato su immagine: ${data.title}`);
    } else if (data.media_type === 'video') {
        // --- 2. GESTIONE VIDEO ---
        
        // 1. Rimuovi gli stili di sfondo non necessari dal corpo
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundAttachment = 'scroll';
        document.body.style.backgroundSize = 'auto'; 
        document.body.style.backgroundColor = '#111'; // Sfondo scuro per il video
        
        // 2. Crea l'elemento IFRAME per incorporare il video
        const iframe = document.createElement('iframe');
        
        // Imposta le proprietà dell'iframe per un video fullscreen o quasi
        iframe.setAttribute('src', data.url); // Usa l'URL del video dai dati APOD
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', 'true');
        
        // Imposta gli stili CSS per centrare e ingrandire l'iframe
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = '-1'; // Posiziona dietro il contenuto per usarlo come sfondo
        
        // 3. Aggiungi l'iframe al corpo del documento
        document.body.appendChild(iframe);
        
        console.warn(`APOD: Oggi è un video (${data.title}). Incorporato il video.`);
    } else {
        // Gestione di tipi media non supportati
        console.warn(`APOD: Tipo media non supportato: ${data.media_type}. Nessuna modifica allo sfondo.`);
    }
}

async function caricaAPOD() {
    try {
        // 1. Recupera i dati dalla cache
        const cachedString = localStorage.getItem('nasaAPOD');
        if (cachedString) {
            const cachedData = JSON.parse(cachedString);
            // 2. Verifica se la cache è valida per oggi
            if (cachedData && cachedData.date === TODAY) {
                visualizzaAPOD(cachedData, true);
                return;
            }
        }
        
        // 3. Cache scaduta o assente: chiama l'API NASA
        const response = await fetch(APOD_URL);
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status} - ${await response.text()}`);
        }
        const data = await response.json();
        
        // 5. Salva in cache
        localStorage.setItem('nasaAPOD', JSON.stringify(data));
        visualizzaAPOD(data, false);
    } catch (error) {
        console.error("APOD: Errore nel recupero:", error);
        
        // 6. Fallback alla cache esistente (anche se outdated)
        const fallbackString = localStorage.getItem('nasaAPOD');
        if (fallbackString) {
            try {
                const fallbackData = JSON.parse(fallbackString);
                console.warn(`APOD: Uso fallback cache (data: ${fallbackData.date || 'sconosciuta'}).`);
                visualizzaAPOD(fallbackData, true);
            } catch (parseError) {
                console.error("APOD: Errore nel parsing fallback cache:", parseError);
            }
        } else {
            console.error("APOD: Nessun fallback disponibile. Sfondo non modificato.");
        }
    }
}

// Chiama la funzione all'avvio (es. onload)
caricaAPOD();

// Hard-coded chapters for each module (to be filled later)
const chapters = {
    "analisi-1": [
        { title: "Algebra Superiori", json: "algebra-superiori.json" },
        { title: "Il Campo Reale", json: "il-campo-reale.json" },
        { title: "Teoria degli spazi metrici", json: "teoria-degli-spazi-metrici.json" },
        { title: "Limiti", json: "limiti.json" },
        { title: "Serie", json: "serie.json" },
        { title: "Funzioni continue", json: "funzioni-continue.json" },
        { title: "Derivate", json: "derivate.json" },
        { title: "Integrali", json: "integrali.json" }
    ],
    "informatica": [
        { title: "Introduzione", json: "introduzione.json" },
        { title: "Algoritmi", json: "algoritmi.json" },
        { title: "Strutture dati", json: "strutture-dati.json" }
    ],
    "meccanica": [
        { title: "Analisi Vettoriale", json: "analisi-vettoriale.json" },
        { title: "Cinematica Vettoriale", json: "cinematica-vettoriale.json" }
    ],
    "el-fisica-con-statistica": [
        { title: "Organizzazione dei dati", json: "organizzazione-dei-dati.json" },
        { title: "Dati, Misure e cifre significative", json: "dati-misure-cifre-significative.json" },
        { title: "Indicatori per le distribuzioni statistiche", json: "indicatori-distribuzioni-statistiche.json" },
        { title: "Concetti base di probabilità", json: "probabilita.json" },
        { title: "Distribuzioni di probabilità", json: "distribuzioni-di-probabilita.json" }
    ],
    "analisi-2": [
        { title: "Serie di funzioni", json: "serie-di-funzioni.json" },
        { title: "Equazioni differenziali", json: "equazioni-differenziali.json" }
    ],
    "geometria-1": [
        { title: "Spazi vettoriali", json: "spazi-vettoriali.json" },
        { title: "Applicazioni lineari", json: "applicazioni-lineari.json" }
    ],
    "onde-oscillazioni": [
        { title: "Onde", json: "onde.json" },
        { title: "Oscillazioni armoniche", json: "oscillazioni-armoniche.json" }
    ],
    "elettromagnetismo": [
        { title: "Campo elettrico", json: "campo-elettrico.json" },
        { title: "Campo magnetico", json: "campo-magnetico.json" }
    ],
    "analisi-3": [
        { title: "Analisi complessa", json: "analisi-complessa.json" },
        { title: "Trasformate", json: "trasformate.json" }
    ],
    "laboratorio-ottica": [
        { title: "Ottica geometrica", json: "ottica-geometrica.json" },
        { title: "Ottica fisica", json: "ottica-fisica.json" }
    ],
    "laboratorio-trattamento-numerico": [
        { title: "Analisi dati", json: "analisi-dati.json" },
        { title: "Fitting", json: "fitting.json" }
    ],
    "meccanica-analitica": [
        { title: "Lagrangiana", json: "lagrangiana.json" },
        { title: "Hamiltoniana", json: "hamiltoniana.json" }
    ],
    "fisica-quantistica-1": [
        { title: "Meccanica quantistica", json: "meccanica-quantistica.json" },
        { title: "Atomo di idrogeno", json: "atomo-di-idrogeno.json" }
    ],
    "laboratorio-strumentazione-elettronica": [
        { title: "Circuiti", json: "circuiti.json" },
        { title: "Strumenti", json: "strumenti.json" }
    ],
    "metodi-matematici-fisica": [
        { title: "Equazioni differenziali", json: "equazioni-differenziali.json" },
        { title: "Fourier", json: "fourier.json" }
    ],
    "termodinamica": [
        { title: "Principi", json: "principi.json" },
        { title: "Cicli", json: "cicli.json" }
    ]
};
// Variabile per tenere traccia della chiave del modulo attualmente aperto
let currentlyOpenModuleKey = null;
let currentYear = null;

/**
 * Funzione per pulire lo stato corrente: rimuove la lista di capitoli
 * e ripristina la visibilità del contenuto originale di TUTTI i moduli.
 */
function closeAllChapters() {
    // 1. Rimuove la lista di capitoli dal DOM, se esiste.
    const existingChapters = document.querySelector('.chapters-list');
    if (existingChapters) {
        existingChapters.remove();
    }

    // 3. Resetta lo stato
    currentlyOpenModuleKey = null;
    currentYear = null;
}

// Funzionalità principale: on module click, show chapters
document.querySelectorAll('.module').forEach(module => {
    module.addEventListener('click', () => {
        const content = module.closest('.accordion-section-content');
        const moduleKey = module.getAttribute('data-subject');
        const year = module.getAttribute('data-year');

        // *** NUOVA LOGICA DI SOSTITUZIONE ***

        // 1. CONTROLLO DI USCITA: Se si clicca sullo stesso modulo GIÀ aperto, non fare nulla.
        if (moduleKey === currentlyOpenModuleKey) {
            return; // Blocca il comportamento di "toggle-off"
        }

        // 2. SOSTITUZIONE: Se si clicca un modulo DIVERSO, chiudi i precedenti.
        closeAllChapters(); // Rimuove la vecchia lista e ripristina la visibilità

        // 3. PREPARAZIONE: Nascondi il contenuto originale del modulo appena cliccato
        content.classList.add('hidden');

        // 4. CREAZIONE: Crea la nuova lista di capitoli
        const chaptersList = document.createElement('ul');
        chaptersList.className = 'chapters-list';

        // Popola anche il sidebar con i capitoli
        const sidebar = document.getElementById('sidebar-menu');
        const moduleName = module.textContent;

        if (sidebar) {
            // Rimuovi capitoli e titolo precedenti dal sidebar
            const prevTitle = sidebar.querySelector('.sidebar-chapters-title');
            if (prevTitle) prevTitle.remove();
            const prevList = sidebar.querySelector('.sidebar-chapters-list');
            if (prevList) prevList.remove();

            // Aggiungi un titolo per i capitoli nel sidebar
            const chaptersTitle = document.createElement('h3');
            chaptersTitle.className = 'sidebar-chapters-title';
            chaptersTitle.textContent = moduleName;
            sidebar.appendChild(chaptersTitle);

            // Crea lista capitoli per il sidebar
            const sidebarChaptersList = document.createElement('ul');
            sidebarChaptersList.className = 'sidebar-chapters-list';
            sidebar.appendChild(sidebarChaptersList);
        }

        if (chapters[moduleKey]) {
            chapters[moduleKey].forEach(chapter => {
                const li = document.createElement('li');
                li.className = 'chapter';
                li.textContent = chapter.title;
                li.setAttribute('data-chapter', chapter.json);
                
                // Creazione del contenitore per subchapters (inizialmente nascosto)
                const subchaptersList = document.createElement('ul');
                subchaptersList.className = 'subchapters-list';
                subchaptersList.style.display = 'none';
                
                // Aggiungi l'evento di click per mostrare/nascondere i subchapters
                li.addEventListener('click', (event) => {
                    // Previeni la propagazione dell'evento ai genitori
                    event.stopPropagation();
                    
                    // Prima di aprire questo sottocapitolo, chiudi tutti gli altri sottocapitoli aperti
                    const allSubchapterLists = document.querySelectorAll('.subchapters-list');
                    allSubchapterLists.forEach(list => {
                        // Chiudi solo gli altri sottocapitoli, non quello corrente
                        if (list !== subchaptersList && list.style.display === 'block') {
                            list.style.display = 'none';
                        }
                    });
                    
                    // Se i subchapters sono già stati caricati, togliamo o mostriamo la lista
                    if (subchaptersList.childElementCount > 0) {
                        subchaptersList.style.display = subchaptersList.style.display === 'none' ? 'block' : 'none';
                        return;
                    }
                    
                    // Altrimenti carica i subchapters dal file JSON
                    loadSubchapters(chapter.title, chapter.json, moduleKey, year, subchaptersList);
                });
                
                li.appendChild(subchaptersList);
                chaptersList.appendChild(li);

                // Aggiungi anche al sidebar
                if (sidebar) {
                    const sidebarLi = document.createElement('li');
                    sidebarLi.className = 'sidebar-chapter';
                    
                    const sidebarLink = document.createElement('a');
                    sidebarLink.href = '#';
                    sidebarLink.textContent = chapter.title;
                    sidebarLink.className = 'sidebar-chapter-link';
                    sidebarLink.setAttribute('data-chapter', chapter.json);
                    sidebarLink.setAttribute('data-module', moduleKey);
                    sidebarLink.setAttribute('data-year', year);
                    
                    // Contenitore per i sottocapitoli nella sidebar
                    const sidebarSubchaptersList = document.createElement('ul');
                    sidebarSubchaptersList.className = 'sidebar-subchapters-list';
                    sidebarSubchaptersList.style.display = 'none';
                    
                    // Gestore click sul capitolo nella sidebar
                    sidebarLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        
                        // Prima di aprire questo sottocapitolo, chiudi tutti gli altri sottocapitoli aperti nella sidebar
                        const allSidebarSubchapterLists = document.querySelectorAll('.sidebar-subchapters-list');
                        allSidebarSubchapterLists.forEach(list => {
                            // Chiudi solo gli altri sottocapitoli, non quello corrente
                            if (list !== sidebarSubchaptersList && list.style.display === 'block') {
                                list.style.display = 'none';
                            }
                        });
                        
                        // Se i sottocapitoli sono già stati caricati, mostra/nascondi la lista
                        if (sidebarSubchaptersList.childElementCount > 0) {
                            sidebarSubchaptersList.style.display = 
                                sidebarSubchaptersList.style.display === 'none' ? 'block' : 'none';
                            return;
                        }
                        
                        // Imposto le variabili globali
                        currentlyOpenModuleKey = e.target.getAttribute('data-module');
                        currentYear = e.target.getAttribute('data-year');
                        
                        // Carica i sottocapitoli nella sidebar
                        loadSidebarSubchapters(
                            chapter.title,
                            chapter.json,
                            moduleKey,
                            year,
                            sidebarSubchaptersList
                        );
                    });
                    
                    sidebarLi.appendChild(sidebarLink);
                    sidebarLi.appendChild(sidebarSubchaptersList);
                    sidebar.querySelector('.sidebar-chapters-list').appendChild(sidebarLi);
                }
            });
        }

        // 5. INSERIMENTO: Inserisci la nuova lista
        content.parentNode.insertBefore(chaptersList, content.nextSibling);

        // 6. AGGIORNAMENTO STATO: Salva la chiave del modulo ora aperto
        currentlyOpenModuleKey = moduleKey;
        currentYear = year;
    });
});

// Back button handler
document.getElementById('back-button').addEventListener('click', () => {
    // Hide chapter page
    document.getElementById('chapter-page').classList.add('hidden');
    // Show years container
    document.querySelector('.years-container').classList.remove('hidden');
    // Rimuovi il gradiente da main e header
    document.querySelector('main').style.background = '';
    document.querySelector('header').style.background = '';

    // Nascondi il menu laterale e il pulsante
    document.getElementById('sidebar-menu').classList.add('hidden');
    document.getElementById('toggle-menu-btn').classList.add('hidden');
});

// Toggle menu button handler
document.getElementById('toggle-menu-btn').addEventListener('click', toggleMenu);

// Reset accordion section state when mouse leaves each section
document.querySelectorAll('.accordion-section').forEach(section => {
    section.addEventListener('mouseleave', () => {

        // 1. Rimuovi la lista dei capitoli per questa sezione
        const chaptersList = section.querySelector('.chapters-list');
        if (chaptersList) chaptersList.remove();

        // 2. Mostra nuovamente il contenuto per questa sezione
        const content = section.querySelector('.accordion-section-content');
        if (content) content.classList.remove('hidden');

        // 3. 🚨 LA CORREZIONE: Resetta la variabile di stato globale 🚨
        if (typeof currentlyOpenModuleKey !== 'undefined') {
            currentlyOpenModuleKey = null;
            currentYear = null;
        }
    });
});

function renderMath(text) {
    if (typeof text !== 'string') {
        return text;
    }

    let renderedText = text
        .replace(/&&(.*?)&&/g, (match, p1) => `<span class="highlight-inline-math">__HLMATH__${p1}__HLMATH__</span>`)
        .replace(/\\\((.*?)\\\)/g, (match, p1) => `<span class="inline-math">\\(${p1}\\)</span>`)
        .replace(/\$\$(.*?)\$\$/g, (match, p1) => `<div class="math-block">$$${p1}$$</div>`)
        .replace(/<class:([^>]+)>(.*?)<\/class:\1>/g, (match, className, content) => `<span class="${className}">${content}</span>`)
        .replace(/<highlight>(.*?)<\/highlight>/g, (match, content) => `<span class="highlight">${content}</span>`)
        .replace(/__HLMATH__(.*?)__HLMATH__/g, (match, p1) => `\\(${p1}\\)`);

    return renderedText;
}


function renderItem(item) {
    if (typeof item === 'string') {
        return `<li>${renderMath(item)}</li>`;
    }
    if (!item || !item.type) {
        return `<li>Elemento non valido</li>`;
    }

    switch (item.type) {
        case 'text':
            return `<li>${renderMath(item.text || '')}</li>`;
        case 'math':
            return `<li><div class="math-block">$$${item.text || ''}$$</div></li>`;
        case 'image':
            const imgSrc = item.src || '';
            const imgAlt = item.alt || 'Immagine';
            return `<li><img src="${imgSrc}" alt="${imgAlt}" loading="lazy" /></li>`;
        case 'paragraph':
            return `<li><p>${renderMath(item.text || '')}</p></li>`;
        case 'heading':
            return `<li><h${item.level || 5}>${renderMath(item.text || '')}</h${item.level || 5}></li>`;
        case 'list':
            if (item.items && Array.isArray(item.items)) {
                return `<ul class="content-list">${item.items.map(renderItem).join('')}</ul>`;
            }
            return `<li>Lista non valida</li>`;
        default:
            return `<li>Tipo non supportato: ${item.type}</li>`;
    }
}

function toggleTheorem(proofId) {
    const proof = document.getElementById(proofId);
    if (proof) {
        proof.style.display = proof.style.display === 'none' ? 'block' : 'none';
    }
}

function toggleExample(exampleId) {
    const example = document.getElementById(exampleId);
    if (example) {
        example.style.display = example.style.display === 'none' ? 'block' : 'none';
    }
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar-menu');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

/**
 * Mostra la pagina di un capitolo e opzionalmente scorre a un ancoraggio specifico
 * @param {string} chapterTitle - Titolo del capitolo da mostrare
 * @param {string|null} anchorId - ID dell'elemento a cui scorrere (opzionale)
 */
async function showChapterPage(chapterTitle, anchorId = null) {

    const chapterPage = document.getElementById('chapter-page');
    const yearsContainer = document.querySelector('.years-container');
    const main = document.querySelector('main');
    const header = document.querySelector('header');

    // Nascondi la lista anni
    yearsContainer.classList.add('hidden');
    // Mostra la pagina capitolo
    chapterPage.classList.remove('hidden');
    // Memorizza il titolo del capitolo come attributo per poterlo recuperare facilmente
    chapterPage.setAttribute('data-current-chapter', chapterTitle);
    // Aggiungi sfondo opaco a main e header
    main.style.background = 'rgba(0, 0, 0, 0.6)';
    header.style.background = 'rgba(0, 0, 0, 0.6)';

    // Mostra il menu laterale e il pulsante
    document.getElementById('sidebar-menu').classList.remove('hidden');
    document.getElementById('toggle-menu-btn').classList.remove('hidden');

    // Trova il capitolo selezionato
    const chapter = chapters[currentlyOpenModuleKey]?.find(c => c.title === chapterTitle);
    if (!chapter) {
        chapterPage.innerHTML = `<h2>Capitolo non trovato</h2>`;
        return;
    }

    // Costruisci il path come anno-(data-year)/data-subject/pages/data-chapter
    const jsonPath = `anno-${currentYear}/${currentlyOpenModuleKey}/pages/${chapter.json}`;

    chapterPage.innerHTML = `<div class="chapter-content">Caricamento...</div>`;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Errore nel caricamento del capitolo');
        const data = await response.json();
        // Mostra il contenuto del capitolo (adatta secondo struttura JSON)
        let html = '';
        if (data.content && Array.isArray(data.content)) {
            for (let i = 0; i < data.content.length; i++) {
                const item = data.content[i];
                switch (item.type) {
                    case 'heading':
                        const headingText = renderMath(item.text);
                        let headingHtml = `<h${item.level}>${headingText}</h${item.level}>`;
                        
                        // Aggiungi ID univoco per heading di livello 3
                        if (item.level === 3) {
                            const slug = item.text
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, '') // Rimuovi caratteri speciali
                                .replace(/\s+/g, '-') // Sostituisci spazi con trattini
                                .replace(/-+/g, '-') // Rimuovi trattini multipli
                                .trim(); // Rimuovi spazi iniziali/finali
                            headingHtml = `<h${item.level} id="${slug}">${headingText}</h${item.level}>`;
                        }
                        
                        html += headingHtml;
                        break;
                    case 'subtitle':
                        html += `<h2 class="content-subtitle">${renderMath(item.text)}</h2>`;
                        break;
                    case 'paragraph':
                        html += `<p>${renderMath(item.text)}</p>`;
                        break;
                    case 'math':
                        html += `<div class="math-block">$$${item.text}$$</div>`;
                        break;
                    case 'table':
                        if (item.rows && Array.isArray(item.rows)) {
                            const tableHtml = `<table class="content-table">
                                <tbody>
                                    ${item.rows.map(row => {
                                        let colIndex = 0;
                                        return `<tr>${row.map((cell, index) => {
                                            // Support for colspan: if cell is empty and previous cell exists, skip it (handled by colspan)
                                            if (cell === "" && index > 0 && row[index - 1] !== "") {
                                                return ''; // Skip empty cells that follow non-empty ones
                                            }
                                            // Check if next cell is empty to determine colspan
                                            const nextCell = row[index + 1];
                                            const colspan = (nextCell === "") ? 2 : 1;
                                            colIndex += colspan;
                                            
                                            // Support for cell properties
                                            let cellContent = cell;
                                            let cellClass = '';
                                            let cellStyle = '';
                                            
                                            if (typeof cell === 'object' && cell !== null) {
                                                cellContent = cell.text || '';
                                                if (cell.align) cellStyle += `text-align: ${cell.align}; `;
                                                if (cell.valign) cellStyle += `vertical-align: ${cell.valign}; `;
                                                if (cell.class) cellClass = cell.class;
                                            }
                                            
                                            const styleAttr = cellStyle ? ` style="${cellStyle}"` : '';
                                            const classAttr = cellClass ? ` class="${cellClass}"` : '';
                                            
                                            return `<td${colspan > 1 ? ` colspan="${colspan}"` : ''}${styleAttr}${classAttr}>${renderMath(cellContent)}</td>`;
                                        }).join('')}</tr>`;
                                    }).join('')}
                                </tbody>
                            </table>`;
                            html += tableHtml;
                        }
                        break;
                    case 'title':
                        html += `<h1 class="content-title">${item.text}</h1>`;
                        break;
                    case 'list':
                        if (item.items && Array.isArray(item.items)) {
                            html += '<ul class="content-list">';
                            html += item.items.map(renderItem).join('');
                            html += '</ul>';
                        }
                        break;
                    case 'olist':
                        if (item.items && Array.isArray(item.items)) {
                            html += '<ol class="content-list">';
                            html += item.items.map(renderItem).join('');
                            html += '</ol>';
                        }
                        break;
                    case 'example':
                        const exampleId = `example-${Math.random().toString(36).substr(2, 9)}`;
                        const exampleButton = `<button class="example-button" onclick="toggleExample('${exampleId}')" aria-label="Mostra esempio">Mostra Esempio</button>`;
                        let exampleContent = '';
                        for (let j = 0; j < item.content.length; j++) {
                            const subItem = item.content[j];
                            switch (subItem.type) {
                                case 'heading':
                                    exampleContent += `<h${subItem.level}>${subItem.text}</h${subItem.level}>`;
                                    break;
                                case 'paragraph':
                                    exampleContent += `<p>${renderMath(subItem.text)}</p>`;
                                    break;
                                case 'math':
                                    exampleContent += `<div class="math-block">$$${subItem.text}$$</div>`;
                                    break;
                                case 'list':
                                    if (subItem.items && Array.isArray(subItem.items)) {
                                        exampleContent += '<ul class="content-list">';
                                        exampleContent += subItem.items.map(renderItem).join('');
                                        exampleContent += '</ul>';
                                    }
                                    break;
                                case 'olist':
                                    if (subItem.items && Array.isArray(subItem.items)) {
                                        exampleContent += '<ol class="content-list">';
                                        exampleContent += subItem.items.map(renderItem).join('');
                                        exampleContent += '</ol>';
                                    }
                                    break;
                                case 'image':
                                    const imgSrc = subItem.src || '';
                                    const imgAlt = subItem.alt || 'Immagine';
                                    const imgCaption = subItem.caption ? `<figcaption>${renderMath(subItem.caption)}</figcaption>` : '';
                                    const imgClass = subItem.class || '';
                                    const imgId = `img-${Math.random().toString(36).substr(2, 9)}`;
                                    exampleContent += `<figure class="content-image ${imgClass}">
                                        <img id="${imgId}" src="${imgSrc}" alt="${imgAlt}" loading="lazy" onclick="openLightbox(this)" style="cursor: pointer;" />
                                        ${imgCaption}
                                    </figure>`;
                                    break;
                                default:
                                    exampleContent += `<p>${renderMath(subItem.text || subItem)}</p>`;
                                    break;
                            }
                        }
                        const exampleContentDiv = `<div class="example-content" id="${exampleId}" style="display: none;">${exampleContent}</div>`;
                        html += `<div class="example-container"><div class="example-header" style="position:relative"><span class="example-category">Esempio</span><button class="example-button" onclick="toggleExample('${exampleId}')" aria-label="Mostra esempio" aria-expanded="false"></button></div>${exampleContentDiv}</div>`;
                        break;
                    case 'theorem':
                        const theoremId = `theorem-${Math.random().toString(36).substr(2, 9)}`;
                        let theoremTitle = 'Teorema';
                        let theoremStatement = '';
                        let theoremProof = '';
                        let hasProof = false;

                        for (let j = 0; j < item.content.length; j++) {
                            const subItem = item.content[j];
                            switch (subItem.type) {
                                case 'title':
                                    theoremTitle = subItem.text || 'Teorema';
                                    break;
                                case 'statement':
                                    theoremStatement = renderMath(subItem.text || '');
                                    break;
                                case 'proof':
                                    theoremProof = renderMath(subItem.text || '');
                                    hasProof = true;
                                    break;
                                default:
                                    break;
                            }
                        }

                        if (hasProof) {
                            const proofId = `theorem-proof-${Math.random().toString(36).substr(2, 9)}`;
                            const proofButton = `<button class="theorem-proof-button" onclick="toggleTheorem('${proofId}')" aria-label="Mostra dimostrazione" aria-expanded="false"></button>`;
                            const proofContent = `<div class="theorem-proof" id="${proofId}" style="display: none;">${theoremProof}</div>`;
                            html += `<div class="theorem-container"><div class="theorem-header" style="position:relative"><span class="theorem-title">${theoremTitle}</span>${proofButton}</div><div class="theorem-statement">${theoremStatement}</div>${proofContent}</div>`;
                        } else {
                            html += `<div class="theorem-container"><div class="theorem-header"><span class="theorem-title">${theoremTitle}</span></div><div class="theorem-statement">${theoremStatement}</div></div>`;
                        }
                        break;
                    case 'image':
                        const imgSrc = item.src || '';
                        const imgAlt = item.alt || 'Immagine';
                        const imgCaption = item.caption ? `<figcaption>${renderMath(item.caption)}</figcaption>` : '';
                        const imgClass = item.class || '';
                        const imgId = `img-${Math.random().toString(36).substr(2, 9)}`;

                        html += `<figure class="content-image ${imgClass}">
                            <img id="${imgId}" src="${imgSrc}" alt="${imgAlt}" loading="lazy" onclick="openLightbox(this)" style="cursor: pointer;" />
                            ${imgCaption}
                        </figure>`;
                        break;
                    
                    default:
                        html += `<p>Tipo di contenuto non supportato: ${item.type}</p>`;
                        break;
                }
            }
        } else {
            html = '<p>Struttura del contenuto non valida.</p>';
        }
        chapterPage.querySelector('.chapter-content').innerHTML = html;
        
        // Elabora le formule MathJax con un piccolo ritardo per assicurarsi che il DOM sia aggiornato
        if (typeof MathJax !== 'undefined') {
            setTimeout(() => {
                // Elabora specificamente le tabelle e poi tutto il resto
                const tables = chapterPage.querySelectorAll('.content-table');
                tables.forEach(table => {
                    MathJax.typeset([table]);
                });
                // Elabora tutto il resto
                MathJax.typeset();
                
                // Scroll all'ancoraggio se specificato
                if (anchorId) {
                    setTimeout(() => {
                        const element = document.getElementById(anchorId);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 200); // Attendi un po' di più per assicurarti che il MathJax abbia finito
                }
            }, 100);
        } else if (anchorId) {
            // Se MathJax non è definito, scrollare comunque all'ancoraggio
            setTimeout(() => {
                const element = document.getElementById(anchorId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    } catch (e) {
        chapterPage.querySelector('.chapter-content').textContent = 'Errore nel caricamento del capitolo.';
    }
}

/**
 * Crea uno slug dall'ID per l'ancoraggio
 * @param {string} text - Il testo da convertire in slug
 * @returns {string} - Lo slug generato
 */
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Rimuovi caratteri speciali
        .replace(/\s+/g, '-')     // Sostituisci spazi con trattini
        .replace(/-+/g, '-')      // Rimuovi trattini multipli
        .trim();                  // Rimuovi spazi iniziali/finali
}

/**
 * Funzione per caricare i sottocapitoli di un capitolo
 * @param {string} chapterTitle - Il titolo del capitolo
 * @param {string} chapterJson - Il nome del file JSON
 * @param {string} moduleKey - La chiave del modulo
 * @param {string} year - L'anno accademico
 * @param {HTMLElement} subchaptersList - L'elemento UL dove inserire i sottocapitoli
 */
async function loadSubchapters(chapterTitle, chapterJson, moduleKey, year, subchaptersList) {
    // Costruisci il path del file JSON
    const jsonPath = `anno-${year}/${moduleKey}/pages/${chapterJson}`;
    
    try {
        // Carica il file JSON
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Errore nel caricamento del capitolo');
        const data = await response.json();
        
        // Trova tutti i titoli di heading di livello 3 (sottocapitoli)
        const subchapters = data.content.filter(item => 
            item.type === 'heading' && item.level === 3
        );
        
        // Se non ci sono sottocapitoli, mostra un messaggio
        if (subchapters.length === 0) {
            const noSubchaptersLi = document.createElement('li');
            noSubchaptersLi.textContent = 'Nessun sottocapitolo disponibile';
            noSubchaptersLi.className = 'subchapter no-subchapters';
            subchaptersList.appendChild(noSubchaptersLi);
            subchaptersList.style.display = 'block';
            return;
        }
        
        // Crea un elemento li per ogni sottocapitolo
        subchapters.forEach((subchapter, index) => {
            const subchapterLi = document.createElement('li');
            subchapterLi.textContent = subchapter.text;
            subchapterLi.className = 'subchapter';
            
            // Crea un ID univoco per l'ancoraggio basato sul testo
            const slug = createSlug(subchapter.text);
            
            // Aggiungi evento click per navigare al sottocapitolo
            subchapterLi.addEventListener('click', (event) => {
                event.stopPropagation();
                
                // Se è il primo sottocapitolo, non specificare l'ancora
                if (index === 0) {
                    showChapterPage(chapterTitle);
                } else {
                    // Mostra la pagina del capitolo con l'ancora specifica
                    showChapterPage(chapterTitle, slug);
                }
            });
            
            subchaptersList.appendChild(subchapterLi);
        });
        
        // Mostra la lista dei sottocapitoli
        subchaptersList.style.display = 'block';
        
    } catch (error) {
        console.error('Errore nel caricamento dei sottocapitoli:', error);
        
        // Mostra un messaggio di errore
        const errorLi = document.createElement('li');
        errorLi.textContent = 'Errore nel caricamento dei sottocapitoli';
        errorLi.className = 'subchapter error';
        subchaptersList.appendChild(errorLi);
        subchaptersList.style.display = 'block';
    }
}

/**
 * Funzione per caricare i sottocapitoli nella sidebar
 * @param {string} chapterTitle - Il titolo del capitolo
 * @param {string} chapterJson - Il nome del file JSON
 * @param {string} moduleKey - La chiave del modulo
 * @param {string} year - L'anno accademico
 * @param {HTMLElement} sidebarSubchaptersList - L'elemento UL dove inserire i sottocapitoli nella sidebar
 */
async function loadSidebarSubchapters(chapterTitle, chapterJson, moduleKey, year, sidebarSubchaptersList) {
    // Costruisci il path del file JSON
    const jsonPath = `anno-${year}/${moduleKey}/pages/${chapterJson}`;
    
    try {
        // Carica il file JSON
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error('Errore nel caricamento del capitolo');
        const data = await response.json();
        
        // Trova tutti i titoli di heading di livello 3 (sottocapitoli)
        const subchapters = data.content.filter(item => 
            item.type === 'heading' && item.level === 3
        );
        
        // Se non ci sono sottocapitoli, mostra un messaggio
        if (subchapters.length === 0) {
            const noSubchaptersLi = document.createElement('li');
            noSubchaptersLi.textContent = 'Nessun sottocapitolo disponibile';
            noSubchaptersLi.className = 'sidebar-subchapter no-subchapters';
            sidebarSubchaptersList.appendChild(noSubchaptersLi);
            sidebarSubchaptersList.style.display = 'block';
            return;
        }
        
        // Crea un elemento li per ogni sottocapitolo
        subchapters.forEach((subchapter, index) => {
            const subchapterLi = document.createElement('li');
            subchapterLi.className = 'sidebar-subchapter';
            
            const subchapterLink = document.createElement('a');
            subchapterLink.href = '#';
            subchapterLink.textContent = subchapter.text;
            subchapterLink.className = 'sidebar-subchapter-link';
            
            // Crea un ID univoco per l'ancoraggio basato sul testo
            const slug = createSlug(subchapter.text);
            
            // Aggiungi evento click per navigare al sottocapitolo
            // Memorizziamo tutte le informazioni necessarie come attributi per evitare problemi di closure
            subchapterLink.setAttribute('data-chapter', chapterTitle);
            subchapterLink.setAttribute('data-slug', slug);
            subchapterLink.setAttribute('data-module', moduleKey);
            subchapterLink.setAttribute('data-year', year);
            subchapterLink.setAttribute('data-index', index); // Aggiungiamo l'indice per identificare il primo sottocapitolo
            
            subchapterLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Recupera tutti i dati dagli attributi dell'elemento
                const clickedLink = e.currentTarget;
                const targetChapter = clickedLink.getAttribute('data-chapter');
                const targetSlug = clickedLink.getAttribute('data-slug');
                const targetModule = clickedLink.getAttribute('data-module');
                const targetYear = clickedLink.getAttribute('data-year');
                const targetIndex = parseInt(clickedLink.getAttribute('data-index'), 10);
                
                console.log('Navigazione sottocapitolo:', {
                    chapter: targetChapter,
                    slug: targetSlug,
                    module: targetModule,
                    year: targetYear,
                    currentModule: currentlyOpenModuleKey,
                    index: targetIndex
                });
                
                // Ottieni l'elemento del capitolo attualmente visualizzato
                const chapterPage = document.getElementById('chapter-page');
                const isChapterPageVisible = !chapterPage.classList.contains('hidden');
                
                // Leggi il titolo del capitolo attualmente visualizzato dall'attributo
                const currentChapterTitle = chapterPage.getAttribute('data-current-chapter');
                
                // Aggiungiamo un log per debug
                console.log('Verifica capitolo:', {
                    clickedChapter: targetChapter,
                    currentChapterTitle: currentChapterTitle
                });
                
                // La condizione corretta è: pagina capitolo è visibile E il titolo del capitolo cliccato è uguale a quello attualmente visualizzato
                const isCurrentChapter = isChapterPageVisible && (targetChapter === currentChapterTitle);
                
                // Se siamo già nella pagina del capitolo corrente
                if (isCurrentChapter) {
                    console.log('Stesso capitolo, gestione scroll');
                    
                    // Se è il primo sottocapitolo, scorriamo all'inizio della pagina
                    if (targetIndex === 0) {
                        // Ottieni l'elemento contenitore del capitolo e imposta lo scroll
                        const contentContainer = document.querySelector('.chapter-content');
                        if (contentContainer) {
                            contentContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            document.body.scrollTop = 0; 
                            document.documentElement.scrollTop = 0; 
                        }
                    } else {
                        // Altrimenti scorriamo all'ancora specifica
                        const element = document.getElementById(targetSlug);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            console.error('Elemento ancora non trovato:', targetSlug);
                        }
                    }
                } else {
                    // Altrimenti, imposta le variabili globali e carica il capitolo
                    console.log('Cambio capitolo:', targetModule, targetYear);
                    currentlyOpenModuleKey = targetModule;
                    currentYear = targetYear;
                    
                    // Se è il primo sottocapitolo, carica la pagina senza specificare ancora
                    if (targetIndex === 0) {
                        showChapterPage(targetChapter);
                    } else {
                        showChapterPage(targetChapter, targetSlug);
                    }
                }
            });
            
            subchapterLi.appendChild(subchapterLink);
            sidebarSubchaptersList.appendChild(subchapterLi);
        });
        
        // Mostra la lista dei sottocapitoli
        sidebarSubchaptersList.style.display = 'block';
        
    } catch (error) {
        console.error('Errore nel caricamento dei sottocapitoli nella sidebar:', error);
        
        // Mostra un messaggio di errore
        const errorLi = document.createElement('li');
        errorLi.textContent = 'Errore nel caricamento dei sottocapitoli';
        errorLi.className = 'sidebar-subchapter error';
        sidebarSubchaptersList.appendChild(errorLi);
        sidebarSubchaptersList.style.display = 'block';
    }
}

document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault(); // Impedisce il ricaricamento della pagina

    // Esegue la stessa logica del pulsante "indietro"
    document.getElementById('chapter-page').classList.add('hidden');
    document.querySelector('.years-container').classList.remove('hidden');
    document.querySelector('main').style.background = '';
    document.querySelector('header').style.background = '';
    document.getElementById('sidebar-menu').classList.add('hidden');
    document.getElementById('toggle-menu-btn').classList.add('hidden');

    // Resetta lo stato dei moduli per permettere di ricliccare sugli stessi moduli
    currentlyOpenModuleKey = null;
    currentYear = null;
});

// Lightbox functionality for images

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = imgElement.src;
    lightboxImg.alt = imgElement.alt;
    lightbox.style.display = 'flex';

    // Prevenire lo scroll del body quando la lightbox è aperta
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.style.display = 'none';

    // Riabilita lo scroll del body
    document.body.style.overflow = 'auto';
}

// Event listeners per chiudere la lightbox
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        // Chiudi con click sull'overlay (non sull'immagine)
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Chiudi con tasto ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }
});

function updateSearchBarPath(currentModuleValue) {
    // 1. Definisci il percorso base obbligatorio
    const basePath = "/Fisica";
    
    // 2. Trova l'elemento HTML della barra di ricerca (adatta l'ID)
    const searchBarElement = document.getElementById('id-della-tua-barra-di-ricerca'); 

    if (!searchBarElement) {
        console.error("Elemento della barra di ricerca non trovato. Controlla l'ID.");
        return; 
    }

    // 3. Logica di concatenazione:
    let newPath = basePath;
    
    // Controlla se il valore del modulo è definito e non vuoto
    if (currentModuleValue && currentModuleValue.trim() !== "") {
        newPath += "/" + currentModuleValue;
    }

    // 4. Aggiorna il contenuto dell'elemento HTML
    searchBarElement.textContent = newPath; 
    // Puoi usare .innerHTML se preferisci, ma .textContent è più sicuro per il testo semplice.
}