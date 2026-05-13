# Guide de rédaction — Blog Jeff Belekotan

Ce guide explique comment écrire et formater tes articles MDX dans `blog-jeff/src/content/blog/`.

---

## 1. Créer un article

Crée un fichier `.mdx` dans `src/content/blog/` :

```
src/content/blog/mon-titre-en-kebab-case.mdx
```

> Le nom du fichier devient l'URL : `mon-titre-en-kebab-case` → `/blog/mon-titre-en-kebab-case`

---

## 2. Frontmatter (métadonnées)

Chaque article commence par un bloc `---` avec ces champs :

```yaml
---
title: "Mon titre d'article"           # obligatoire
description: "Résumé en une phrase."   # obligatoire — affiché dans les cartes
pubDate: 2026-05-20                    # obligatoire — format YYYY-MM-DD
tags: ["astro", "web", "performance"]  # obligatoire — tableau de strings
readingTime: 5                         # optionnel — temps de lecture en minutes
featured: true                         # optionnel — met l'article en avant sur la home
cover: "/images/mon-image.jpg"         # optionnel — image de couverture
---
```

### Règles
- `title` : court, percutant, sans point final
- `description` : 1-2 phrases, visible dans Google et dans les cartes
- `pubDate` : toujours au format `YYYY-MM-DD`
- `tags` : entre 2 et 4 tags, en minuscules, sans espaces (utilise `-` si besoin)
- `featured: true` : un seul article à la fois sur la home

---

## 3. Titres

```markdown
# Titre H1  ← NE PAS UTILISER (réservé au titre de la page)

## Titre H2  ← Section principale (apparaît dans le sommaire)

### Titre H3  ← Sous-section (apparaît dans le sommaire, indenté)

#### Titre H4  ← Rarement utilisé, pas dans le sommaire
```

> **Conseil** : commence ton article avec du texte, pas un H2. Donne du contexte avant ta première section.

---

## 4. Paragraphes et texte

```markdown
Paragraphe normal. Ligne vide = nouveau paragraphe.

**Texte en gras** pour les termes importants.

*Texte en italique* pour les emphases légères.

`code inline` pour les noms de fichiers, variables, commandes courtes.
```

---

## 5. Liens

```markdown
[Texte du lien](https://example.com)

[Lien interne vers un article](/blog/mon-article)

[Lien avec titre](https://example.com "Titre au survol")
```

---

## 6. Blocs de code

Utilise des triple backticks avec le nom du langage pour la coloration syntaxique :

````markdown
```js
const greeting = 'Hello, world!';
console.log(greeting);
```

```ts
interface User {
  name: string;
  age: number;
}
```

```css
.article-body {
  line-height: 1.8;
}
```

```bash
npm run dev
npm run build
```

```json
{
  "name": "blog-jeff",
  "version": "0.0.1"
}
```
````

### Langages disponibles
`js` · `ts` · `jsx` · `tsx` · `css` · `html` · `astro` · `bash` · `json` · `yaml` · `md` · `python` · `go` · `rust`

---

## 7. Listes

```markdown
Liste non-ordonnée :
- Premier élément
- Deuxième élément
  - Sous-élément indenté
- Troisième élément

Liste ordonnée :
1. Étape un
2. Étape deux
3. Étape trois
```

---

## 8. Citation (blockquote)

```markdown
> Ceci est une citation ou une note importante.
> Elle peut s'étendre sur plusieurs lignes.

> **Note :** Pour attirer l'attention sur un point clé.
```

---

## 9. Séparateur horizontal

```markdown
---
```

Utilise-le pour séparer des grandes sections thématiques distinctes.

---

## 10. Images

Place tes images dans `public/images/` puis référence-les :

```markdown
![Texte alternatif](/images/mon-image.png)

![Diagramme de l'architecture islands](/images/islands-architecture.png)
```

> **Important :** toujours remplir le texte alternatif pour l'accessibilité.

Pour utiliser une image comme cover, ajoute son chemin dans le frontmatter :
```yaml
cover: "/images/mon-image.png"
```

---

## 11. Tableaux

```markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Valeur A  | Valeur B  | Valeur C  |
| Valeur D  | Valeur E  | Valeur F  |
```

---

## 12. Composants React dans MDX

Tu peux importer et utiliser des composants React directement :

```mdx
import MonComposant from '../../components/MonComposant.jsx';

## Section avec composant

<MonComposant prop="valeur" />
```

---

## 13. Template complet

Copie-colle ce template pour démarrer rapidement :

```mdx
---
title: "Titre de mon article"
description: "Une phrase qui résume l'article et donne envie de le lire."
pubDate: 2026-06-01
tags: ["tag1", "tag2"]
readingTime: 5
featured: false
---

Paragraphe d'introduction : contexte, problème, pourquoi ça compte.
Pas de titre H2 tout de suite — donne d'abord envie de lire la suite.

## Première section

Contenu de la section...

### Sous-section si nécessaire

Détails...

## Deuxième section

Contenu...

## Conclusion

Ce que le lecteur doit retenir, prochaine étape ou call-to-action.
```

---

## 14. Checklist avant publication

- [ ] `title` : clair et percutant
- [ ] `description` : une phrase complète et informative
- [ ] `pubDate` : date correcte au format `YYYY-MM-DD`
- [ ] `tags` : 2-4 tags pertinents
- [ ] `readingTime` : estimation honnête (250 mots ≈ 1 min)
- [ ] L'article commence par du texte, pas un titre H2
- [ ] Les blocs de code ont un langage spécifié
- [ ] Les images ont un texte alternatif
- [ ] Relecture finale : fautes, liens cassés, code qui tourne
