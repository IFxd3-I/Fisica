
// Gestione click su titolo Analisi 1 per tornare all'index generale
document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('analisi-1-title');
    if(title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }
});

(async () => {

    const chaptersList = document.getElementById('chapters-list');
    const contentDisplay = document.getElementById('content-display');
    const mainWrapper = document.querySelector('.main-wrapper');

    let isSinglePanel = false;
    const chaptersCache = {};
    const validChapters = [
        'il-campo-reale',
        'teoria-degli-spazi-metrici',
        'oscillatore-armonico',
        'successioni-in-spazi-euclidei',
        'serie-numeriche',
        'limiti-di-funzioni',
        'continuita',
        'calcolo-differenziale',
        'numeri-complessi',
        'esercizi'
    ];

    async function fetchChapterData(chapterKey) {
        if (!validChapters.includes(chapterKey)) {
            console.error(`Tentativo di caricare un capitolo non valido: ${chapterKey}`);
            return null;
        }

        if (chaptersCache[chapterKey]) {
            return chaptersCache[chapterKey];
        }

        try {
            const url = `../analisi-1/pages/${chapterKey}.json`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Errore di rete: ${response.statusText}`);
            }
            const data = await response.json();
            chaptersCache[chapterKey] = data;
            return data;
        } catch (error) {
            console.error("Errore durante il caricamento del capitolo:", error);
            return null;
        }
    }

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

    function removeAnimationClassSafely() {
        const lastAnimatedElement = contentDisplay.querySelector('.topic-list li:last-child');
        if (lastAnimatedElement) {
            lastAnimatedElement.addEventListener('animationend', () => {
                contentDisplay.classList.remove('animate-content');
            }, { once: true });
        }
    }

    async function renderChapter(chapterKey, showFullContent = false) {
        const data = await fetchChapterData(chapterKey);

        if (!data || !data.title) {
            contentDisplay.innerHTML = DOMPurify.sanitize('<p class="placeholder-text">Contenuto non trovato.</p>');
            return;
        }

        const sanitizeConfig = {
            ADD_TAGS: ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'em', 'strong', 'mark', 'figure', 'figcaption', 'img', 'div', 'hr', 'span', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
            ADD_ATTR: ['class', 'id', 'src', 'alt']
        };

        let contentHTML = `<h2 class="chapter-title">${DOMPurify.sanitize(renderMath(data.title), sanitizeConfig)}</h2>`;
        const tocListHTML = data.toc.map(item => `<li>${DOMPurify.sanitize(renderMath(item), sanitizeConfig)}</li>`).join('');
        contentHTML += `<ul class="topic-list">${tocListHTML}</ul>`;

        if (showFullContent && data.content && data.content.length > 0) {
            contentHTML += `<div class="chapter-full-content">`;
            for (let i = 0; i < data.content.length; i++) {
                const item = data.content[i];
                const itemClass = `content-${item.type}${item.level ? `-${item.level}` : ''}`;
                const sanitizedText = item.text ? DOMPurify.sanitize(renderMath(item.text), sanitizeConfig) : '';

                // If item is a theorem, check if next item is a proof and render as unified container
                if (item.type === 'theorem') {
                    const rawTitle = item.title ? String(item.title).trim() : '';
                    const thTitle = rawTitle ? DOMPurify.sanitize(rawTitle, sanitizeConfig) : '';
                    const statement = DOMPurify.sanitize(renderMath(item.text || ''), sanitizeConfig);
                    const headerText = thTitle;

                    // lookahead for proof
                    if (i + 1 < data.content.length && (data.content[i + 1].type === 'proof' || data.content[i + 1].type === 'dimostrazione')) {
                        const proofItem = data.content[i + 1];
                        const proofId = `theorem-proof-${Math.random().toString(36).substr(2, 9)}`;
                        // bottone posizionato in alto a destra della box teorema
                        const proofButton = `<button class=\"theorem-proof-button corner\" onclick=\"toggleTheorem('${proofId}')\" aria-label=\"Mostra dimostrazione\" aria-expanded=\"false\"></button>`;
                        const proofContent = `\n                            <div class=\"example-content theorem-proof\" id=\"${proofId}\" style=\"display: none;\">\n                                ${DOMPurify.sanitize(renderMath(proofItem.text || ''), sanitizeConfig)}\n                            </div>`;
                        i++; // consume proof

                        contentHTML += `\n                        <div class=\"theorem-container ${itemClass}\">\n                            <div class=\"theorem-header\" style=\"position:relative\">\n                                <span class=\"theorem-category\">${headerText}</span>\n                                ${proofButton}\n                            </div>\n                            <div class=\"theorem-statement\">${statement}</div>\n                            ${proofContent}\n                        </div>`;
                    } else {
                        contentHTML += `\n                        <div class="theorem-container ${itemClass}">\n                            <div class="theorem-header">\n                                <span class="theorem-category">${headerText}</span>\n                            </div>\n                            <div class="theorem-statement">${statement}</div>\n                        </div>`;
                    }
                    continue;
                }

                // Non-theorem rendering (unchanged)
                switch (item.type) {
                    case 'paragraph':
                        contentHTML += `<p class="${itemClass}">${sanitizedText}</p>`;
                        break;
                    case 'heading':
                        contentHTML += `<h${item.level} class="${itemClass}">${DOMPurify.sanitize(item.text, sanitizeConfig)}</h${item.level}>`;
                        break;
                    case 'math':
                        contentHTML += `<div class="${itemClass}">$$${item.text}$$</div>`;
                        break;
                    case 'divider':
                        contentHTML += `<hr class="${itemClass}">`;
                        break;
                    case 'image':
                        contentHTML += `<figure class="${itemClass}">\n                                            <img src="${DOMPurify.sanitize(item.src, sanitizeConfig)}" alt="${DOMPurify.sanitize(item.alt, sanitizeConfig)}">\n                                            ${item.caption ? `<figcaption>${DOMPurify.sanitize(item.caption, sanitizeConfig)}</figcaption>` : ''}\n                                        </figure>`;
                        break;
                    case 'list':
                        const listItems = item.items.map(li => `<li>${DOMPurify.sanitize(renderMath(li), sanitizeConfig)}</li>`).join('');
                        contentHTML += `<ul class="${itemClass}">${listItems}</ul>`;
                        break;
                    case 'olist':
                        const olistItems = item.items.map(li => `<li>${DOMPurify.sanitize(renderMath(li), sanitizeConfig)}</li>`).join('');
                        contentHTML += `<ol class="${itemClass}">${olistItems}</ol>`;
                        break;
                    case 'example':
                        const exampleId = `example-${Math.random().toString(36).substr(2, 9)}`;
                        contentHTML += `\n                            <div class="example-container">\n                                <span class="example-trigger" onclick="toggleExample('${exampleId}')">\n                                    💡 <span class="example-label">Esempio</span>\n                                </span>\n                                <div class="example-content" id="${exampleId}" style="display: none;">\n                                    ${DOMPurify.sanitize(renderMath(item.text), sanitizeConfig)}\n                                </div>\n                            </div>`;
                        break;
                    case 'table':
                        let tableHTML = `<table class="${itemClass}">`;
                        if (item.headers) {
                            tableHTML += '<thead><tr>';
                            item.headers.forEach(header => {
                                tableHTML += `<th>${DOMPurify.sanitize(renderMath(header), sanitizeConfig)}</th>`;
                            });
                            tableHTML += '</tr></thead>';
                        }
                        if (item.rows) {
                            tableHTML += '<tbody>';
                            item.rows.forEach(row => {
                                tableHTML += '<tr>';
                                row.forEach(cell => {
                                    tableHTML += `<td>${DOMPurify.sanitize(renderMath(cell), sanitizeConfig)}</td>`;
                                });
                                tableHTML += '</tr>';
                            });
                            tableHTML += '</tbody>';
                        }
                        tableHTML += '</table>';
                        contentHTML += tableHTML;
                        break;
                    default:
                        contentHTML += `<p class="content-paragraph">${sanitizedText}</p>`;
                }
            }
            contentHTML += `</div>`;
        } else if (showFullContent && (!data.content || data.content.length === 0)) {
            contentHTML += `<p class="placeholder-text chapter-full-content">Contenuto esteso non ancora disponibile.</p>`;
        }

        contentDisplay.classList.remove('animate-content');

        contentDisplay.innerHTML = contentHTML;

        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise([contentDisplay]).then(() => {
                console.log("MathJax typesetting complete!");
            });
        }

        if (!isSinglePanel) {
            requestAnimationFrame(() => {
                contentDisplay.classList.add('animate-content');
            });
            removeAnimationClassSafely();
        }
    }

    chaptersList.addEventListener('mouseover', async (event) => {
        const hoveredLi = event.target.closest('li');
        if (!hoveredLi || isSinglePanel) {
            return;
        }

        // Reset del menu quando si naviga sui capitoli
        isShowingMenu = false;

        document.querySelector('#chapters-list .active')?.classList.remove('active');
        hoveredLi.classList.add('active');

        const chapterKey = hoveredLi.dataset.chapter;
        await renderChapter(chapterKey, false);
    });

    chaptersList.addEventListener('click', async (event) => {
        const clickedLi = event.target.closest('li');
        if (!clickedLi) {
            return;
        }
        
        // Reset del menu quando si clicca su un capitolo
        isShowingMenu = false;
        
        const chapterKey = clickedLi.dataset.chapter;
        
        window.location.hash = chapterKey;
        isSinglePanel = true;
        mainWrapper.classList.add('single-panel');
        await renderChapter(chapterKey, true);
    });

    window.addEventListener('hashchange', async () => {
        const chapterKey = window.location.hash.substring(1);
        if (chapterKey && validChapters.includes(chapterKey)) {
            isSinglePanel = true;
            mainWrapper.classList.add('single-panel');
            document.querySelector('#chapters-list .active')?.classList.remove('active');
            const activeLi = chaptersList.querySelector(`li[data-chapter="${chapterKey}"]`);
            if (activeLi) activeLi.classList.add('active');
            await renderChapter(chapterKey, true);
        }
    });

    const rightPanel = document.querySelector('.right-panel');
    const backButton = document.createElement('button');
    backButton.textContent = '← Torna all\'indice';
    backButton.classList.add('back-button');
    rightPanel.prepend(backButton);

    backButton.addEventListener('click', async () => {
        // Controlla se siamo nel menu principale
        const isInMainMenu = contentDisplay.querySelector('.fullscreen-menu');
        let originalContent = null;
        
        if (isInMainMenu) {
            // Torna dalla modalità menu principale ad Analisi 1
            isSinglePanel = false;
            mainWrapper.classList.remove('single-panel');
            
            // Ripristina il contenuto originale se disponibile
            if (originalContent) {
                contentDisplay.innerHTML = originalContent;
                originalContent = null;
            } else {
                // Fallback: carica il primo capitolo
                const firstChapter = chaptersList.querySelector('li');
                if (firstChapter) {
                    firstChapter.classList.add('active');
                    await renderChapter(firstChapter.dataset.chapter, false);
                }
            }
        } else {
            // Comportamento normale: torna dalla vista capitolo alla lista
            window.location.hash = '';
            isSinglePanel = false;
            mainWrapper.classList.remove('single-panel');
            const activeChapter = chaptersList.querySelector('li.active');
            if (activeChapter) {
                await renderChapter(activeChapter.dataset.chapter, false);
            }
        }
    });

    // Gestore click sul titolo per tornare all'index principale
    const titleElement = document.querySelector('.left-panel h2');
    let isShowingMenu = false;

    if (titleElement) {
        // Click sul titolo: non deve fare nulla
        titleElement.addEventListener('click', (e) => {
            e.preventDefault();
            return false;
        });

        // Hover per mostrare menu principale (senza delay)
        titleElement.addEventListener('mouseenter', async () => {
            // Rimuovi highlight dalla lista capitoli
            const activeChapter = chaptersList.querySelector('li.active');
            if (activeChapter) {
                activeChapter.classList.remove('active');
            }
        });
    }

    const urlChapter = window.location.hash.substring(1);
    if (urlChapter && validChapters.includes(urlChapter)) {
        isSinglePanel = true;
        mainWrapper.classList.add('single-panel');
        const activeLi = chaptersList.querySelector(`li[data-chapter="${urlChapter}"]`);
        if (activeLi) activeLi.classList.add('active');
        await renderChapter(urlChapter, true);
    } else {
        const firstChapter = chaptersList.querySelector('li');
        if (firstChapter) {
            firstChapter.classList.add('active');
            await renderChapter(firstChapter.dataset.chapter, false);
        }
    }

    // Funzione per toggle degli esempi
    window.toggleExample = function(exampleId) {
        const exampleContent = document.getElementById(exampleId);
        const trigger = exampleContent.previousElementSibling;
        
        if (exampleContent.style.display === 'none') {
            exampleContent.style.display = 'block';
            trigger.classList.add('expanded');
            const label = trigger.querySelector('.example-label');
            if (label) {
                label.textContent = 'Nascondi esempio';
            }
        } else {
            exampleContent.style.display = 'none';
            trigger.classList.remove('expanded');
            trigger.querySelector('.example-label').textContent = 'Esempio';
        }
        
        // Re-render MathJax se necessario
        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise([exampleContent]);
        }
    };

    // Funzione per toggle delle dimostrazioni nei teoremi
    window.toggleTheorem = function(proofId) {
        const proofContent = document.getElementById(proofId);
        if (!proofContent) return;

        // Trova il bottone associato (cerca nel parent precedente, che è .theorem-statement)
        let button = null;
        let trigger = null;
        if (proofContent.previousElementSibling && proofContent.previousElementSibling.classList.contains('theorem-statement')) {
            trigger = proofContent.previousElementSibling;
            button = trigger.querySelector('.theorem-proof-button');
        } else {
            // fallback: cerca il bottone nel parent
            button = proofContent.parentElement && proofContent.parentElement.querySelector('.theorem-proof-button');
        }

        if (proofContent.style.display === 'none') {
            proofContent.style.display = 'block';
            if (trigger) trigger.classList.add('expanded');
            if (button) {
                button.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-label', 'Nascondi dimostrazione');
            }
        } else {
            proofContent.style.display = 'none';
            if (trigger) trigger.classList.remove('expanded');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-label', 'Mostra dimostrazione');
            }
        }

        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise([proofContent]);
        }
    };

})();