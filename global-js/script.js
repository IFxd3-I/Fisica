const API_KEY = "DEMO_KEY";

const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const TODAY = '2023-10-01'; // Temporarily set to a past date for testing



// Solo sfondo, niente altri elementi

/**

 * Funzione principale per impostare lo sfondo.

 * Solo console per stato.

 */

function visualizzaAPOD(data, isCached) {

    // --- Messaggio di stato: SOLO CONSOLE ---

    const status = isCached

        ? "APOD: Sfondo caricato dalla cache locale."

        : "APOD: Dati recuperati dall'API NASA (Richiesta effettuata).";

    console.log(status);



    // Imposta lo sfondo SOLO se è un'immagine

    if (data.media_type === 'image') {

        const imageUrl = data.hdurl || data.url;



        // Applica lo sfondo e gli stili

        document.body.style.backgroundImage = `url('${imageUrl}')`;

        document.body.style.backgroundSize = 'cover';

        document.body.style.backgroundPosition = 'center';

        document.body.style.backgroundAttachment = 'fixed';



    } else {

        // Gestione dei video: sfondo nero

        document.body.style.backgroundImage = 'none';

        document.body.style.backgroundColor = '#111';

        console.warn(`APOD: Oggi è un video (${data.title}). Sfondo non impostato.`);

    }

}



/**

 * Funzione principale: carica l'APOD con logica di caching.

 */

async function caricaAPOD() {

    try {

        const cachedString = localStorage.getItem('nasaAPOD');

        const cachedData = cachedString ? JSON.parse(cachedString) : null;



        // 1. **VERIFICA CACHE:** Se i dati esistono E la data è OGGI, usa la cache

        if (cachedData && cachedData.date === TODAY) {

            visualizzaAPOD(cachedData, true);

            return;

        }



        // 2. CACHE SCADUTA/ASSENTE: Chiama l'API NASA

        const response = await fetch(APOD_URL);



        if (!response.ok) {

            const error = await response.json();

            throw new Error(error.msg || `Errore HTTP: ${response.status}`);

        }



        const data = await response.json();



        // 3. SALVATAGGIO CACHE

        localStorage.setItem('nasaAPOD', JSON.stringify(data));

        visualizzaAPOD(data, false);



    } catch (error) {

        console.error("APOD: Errore nel recupero:", error);



        const fallbackData = JSON.parse(localStorage.getItem('nasaAPOD'));

        if (fallbackData) {

            visualizzaAPOD(fallbackData, true);

        }

    }

}

caricaAPOD();

// Hard-coded chapters for each module (to be filled later)
const chapters = {
    "analisi-1": [
        { title: "Il Campo Reale", json: "il-campo-reale.json" },
        { title: "Teoria degli spazi metrici", json: "teoria-degli-spazi-metrici.json" },
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
        { title: "Cinematica", json: "cinematica.json" },
        { title: "Dinamica", json: "dinamica.json" },
        { title: "Energetica", json: "energetica.json" }
    ],
    "laboratorio-fisica": [
        { title: "Statistica", json: "statistica.json" },
        { title: "Errori", json: "errori.json" },
        { title: "Misure", json: "misure.json" }
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

        if (chapters[moduleKey]) {
            chapters[moduleKey].forEach(chapter => {
                const li = document.createElement('li');
                li.className = 'chapter';
                li.textContent = chapter.title;
                li.setAttribute('data-chapter', chapter.json);
                li.addEventListener('click', () => {
                    // Show chapter page
                    showChapterPage(chapter.title);
                });
                chaptersList.appendChild(li);
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
});

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

    let renderedText = text.replace(/\\\((.*?)\\\)/g, (match, p1) => {
        return `<span class="inline-math">\\(${p1}\\)</span>`;
    });

    renderedText = renderedText.replace(/\$\$(.*?)\$\$/g, (match, p1) => {
        return `<div class="math-block">$$${p1}$$</div>`;
    });

    return renderedText;
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

async function showChapterPage(chapterTitle) {

    const chapterPage = document.getElementById('chapter-page');
    const yearsContainer = document.querySelector('.years-container');

    // Nascondi la lista anni
    yearsContainer.classList.add('hidden');
    // Mostra la pagina capitolo
    chapterPage.classList.remove('hidden');

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
                        html += `<h${item.level}>${item.text}</h${item.level}>`;
                        break;
                    case 'paragraph':
                        html += `<p>${renderMath(item.text)}</p>`;
                        break;
                    case 'math':
                        html += `<div class="math-block">$$${item.text}$$</div>`;
                        break;
                    case 'example': {
                        const exampleId = `example-${Math.random().toString(36).substr(2, 9)}`;
                        const exampleButton = `<button class="example-button" onclick="toggleExample('${exampleId}')" aria-label="Mostra esempio">Mostra Esempio</button>`;
                        const exampleContent = `<div class="example-content" id="${exampleId}" style="display: none;">${renderMath(item.text || '')}</div>`;
                        html += `<div class="example-container">${exampleButton}${exampleContent}</div>`;
                        break;
                    }
                    case 'title':
                        html += `<h1 class="content-title">${item.text}</h1>`;
                        break;
                    case 'list':
                        if (item.items && Array.isArray(item.items)) {
                            html += '<ul class="content-list">';
                            item.items.forEach(listItem => {
                                html += `<li>${renderMath(listItem)}</li>`;
                            });
                            html += '</ul>';
                        }
                        break;
                    case 'theorem':
                        const rawTitle = item.title ? String(item.title).trim() : '';
                        const thTitle = rawTitle || 'Teorema';
                        const statement = renderMath(item.text || '');
                        const headerText = thTitle;

                        // lookahead for proof
                        if (i + 1 < data.content.length && (data.content[i + 1].type === 'proof' || data.content[i + 1].type === 'dimostrazione')) {
                            const proofItem = data.content[i + 1];
                            const proofId = `theorem-proof-${Math.random().toString(36).substr(2, 9)}`;
                            const proofButton = `<button class="theorem-proof-button corner" onclick="toggleTheorem('${proofId}')" aria-label="Mostra dimostrazione" aria-expanded="false"></button>`;
                            const proofContent = `<div class="example-content theorem-proof" id="${proofId}" style="display: none;">${renderMath(proofItem.text || '')}</div>`;
                            i++; // consume proof

                            html += `<div class="theorem-container"><div class="theorem-header" style="position:relative"><span class="theorem-category">${headerText}</span>${proofButton}</div><div class="theorem-statement">${statement}</div>${proofContent}</div>`;
                        } else {
                            html += `<div class="theorem-container"><div class="theorem-header"><span class="theorem-category">${headerText}</span></div><div class="theorem-statement">${statement}</div></div>`;
                        }
                        break;
                    // Aggiungi altri casi per tipi aggiuntivi se necessario
                    default:
                        html += `<p>Tipo di contenuto non supportato: ${item.type}</p>`;
                        break;
                }
            }
        } else {
            html = '<p>Struttura del contenuto non valida.</p>';
        }
        chapterPage.querySelector('.chapter-content').innerHTML = html;
        // Se MathJax è disponibile, renderizza le espressioni matematiche
        if (typeof MathJax !== 'undefined') {
            MathJax.typeset();
        }
    } catch (e) {
        chapterPage.querySelector('.chapter-content').textContent = 'Errore nel caricamento del capitolo.';
    }
}