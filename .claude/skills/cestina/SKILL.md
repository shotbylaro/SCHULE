---
name: cestina
description: Vytvoří nebo doplní zápis z češtiny (autor, dílo, literární směr) podle šablony, aktualizuje sešit a pushne na GitHub pro NotebookLM. Použij, když uživatel napíše /cestina <téma> nebo chce doplnit poznámky z hodiny češtiny.
---

# Zápis z češtiny

Vstup: `$ARGUMENTS` = téma (např. `Shakespeare`), případně i poznámky z hodiny.

Vstup může být i **fotka sešitu** (vlastního nebo spolužáka):
- Přepiš z fotky všechno, co tam je, do sekce „Z hodiny“. Zkratky rozepiš, překlepy oprav, význam neměň.
- Je-li na fotce víc témat (např. dva autoři), udělej pro každé téma vlastní soubor.
- Co v poznámkách chybí (roky, díla, směr, základní info), dohledej na webu a doplň do ostatních sekcí.
- Když se poznámka liší od ověřeného zdroje, nech ji v „Z hodiny“ a za ni napiš `(pozn.: zdroje uvádějí …)`.

## Postup

1. Název souboru: `cestina/<tema-malymi-pismeny-bez-diakritiky-s-pomlckami>.md` (např. `cestina/william-shakespeare.md`).
2. **Soubor neexistuje:** zkopíruj strukturu z `cestina/_sablona.md` a vyplň všechny sekce česky.
   - Fakta (roky, názvy děl) ověř webovým vyhledáváním. Když si nejsi jistý, napiš `(ověřit)`.
   - Díla: jen ta nejdůležitější pro školu, max 6.
   - Kartičky: 8–12 otázek a odpovědí, jedna věc na kartičku.
   - Sekci „Z hodiny“ vyplň jen tím, co uživatel napsal. Nic si nevymýšlej.
3. **Soubor existuje:** nepřepisuj ho. Doplň poznámky uživatele do „Z hodiny“. Když učitelka řekla něco nového, přidej k tomu i kartičku.
4. Neměň pořadí ani názvy sekcí. Všechny zápisy musí mít stejnou strukturu.
5. Přegeneruj sešit (všechny zápisy v jednom souboru pro NotebookLM):
   ```bash
   cd cestina && { echo "# Sešit – Čeština"; for f in $(ls *.md | grep -v -e '^_' -e '^SESIT.md$'); do echo; echo '---'; echo; cat "$f"; done; } > SESIT.md
   ```
6. Commit a push:
   ```bash
   git add cestina && git commit -m "Čeština: <téma>" && git push
   ```
7. Uživateli napiš jen: co přibylo a připomínku obnovit zdroj v NotebookLM.
