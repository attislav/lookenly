// Automatische Internal Link Injection
// Beispiel: Keywords → Post Links

interface LinkMapping {
  keyword: string;
  postSlug: string;
  postTitle: string;
}

// Definiere deine Link-Mappings
const linkMappings: LinkMapping[] = [
  {
    keyword: 'summer fashion',
    postSlug: 'summer-fashion-trends-2025',
    postTitle: 'Summer Fashion Trends 2025',
  },
  {
    keyword: 'makeup tips',
    postSlug: 'best-makeup-tips-beginners',
    postTitle: 'Best Makeup Tips for Beginners',
  },
  {
    keyword: 'sustainable fashion',
    postSlug: 'sustainable-fashion-guide',
    postTitle: 'Sustainable Fashion Guide',
  },
  // Mehr Keywords hinzufügen...
];

export function injectInternalLinks(content: string): string {
  let processedContent = content;
  const linkedKeywords = new Set<string>(); // Verhindert doppelte Links

  // Sortiere nach Länge (längste Keywords zuerst, damit "summer fashion trends" vor "summer" matched)
  const sortedMappings = [...linkMappings].sort(
    (a, b) => b.keyword.length - a.keyword.length
  );

  sortedMappings.forEach((mapping) => {
    // Skip wenn Keyword schon verlinkt wurde
    if (linkedKeywords.has(mapping.keyword)) return;

    // Erstelle Regex (case-insensitive, nur komplette Wörter)
    const regex = new RegExp(`\\b(${mapping.keyword})\\b`, 'gi');

    // Prüfe ob Keyword im Content existiert UND noch nicht verlinkt ist
    const matches = processedContent.match(regex);
    if (!matches) return;

    // Nur ERSTE Erwähnung verlinken (best practice für SEO)
    let firstMatch = true;
    processedContent = processedContent.replace(regex, (match) => {
      if (!firstMatch) return match; // Weitere Erwähnungen nicht verlinken
      firstMatch = false;
      linkedKeywords.add(mapping.keyword.toLowerCase());

      return `<a href="/post/${mapping.postSlug}" class="internal-link" title="${mapping.postTitle}">${match}</a>`;
    });
  });

  return processedContent;
}

// Automatisch aus Posts generieren (Alternative)
export async function generateLinkMappings(posts: any[]): Promise<LinkMapping[]> {
  return posts.map((post) => ({
    keyword: post.title.toLowerCase(),
    postSlug: post.slug,
    postTitle: post.title,
  }));
}
