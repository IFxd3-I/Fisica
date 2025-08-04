(() => {
    const chaptersList = document.getElementById('chapters-list');
    const contentDisplay = document.getElementById('content-display');
    const mainWrapper = document.querySelector('.main-wrapper');

    const chaptersData = {
        'il-campo-reale': {
            title: 'Il Campo Reale',
            topics: [
                'Insiemi numerici noti <strong>N</strong>, <strong>Z</strong>, <strong>Q</strong>',
                'Rappresentazione decimale dei razionali',
                'Numeri reali <strong>R</strong>: definizione, estremo superiore/inferiore',
                'Densità di <strong>Q</strong> in <strong>R</strong>, la completezza di <strong>R</strong>',
                'Richiami sul concetto di funzione tra insieme',
                'Insiemi equipotenti: <a class="dim">insiemi numerabili</a>, <a class="dim">non numerabilità di <strong>R</strong></a>'
            ]
        },
        'teoria-degli-spazi-metrici': {
            title: 'Teoria degli spazi metrici',
            topics: [
                'Spazi metrici: definizione, primi esempi inclusi spazi euclidei',
                '<a class="dim">Intorni e classificazione dei punti</a>',
                '<a class="dim">Insiemi aperti, chiusi, limitati e compatti: loro proprieta</a>',
                '<a class="dim">Successioni a valori in spazi metrici: successioni convergenti e unicità del limite</a>',
                '<a class="dim">Condizioni necessarie per la convergenza: limitatezza, sottosuccessioni e la condizione di Cauchy</a>',
                'Spazi metrici completi'
            ]
        },
        'successioni-in-spazi-euclidei': {
            title: 'Successioni in spazi euclidei',
            topics: [
                '<a class="dim">Teorema di Heine-Borel</a>',
                '<a class="dim">Teorema di Bolzano-Weierstrass</a>',
                'La completezza di <strong>\(R^k\)</strong>',
                'Successioni a valori reali: operazioni, <a class="dim">confronto</a> e <a class="dim">confronto asintotico</a>',
                '<a class="dim">Monotonia e limiti</a>',
                '<a class="dim">Il numero \(e\) di Nepero e i limiti notevoli</a>',
                'Simboli di asintotico e o-piccolo'
            ]
        },
        'serie-numeriche': {
            title: 'Serie numeriche',
            topics: [
                'Definizioni ed esempi di carattere di una serie',
                '<a class="dim">Condizione di Cauchy e quella necessaria per la convergenza</a>',
                '<a class="dim">Convergenza assoluta</a>',
                '<a class="dim">Serie a termini non negativi e criteri per la convergenza: del confronto, del confronto asintotico, del rapporto e della radice</a>',
                '<a class="dim">Serie a termini di segno alterno: criterio di Leibniz (eventualmente via il criterio di Abel)</a>'
            ]
        },
        'limiti-di-funzioni': {
            title: 'Limiti di funzioni',
            topics: [
                '<a class="dim">Definizione metrica e successionale: equivalenza</a>',
                'Limiti delle funzioni elementari e di quelle monotone',
                'Asintoti al grafico di una funzione'
            ]
        },
        'continuita': {
            title: 'Continuità',
            topics: [
                'Continuità puntuale e globale in spazi metrici',
                '<a class="dim">Controimmagini di aperti e continuità</a>',
                'Continuità e composizione',
                '<a class="dim">Teorema di Weierstrass</a>',
                'Continuità uniforme, teorema di Heine-Cantor',
                '<a class="dim">Funzioni reali e continue: teorema degli zeri, dei valori intermedi e conseguenze</a>',
                'Funzioni monotone e discontinuità. Continuità dell\'inversa'
            ]
        },
        'calcolo-differenziale': {
            title: 'Calcolo differenziale',
            topics: [
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
            ]
        },
        'numeri-complessi': {
            title: 'Numeri complessi',
            topics: [
                'Il campo complesso',
                'Forma algebrica dei numeri complessi',
                'Forma trigonometrica dei numeri complessi',
                '<a class="dim"> Radici nel campo complesso</a>'
            ]
        },
        'esercizi': {
            title: 'Esercizi e temi d\'esame',
            topics: [
                'Esercizi',
                'Temi'
            ]
        }
    };

    function renderChapter(chapterKey) {

        const { title, topics } = chaptersData[chapterKey] || {};

        if (!title || !topics) {
            contentDisplay.innerHTML = '<p class="placeholder-text">Contenuto non trovato.</p>';
            return;
        }

        const topicListHTML = topics.map(topic => `<li>${topic}</li>`).join('');

        contentDisplay.innerHTML = `
            <h2 class="chapter-title">${title}</h2>
            <ul class="topic-list">${topicListHTML}</ul>
        `;
    }

    chaptersList.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('li');
        if (!clickedItem || clickedItem.classList.contains('active')) {
            return;
        }

        document.querySelector('#chapters-list .active')?.classList.remove('active');
        clickedItem.classList.add('active');

        const chapterKey = clickedItem.dataset.chapter;
        renderChapter(chapterKey);

        mainWrapper.classList.add('single-panel');
    });

    const rightPanel = document.querySelector('.right-panel');
    const backButton = document.createElement('button');
    backButton.textContent = '← Torna all\'indice';
    backButton.classList.add('back-button');
    rightPanel.prepend(backButton);

    backButton.addEventListener('click', () => {
        mainWrapper.classList.remove('single-panel');
    });

    const firstChapter = chaptersList.querySelector('li');
    if (firstChapter) {
        firstChapter.classList.add('active');
        renderChapter(firstChapter.dataset.chapter);
    }
})();