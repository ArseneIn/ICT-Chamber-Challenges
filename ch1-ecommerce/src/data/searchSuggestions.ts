// src/data/searchSuggestions.ts

export interface SearchSuggestion {
  prefix: string;
  suffix: string;
  fullText: string;
  category?: string;
}

const PRESET_DICTIONARY: Record<string, string[]> = {
  shoe: [
    'men',
    'stock',
    'women',
    'for women new styles',
    'for men',
    'men original',
    'men sneaker',
    'rack',
    'women heels',
  ],
  shoes: [
    'men',
    'stock',
    'women',
    'for women new styles',
    'for men',
    'men original',
    'men sneaker',
    'rack',
    'women heels',
  ],
  laptop: [
    'stand',
    'bag & backpack',
    'gaming',
    'ultra thin',
    'core i7',
    'accessories',
    'charger & adapter',
    'sleeve case',
  ],
  laptops: [
    'stand',
    'bag & backpack',
    'gaming',
    'ultra thin',
    'core i7',
    'accessories',
    'charger & adapter',
    'sleeve case',
  ],
  phone: [
    '5g android',
    'cases & covers',
    'screen protector',
    'holder for car',
    'fast charger',
    'accessories',
  ],
  smartphone: [
    '5g android',
    'cases & covers',
    'screen protector',
    'holder for car',
    'fast charger',
    'accessories',
  ],
  beauty: [
    'care products',
    'eyeshadow palette',
    'mascara lash',
    'skin serum',
    'lipstick matte',
    'face powder',
    'tools & brushes',
  ],
  cosmetic: [
    'red lipstick',
    'powder canister',
    'foundation cream',
    'eyeshadow set',
  ],
  shirt: [
    'for men',
    'casual cotton',
    'formal white',
    'slim fit',
    'long sleeve',
  ],
  shirts: [
    'for men',
    'casual cotton',
    'formal white',
    'slim fit',
    'long sleeve',
  ],
  watch: [
    'men luxury',
    'women gold',
    'smartwatch 4g',
    'waterproof sports',
    'leather strap',
  ],
  watches: [
    'men luxury',
    'women gold',
    'smartwatch 4g',
    'waterproof sports',
    'leather strap',
  ],
  bag: [
    'women handbag',
    'men backpack',
    'travel duffel',
    'laptop bag',
    'leather tote',
  ],
  fragrance: [
    'perfume eau de parfum',
    'cologne for men',
    'body spray',
    'luxury scent',
  ],
};

const GENERIC_SUFFIXES = [
  'for men',
  'for women',
  'accessories',
  'original stock',
  'wholesale bulk',
  'new styles',
  'trending 2026',
  'top rated',
];

export function getSearchSuggestions(input: string): SearchSuggestion[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];

  const results: SearchSuggestion[] = [];
  const seen = new Set<string>();

  // 1. Check exact or prefix dictionary matches
  for (const [key, suffixes] of Object.entries(PRESET_DICTIONARY)) {
    if (key.startsWith(trimmed) || trimmed.startsWith(key)) {
      for (const suffix of suffixes) {
        const fullText = `${input.trim()} ${suffix}`;
        if (!seen.has(fullText.toLowerCase())) {
          seen.add(fullText.toLowerCase());
          results.push({
            prefix: input.trim(),
            suffix: suffix,
            fullText,
          });
        }
      }
    }
  }

  // 2. Dynamic generation if dictionary didn't yield enough suggestions
  if (results.length < 5) {
    for (const suffix of GENERIC_SUFFIXES) {
      const fullText = `${input.trim()} ${suffix}`;
      if (!seen.has(fullText.toLowerCase())) {
        seen.add(fullText.toLowerCase());
        results.push({
          prefix: input.trim(),
          suffix: suffix,
          fullText,
        });
      }
    }
  }

  return results.slice(0, 9);
}
