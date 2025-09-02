const cache = new Map();

export async function getUserBySlug(slug) {
  if (!cache.has(slug)) {
    cache.set(slug, fetch(`/data/users/${slug}.json`).then(r => r.json()));
  }
  return cache.get(slug);
}
