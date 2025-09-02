import { getUserBySlug } from '../users.js';

const SLUGS = [
  'john-viking',
  'marina-valentine',
  'neko-bebop',
  'nick-grissom',
  'sarah-diamond'
];

export default async function init({ hub }) {
  async function search(term) {
    const q = term?.trim().toLowerCase();
    if (!q) return [];
    try {
      const users = (await Promise.all(SLUGS.map(getUserBySlug))).filter(Boolean);
      return users
        .filter(u => u.name.toLowerCase().includes(q) || u.slug.includes(q))
        .map(u => ({ ...u, friendCount: 0 }));
    } catch {
      return [];
    }
  }
  return { search };
}
