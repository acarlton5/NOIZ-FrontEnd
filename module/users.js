let cache;

export async function getUsers() {
  if (!cache) {
    cache = fetch('/data/users.json').then(r => r.json());
  }
  return cache;
}

export async function getUserBySlug(slug) {
  const users = await getUsers();
  return users.find(u => u.slug === slug);
}
