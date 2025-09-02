import { getUserBySlug } from '../users.js';

export default async function init({ hub }) {
  async function search(term) {
    const slug = term?.trim().toLowerCase();
    if (!slug) return [];
    try {
      const user = await getUserBySlug(slug);
      return user ? [user] : [];
    } catch {
      return [];
    }
  }
  return { search };
}
