---
name: cestina
description: Vytvoří nebo doplní zápis z češtiny (autor, dílo, literární směr) podle šablony, zařadí ho do sešitu v pořadí, jak se to bralo, a pushne na GitHub (NotebookLM + web cestina.shotbylaro.eu). Použij, když uživatel napíše /cestina <téma>, pošle fotku sešitu nebo chce doplnit poznámky z hodiny češtiny.
---

# Zápis z češtiny

**Vstup:** `$ARGUMENTS` = téma (např. `Shakespeare`), případně poznámky z hodiny nebo fotka sešitu.

## 1. Soubor

`cestina/<tema-malymi-pismeny-bez-diakritiky-s-pomlckami>.md`, např. `cestina/william-shakespeare.md`.

- **Neexistuje:** vytvoř ho podle `cestina/_sablona.md`.
- **Existuje:** nepřepisuj ho. Jen doplň „Z hodiny“ a k nové informaci přidej kartičku.
- Víc témat najednou (např. dva autoři na fotce): každé téma má vlastní soubor.

## 2. Obsah

Piš česky. Sekce nikdy nepřejmenovávej a neměň jejich pořadí.

| Sekce | Pravidlo |
|---|---|
| Základní údaje | Fakta ověř na webu. Nejistý údaj označ `(ověřit)`. |
| Nejdůležitější díla | Max 6, jen ta pro školu. Ke každému 1–2 věty. |
| Overview | 5–8 vět: proč je to důležité, co to přineslo, souvislosti. |
| Zápis do sešitu | Krátké body, max 1 řádek. **Klíčové pojmy tučně.** |
| Hlavní motivy, Zajímavosti | 3–6 bodů. |
| Z hodiny | Jen to, co poslal uživatel. Nic si nevymýšlej. |
| Kartičky | 8–12 kusů, jedna věc na kartičku, formát `- **Otázka:** … **Odpověď:** …` |

**Fotka sešitu:** všechno z ní přepiš do „Z hodiny“. Zkratky rozepiš, překlepy oprav, význam neměň. Co chybí, dohledej na webu a dej to do ostatních sekcí. Když se poznámka liší od zdroje, nech ji a připiš `(pozn.: zdroje uvádějí …)`.

## 3. Pořadí v sešitu

`cestina/PORADI.txt` určuje pořadí zápisů v sešitu, tedy jak se látka brala v hodinách. Nový soubor připiš **na konec** `PORADI.txt`. Výjimka: když uživatel řekne, že téma patří jinam (např. „k romantismu“), vlož ho tam.

## 4. Sešit a push

```bash
cd cestina && { echo "# Sešit – Čeština"; for f in $( { grep -v '^#' PORADI.txt; ls *.md | grep -v -e '^_' -e '^SESIT.md$'; } | awk '!s[$0]++' ); do [ -f "$f" ] || continue; echo; echo '---'; echo; cat "$f"; done; } > SESIT.md
cd .. && git add cestina && git commit -m "Čeština: <téma>" && git push
```

Web https://cestina.shotbylaro.eu čte `SESIT.md` z GitHubu, takže se aktualizuje sám, zhruba do 5 minut.

## 5. Odpověď uživateli

Jen: co přibylo (soubor, kolik kartiček) a připomínka obnovit zdroj v NotebookLM.
