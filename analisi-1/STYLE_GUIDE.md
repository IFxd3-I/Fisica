# Style Guide - Analisi 1

## 🎨 Convenzioni di evidenziazione

### Classi CSS disponibili:

| Classe | Colore | Uso | Esempio HTML |
|--------|--------|-----|--------------|
| `<mark>` o `.definition` | 🟢 Verde (#69F0AE) | Definizioni fondamentali | `<mark>Numeri naturali</mark>` |
| `.theorem` | 🔵 Azzurro (#88CCEE) | Teoremi e risultati importanti | `<span class="theorem">Teorema di Weierstrass</span>` |
| `.warning` | 🟡 Giallo (#FFC107) | Warning/Attenzione | `<span class="warning">Attenzione: divisione per zero!</span>` |
| `<em>` | 🟡 Giallo (#ffcc00) | Osservazioni e note | `<em>nota importante</em>` |
| `<strong>` | 🔵 Azzurro (#88CCEE) | Enfasi generica | `<strong>proprietà</strong>` |

### Tipi di contenuto supportati:

| Type JSON | Descrizione | Esempio |
|-----------|-------------|---------|
| `paragraph` | Paragrafi di testo | Testo normale con LaTeX inline |
| `heading` | Titoli (livelli 1-6) | `{"type": "heading", "level": 3, "text": "..."}` |
| `math` | Formule matematiche in display | `{"type": "math", "text": "\\sum_{i=1}^n x_i"}` |
| `example` | Esempi espandibili con click | `{"type": "example", "text": "Per A=(0,1)..."}` |
| `list` | Liste puntate | `{"type": "list", "items": ["item1", "item2"]}` |
| `divider` | Separatori orizzontali | `{"type": "divider"}` |
| `table` | Tabelle con headers e rows | Con supporto LaTeX nelle celle |

### Sistema esempi interattivi:

Gli esempi appaiono come `💡 Esempio` cliccabile:
- **Click espande**: Mostra il contenuto con animazione fluida
- **Secondo click**: Nasconde l'esempio  
- **Design elegante**: Sfondo verde trasparente, bordo laterale
- **MathJax**: Supporto automatico per formule negli esempi

```json
{
  "type": "example",
  "text": "Per \\(A = (0, 1)\\), abbiamo \\(\\sup A = 1\\)."
}
```

### Formule matematiche:
- `\( formula \)` = inline math
- `$$ formula $$` = display math in paragrafi  
- `type: "math"` = display math dedicato (più grande, centrato)
- `.formula-highlight` = formule particolarmente importanti con sfondo

## 🔧 Come modificare i colori

Per cambiare i colori, modifica il file `css/style.css` nella sezione "STYLE GUIDE PER ANALISI 1".

### Variabili CSS principali:
```css
--accent-color: #69F0AE;    /* Verde principale */
--text-color: #e0e0e0;      /* Testo normale */
```

### Colori fissi modificabili:
- Azzurro teoremi: `#88CCEE`
- Giallo warning: `#FFC107`
- Giallo note: `#ffcc00`

### Dimensioni font aumentate:
- Paragrafi: `1.1em`
- Formule display: `1.3em`
- Formule inline: `1.1em`
- Titoli: Scala proporzionale (h3: 1.4em, h4: 1.2em, h5: 1.1em)

## 📝 Esempio completo JSON:

```json
{
  "type": "paragraph",
  "text": "<mark>Definizione</mark>: I <span class=\"theorem\">numeri reali</span> sono... <span class=\"warning\">Attenzione</span>: non confondere con..."
}
```

## 🎯 Best practices:

1. **Leggibilità**: Usa paragrafi vuoti per dare respiro visivo
2. **Gerarchia**: h3 per sezioni principali, h4 per sottosezioni  
3. **Esempi**: Sempre in `type: "example"` per interattività
4. **Formule**: `type: "math"` per formule importanti, `\( \)` per inline
5. **Colori**: Verde per definizioni, azzurro per teoremi, giallo per warning
