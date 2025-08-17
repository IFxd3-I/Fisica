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
            ADD_TAGS: ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'em', 'strong', 'mark', 'figure', 'figcaption', 'img', 'div', 'hr', 'span'],
            ADD_ATTR: ['class', 'id', 'src', 'alt']
        };

        let contentHTML = `<h2 class="chapter-title">${DOMPurify.sanitize(renderMath(data.title), sanitizeConfig)}</h2>`;
        const tocListHTML = data.toc.map(item => `<li>${DOMPurify.sanitize(renderMath(item), sanitizeConfig)}</li>`).join('');
        contentHTML += `<ul class="topic-list">${tocListHTML}</ul>`;

        if (showFullContent && data.content && data.content.length > 0) {
            contentHTML += `<div class="chapter-full-content">`;
            data.content.forEach(item => {
                const itemClass = `content-${item.type}${item.level ? `-${item.level}` : ''}`;
                const sanitizedText = item.text ? DOMPurify.sanitize(renderMath(item.text), sanitizeConfig) : '';

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
                        contentHTML += `<hr class="${itemClass}"></hr>`;
                        break;
                    case 'image':
                        contentHTML += `<figure class="${itemClass}">
                                            <img src="${DOMPurify.sanitize(item.src, sanitizeConfig)}" alt="${DOMPurify.sanitize(item.alt, sanitizeConfig)}">
                                            ${item.caption ? `<figcaption>${DOMPurify.sanitize(item.caption, sanitizeConfig)}</figcaption>` : ''}
                                        </figure>`;
                        break;
                    case 'list':
                        const listItems = item.items.map(li => `<li>${DOMPurify.sanitize(renderMath(li), sanitizeConfig)}</li>`).join('');
                        contentHTML += `<ul class="${itemClass}">${listItems}</ul>`;
                        break;
                    default:
                        contentHTML += `<p class="content-paragraph">${sanitizedText}</p>`;
                }
            });
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
        window.location.hash = '';
        isSinglePanel = false;
        mainWrapper.classList.remove('single-panel');
        const activeChapter = chaptersList.querySelector('li.active');
        if (activeChapter) {
            await renderChapter(activeChapter.dataset.chapter, false);
        }
    });

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

})();