#!/usr/bin/env python3
# Sestaví SESIT.md podle PORADI.txt. Každý zápis dostane na konec komentář se skupinou,
# stránka sešitu podle něj řadí a kreslí časovou osu.
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

groups = []          # (název, roky, [soubory])
current = None
for raw in open("PORADI.txt", encoding="utf-8"):
    line = raw.strip()
    if not line or line.startswith("#"):
        continue
    if line.startswith("@ "):
        name, _, years = line[2:].partition("|")
        current = (name.strip(), years.strip(), [])
        groups.append(current)
        continue
    if current is None:
        sys.exit("PORADI.txt: soubor před první skupinou: " + line)
    current[2].append(line)

seen, parts = set(), []
for name, years, files in groups:
    for f in files:
        if f in seen or not os.path.isfile(f):
            continue
        seen.add(f)
        body = open(f, encoding="utf-8").read().rstrip("\n")
        parts.append(f"{body}\n\n<!-- skupina: {name} | {years} -->")

rest = sorted(f for f in os.listdir(".")
              if f.endswith(".md") and not f.startswith("_") and f != "SESIT.md" and f not in seen)
for f in rest:
    body = open(f, encoding="utf-8").read().rstrip("\n")
    parts.append(f"{body}\n\n<!-- skupina: Ostatní | bez zařazení -->")

open("SESIT.md", "w", encoding="utf-8").write("\n\n---\n\n".join(parts) + "\n")
print(f"{len(parts)} zápisů, {len(groups)} skupin, navíc: {rest}")
