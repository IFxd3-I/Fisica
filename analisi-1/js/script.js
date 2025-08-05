(() => {
    const chaptersList = document.getElementById('chapters-list');
    const contentDisplay = document.getElementById('content-display');
    const mainWrapper = document.querySelector('.main-wrapper');

    // This is your original data, left unchanged for the renderer
    const chaptersData = {
        'il-campo-reale': {
            title: 'Il Campo Reale',
            toc: [
                'Insiemi numerici noti <strong>N</strong>, <strong>Z</strong>, <strong>Q</strong>',
                'Rappresentazione decimale dei razionali',
                'Numeri reali <strong>R</strong>: definizione, estremo superiore/inferiore',
                'Densità di <strong>Q</strong> in <strong>R</strong>, la completezza di <strong>R</strong>',
                'Richiami sul concetto di funzione tra insieme',
                'Insiemi equipotenti: <a class="dim">insiemi numerabili</a>, <a class="dim">non numerabilità di <strong>R</strong></a>'
            ],
            content: [
                { type: 'paragraph', text: 'L\'analisi matematica si basa sul concetto di insieme numerico. I più elementari che conosciamo sono i numeri naturali, interi e razionali.' },
                { type: 'heading', level: 3, text: 'Insiemi numerici: N, Z, Q' },
                { type: 'paragraph', text: 'L\'insieme dei numeri naturali è l\'insieme dei numeri interi positivi, <mark>\\( \\mathbb{N} = \\{1, 2, 3, ...\\} \\)</mark>.' },
                { type: 'paragraph', text: 'Successivamente, estendiamo questo concetto con l\'insieme dei numeri interi, <mark>\\( \\mathbb{Z} = \\{..., -1, 0, 1, ...\\} \\)</mark>, che include i numeri negativi e lo zero.' },
                { type: 'paragraph', text: 'Infine, i numeri razionali, <mark>\\( \\mathbb{Q} = \\{p/q : p, q \\in \\mathbb{Z}, q \\neq 0\\} \\)</mark>, rappresentano le frazioni.' },
                { type: 'heading', level: 3, text: 'La completezza di R' },
                { type: 'paragraph', text: 'A differenza degli insiemi <strong>N</strong>, <strong>Z</strong> e <strong>Q</strong>, l\'insieme dei numeri reali <strong>R</strong> è un insieme completo. Questo significa che ogni insieme non vuoto e limitato superiormente ammette un estremo superiore.' }
            ]
        },
        'teoria-degli-spazi-metrici': {
            title: 'Teoria degli spazi metrici',
            toc: [
                'Spazi metrici: definizione, primi esempi inclusi spazi euclidei',
                '<a class="dim">Intorni e classificazione dei punti</a>',
                '<a class="dim">Insiemi aperti, chiusi, limitati e compatti: loro proprieta</a>',
                '<a class="dim">Successioni a valori in spazi metrici: successioni convergenti e unicità del limite</a>',
                '<a class="dim">Condizioni necessarie per la convergenza: limitatezza, sottosuccessioni e la condizione di Cauchy</a>',
                'Spazi metrici completi'
            ],
            content: []
        },
        'oscillatore-armonico': {
            title: 'Oscillatore Armonico',
            toc: [
                'Legge di Hooke e Leggi di Newton',
                'Equazioni differenziali del moto',
                'Soluzioni dell\'equazione',
                'Velocità e accelerazione massime'
            ],
            content: [
                { type: 'heading', level: 4, text: 'Oscillatore Armonico' },
                { type: 'paragraph', text: 'Il modello base di quasi tutti i fenomeni oscillatori e ondulatori è l\'<em>oscillatore armonico semplice</em>. Esso è un sistema che, se spostato, è soggetto a una forza di richiamo chiamata <em>Legge di Hooke</em>, direttamente proporzionale allo spostamento e sempre diretta verso la posizione di equilibrio.' },
                { type: 'image', src: '../img/oscillatore armonico.jpg', alt: 'Oscillatore Armonico' },
                { type: 'paragraph', text: 'Iniziamo scrivendo la <em>Legge di Hooke</em> che descrive la forza di richiamo elastica:' },
                { type: 'math', text: 'F_k = -k \\cdot x' },
                { type: 'paragraph', text: 'Dove:' },
                { type: 'list', items: ['\\(x\\): spostamento del blocco dal punto di equilibrio (il segno indica la direzione, con la forza sempre opposta allo spostamento rispetto all\'equilibrio).', '\\(k\\): costante di proporzionalità della molla (o costante elastica), misura la "rigidità" della molla.', '\\(F_k\\): Forza esercitata dalla molla sull\'oggetto, nota anche come forza di richiamo.'] },
                { type: 'paragraph', text: 'Nel caso di più molle in serie:' },
                { type: 'math', text: '\\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}' },
                { type: 'paragraph', text: 'Nel caso di più molle in parallelo:' },
                { type: 'math', text: 'k_{\\text{eq}} = k_1 + k_2' },
                { type: 'paragraph', text: 'Dalla <em>Seconda Legge di Newton</em> sappiamo che la forza netta che agisce su un corpo è \\( \\vec{F} = m \\cdot \\vec{a} \\). Esprimiamo l\'accelerazione come derivata seconda dello spostamento: \\( \\vec{a} = \\frac{d^2 x}{dt^2} \\). Poichè l\'unica forza in gioco sarà quella elastica, allora \\( \\sum{F_\\text{tot}} = m \\cdot \\vec{a} = -kx\\). Arriviamo così a scrivere l\'equazione differenziale che regola l\'oscillatore armonico (dove \\(x\\) sarebbe \\(x(t)\\), ossia la legge oraria del moto):' },
                { type: 'math', text: 'm \\frac{d^2 x}{dt^2} = -k x \\quad \\Rightarrow \\quad \\frac{d^2 x}{dt^2} + \\frac{k}{m} x = 0' },
                { type: 'paragraph', text: 'La relazione tra la costante elastica \\( k \\) e la massa \\( m \\) è data da \\( \\frac{k}{m} = \\omega_0^2 \\), dove \\( \\omega_0 \\) è la <em>pulsazione naturale</em> dell\'oscillatore armonico. In altre parole indica la velocità con cui l\'angolo di fase dell\'oscillazione cambia nel tempo, viene misurata in \\(\\mathrm{rad/s}\\) e dipende solo dalle proprietà fisiche del sistema.' },
                { type: 'math', text: '\\frac{d^2 x}{dt^2} = -\\omega_0^2 x' },
                { type: 'paragraph', text: 'L\'equazione generale dell\'oscillatore armonico che descrive la posizione del blocco nel tempo, ottenuta risolvendo l\'eq differenziale omogenea sopra, è:' },
                { type: 'math', text: 'x(t) = A \\cos(\\omega_0 t) + B \\sin(\\omega_0 t)' },
                { type: 'paragraph', text: 'Dove:' },
                { type: 'list', items: ['\\(A\\) e \\(B\\): Costanti arbitrarie determinate dalle <em>condizioni iniziali</em> del moto.', '\\(\\omega_0\\): pulsazione naturale dell\'oscillatore.', '\\(t\\): tempo dall\'inizio della misurazione.'] },
                { type: 'paragraph', text: 'In alternativa, è spesso più conveniente esprimerla nella forma di una singola funzione armonica ampiezza-fase:' },
                { type: 'math', text: 'x(t) = C \\cos(\\omega_0 t + \\varphi)' },
                { type: 'paragraph', text: 'Dove:' },
                { type: 'list', items: ['\\(C\\): <em>Ampiezza</em> dell\'oscillazione, ossia il massimo spostamento dal punto di equilibrio. È sempre un valore positivo.', '\\(\\varphi\\): <em>Fase iniziale</em> o sfasamento, un angolo che determina la posizione del blocco al tempo \\(t = 0\\). Infatti, a \\(t = 0\\) abbiamo \\(x(0) = C \\cos(\\varphi)\\).'] },
                { type: 'paragraph', text: 'Le costanti \\(A\\) e \\(B\\) (o \\(C\\) e \\(\\varphi\\)) vengono determinate dalle condizioni iniziali del moto, ovvero la posizione iniziale \\(x(0)\\) e la velocità iniziale \\(v(0)\\). Dato che \\(v(t) = \\frac{dx}{dt}\\):' },
                { type: 'math', text: 'v(t) = -C\\omega_0 \\sin(\\omega_0 t + \\varphi) \\quad a(t) = \\frac{dv}{dt} = -C\\omega_0^2 \\cos(\\omega_0 t + \\varphi) = -\\omega_0^2 x(t)' },
                { type: 'paragraph', text: 'Valutando le espressioni di \\(x(t)\\) e \\(v(t)\\) a \\(t=0\\), otteniamo:' },
                { type: 'list', items: ['\\(x(0) = C \\cos(\\varphi)\\)', '\\(v(0) = -C\\omega_0 \\sin(\\varphi)\\)'] },
                { type: 'paragraph', text: 'Da queste, possiamo ricavare l\'ampiezza e la fase iniziale:' },
                { type: 'math', text: 'C = \\sqrt{x(0)^2 + \\left(\\frac{v(0)}{\\omega_0}\\right)^2} \\quad \\tan(\\varphi) = \\frac{-v(0)/\\omega_0}{x(0)}' },
                { type: 'paragraph', text: 'La <em>velocità massima</em> dell\'oscillatore è \\(v_{\\text{max}} = C\\omega_0\\) (raggiunta al punto di equilibrio), e l\'<em>accelerazione massima</em> è \\(a_{\\text{max}} = C\\omega_0^2\\) (raggiunta agli estremi dell\'oscillazione).' },
            ]
        },
        'successioni-in-spazi-euclidei': {
            title: 'Successioni in spazi euclidei',
            toc: [
                '<a class="dim">Teorema di Heine-Borel</a>',
                '<a class="dim">Teorema di Bolzano-Weierstrass</a>',
                'La completezza di <strong>\(R^k\)</strong>',
                'Successioni a valori reali: operazioni, <a class="dim">confronto</a> e <a class="dim">confronto asintotico</a>',
                '<a class="dim">Monotonia e limiti</a>',
                '<a class="dim">Il numero \(e\) di Nepero e i limiti notevoli</a>',
                'Simboli di asintotico e o-piccolo'
            ],
            content: []
        },
        'serie-numeriche': {
            title: 'Serie numeriche',
            toc: [
                'Definizioni ed esempi di carattere di una serie',
                '<a class="dim">Condizione di Cauchy e quella necessaria per la convergenza</a>',
                '<a class="dim">Convergenza assoluta</a>',
                '<a class="dim">Serie a termini non negativi e criteri per la convergenza: del confronto, del confronto asintotico, del rapporto e della radice</a>',
                '<a class="dim">Serie a termini di segno alterno: criterio di Leibniz (eventualmente via il criterio di Abel)</a>'
            ],
            content: []
        },
        'limiti-di-funzioni': {
            title: 'Limiti di funzioni',
            toc: [
                '<a class="dim">Definizione metrica e successionale: equivalenza</a>',
                'Limiti delle funzioni elementari e di quelle monotone',
                'Asintoti al grafico di una funzione'
            ],
            content: []
        },
        'continuita': {
            title: 'Continuità',
            toc: [
                'Continuità puntuale e globale in spazi metrici',
                '<a class="dim">Controimmagini di aperti e continuità</a>',
                'Continuità e composizione',
                '<a class="dim">Teorema di Weierstrass</a>',
                'Continuità uniforme, teorema di Heine-Cantor',
                '<a class="dim">Funzioni reali e continue: teorema degli zeri, dei valori intermedi e conseguenze</a>',
                'Funzioni monotone e discontinuità. Continuità dell\'inversa'
            ],
            content: []
        },
        'calcolo-differenziale': {
            title: 'Calcolo differenziale',
            toc: [
                'Derivata: definizione e significato geometrico',
                'Retta tangente',
                '<a class="dim"> Continuità e derivabilita</a>',
                'Derivata delle funzioni elementari',
                '<a class="dim">Derivata e operazioni</a>, composizione e funzione inversa',
                'Estremanti locali',
                '<a class="dim">Teoremi di Fermat, Cauchy, Rolle, Lagrange e loro conseguenze</a>',
                'Teoremi di de l\'Hopital',
                'Formula di Taylor con resto secondo Peano (per funzioni due volte derivabili) e secondo Lagrange',
                'Sviluppi delle funzioni elementari, <a class="dim">unicità dello sviluppo</a>',
                '<a class="dim">Concavità e convessità in un intervallo</a>',
                'Punti di flesso',
                '<a class="dim">Test per estremi relativi</a>'
            ],
            content: []
        },
        'numeri-complessi': {
            title: 'Numeri complessi',
            toc: [
                'Il campo complesso',
                'Forma algebrica dei numeri complessi',
                'Forma trigonometrica dei numeri complessi',
                '<a class="dim"> Radici nel campo complesso</a>'
            ],
            content: []
        },
        'esercizi': {
            title: 'Esercizi e temi d\'esame',
            toc: [
                'Esercizi',
                'Temi'
            ],
            content: []
        }
    };
    
    let isSinglePanel = false;

    // Helper function to safely parse and sanitize HTML
    function createDOMElement(htmlString) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
        return tempDiv;
    }

    // Helper function to render math expressions
    function renderMath(text) {
        // Regex to find both inline \(...\) and block-level $$...$$
        // This is more robust than assuming a specific format
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

    function renderChapter(chapterKey, showFullContent = false) {
        const data = chaptersData[chapterKey] || {};
        let contentHTML = '';

        if (!data.title) {
            contentDisplay.innerHTML = '<p class="placeholder-text">Contenuto non trovato.</p>';
            return;
        }

        contentHTML += `<h2 class="chapter-title">${data.title}</h2>`;

        // Render TOC, preserving any HTML tags like <strong> or <a>
        const tocListHTML = data.toc.map(item => `<li>${item}</li>`).join('');
        contentHTML += `<ul class="topic-list">${tocListHTML}</ul>`;

        if (showFullContent && data.content && data.content.length > 0) {
            contentHTML += `<div class="chapter-full-content">`;
            data.content.forEach(item => {
                // Apply a dynamic class based on the type
                const itemClass = `content-${item.type}${item.level ? `-${item.level}` : ''}`;
                
                switch (item.type) {
                    case 'paragraph':
                        // Render math within the paragraph text
                        contentHTML += `<p class="${itemClass}">${renderMath(item.text)}</p>`;
                        break;
                    case 'heading':
                        contentHTML += `<h${item.level} class="${itemClass}">${item.text}</h${item.level}>`;
                        break;
                    case 'math':
                        // Math is already handled by the renderMath function, but for block-level we can add a wrapper
                        contentHTML += `<div class="${itemClass}">${renderMath(`$$${item.text}$$`)}</div>`;
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
        contentDisplay.innerHTML = contentHTML;

        if (typeof MathJax !== 'undefined') {
            MathJax.typeset();
        }

        if (!isSinglePanel) {
            requestAnimationFrame(() => {
                contentDisplay.classList.add('animate-content');
            });
            removeAnimationClassSafely();
        }
    }

    chaptersList.addEventListener('mouseover', (event) => {
        const hoveredLi = event.target.closest('li');
        if (!hoveredLi || isSinglePanel) {
            return;
        }

        document.querySelector('#chapters-list .active')?.classList.remove('active');
        hoveredLi.classList.add('active');

        const chapterKey = hoveredLi.dataset.chapter;
        renderChapter(chapterKey, false);
    });

    chaptersList.addEventListener('click', (event) => {
        const clickedLi = event.target.closest('li');
        if (!clickedLi) {
            return;
        }
        const chapterKey = clickedLi.dataset.chapter;

        isSinglePanel = true;
        mainWrapper.classList.add('single-panel');
        renderChapter(chapterKey, true);
    });

    const rightPanel = document.querySelector('.right-panel');
    const backButton = document.createElement('button');
    backButton.textContent = '← Torna all\'indice';
    backButton.classList.add('back-button');
    rightPanel.prepend(backButton);

    backButton.addEventListener('click', () => {
        isSinglePanel = false;
        mainWrapper.classList.remove('single-panel');
        const activeChapter = chaptersList.querySelector('li.active');
        if(activeChapter) {
            renderChapter(activeChapter.dataset.chapter, false);
        }
    });

    const firstChapter = chaptersList.querySelector('li');
    if (firstChapter) {
        firstChapter.classList.add('active');
        renderChapter(firstChapter.dataset.chapter, false);
    }
})();
