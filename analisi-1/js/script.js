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

    // Questa funzione non è più necessaria, la logica di sanificazione viene applicata alla fine
    // function sanitizeHTML(htmlString) {
    //     return DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
    // }

    function renderMath(text) {
        if (typeof text !== 'string') {
            return '';
        }

        let renderedText = text.replace(/\\\\\((.*?)\\\\\)/g, (match, p1) => {
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

        let contentHTML = `<h2 class="chapter-title">${data.title}</h2>`;

        const tocListHTML = data.toc.map(item => `<li>${item}</li>`).join('');
        contentHTML += `<ul class="topic-list">${tocListHTML}</ul>`;

        if (showFullContent && data.content && data.content.length > 0) {
            contentHTML += `<div class="chapter-full-content">`;
            data.content.forEach(item => {
                const itemClass = `content-${item.type}${item.level ? `-${item.level}` : ''}`;

                switch (item.type) {
                    case 'paragraph':
                        contentHTML += `<p class="${itemClass}">${renderMath(item.text)}</p>`;
                        break;
                    case 'heading':
                        contentHTML += `<h${item.level} class="${itemClass}">${item.text}</h${item.level}>`;
                        break;
                    case 'math':
                        contentHTML += `<div class="${itemClass}">${renderMath(`$$${item.text}$$`)}</div>`;
                        break;
                    case 'divider':
                        contentHTML += `<hr class="${itemClass}"></hr>`;
                        break;
                    case 'image':
                        contentHTML += `<figure class="${itemClass}">
                                            <img src="${item.src}" alt="${item.alt}">
                                            ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ''}
                                        </figure>`;
                        break;
                    case 'list':
                        const listItems = item.items.map(li => `<li>${renderMath(li)}</li>`).join('');
                        contentHTML += `<ul class="${itemClass}">${listItems}</ul>`;
                        break;
                    default:
                        contentHTML += `<p class="content-paragraph">${renderMath(item.text)}</p>`;
                }
            });
            contentHTML += `</div>`;
        } else if (showFullContent && (!data.content || data.content.length === 0)) {
            contentHTML += `<p class="placeholder-text chapter-full-content">Contenuto esteso non ancora disponibile.</p>`;
        }

        contentDisplay.classList.remove('animate-content');

        // Sanifichiamo la stringa HTML completa qui, un solo punto
        contentDisplay.innerHTML = DOMPurify.sanitize(contentHTML, {
            ADD_TAGS: ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'em', 'strong', 'mark', 'figure', 'figcaption', 'img', 'div', 'hr', 'span'],
            ADD_ATTR: ['class', 'id', 'src', 'alt']
        });

        if (typeof MathJax !== 'undefined') {
            MathJax.typesetPromise(contentDisplay);
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
        const chapterKey = clickedLi.dataset.chapter;

        isSinglePanel = true;
        mainWrapper.classList.add('single-panel');
        await renderChapter(chapterKey, true);
    });

    const rightPanel = document.querySelector('.right-panel');
    const backButton = document.createElement('button');
    backButton.textContent = '← Torna all\'indice';
    backButton.classList.add('back-button');
    rightPanel.prepend(backButton);

    backButton.addEventListener('click', async () => {
        isSinglePanel = false;
        mainWrapper.classList.remove('single-panel');
        const activeChapter = chaptersList.querySelector('li.active');
        if (activeChapter) {
            await renderChapter(activeChapter.dataset.chapter, false);
        }
    });

    const firstChapter = chaptersList.querySelector('li');
    if (firstChapter) {
        firstChapter.classList.add('active');
        await renderChapter(firstChapter.dataset.chapter, false);
    }
})();