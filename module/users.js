export const users = [
  {
    name: 'Marina Valentine',
    avatar: 'https://odindesignthemes.com/vikinger/img/avatar/01.jpg',
    frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/aim_for_love.png',
    hasNotification: true,
    accent: '#ff72b6',
    slug: 'marina-valentine'
  },
  {
    name: 'Neko Bebop',
    avatar: 'https://odindesignthemes.com/vikinger/img/avatar/02.jpg',
    frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/aurora.png',
    accent: '#8ab4ff',
    slug: 'neko-bebop'
  },
  {
    name: 'Nick Grissom',
    avatar: 'https://odindesignthemes.com/vikinger/img/avatar/03.jpg',
    frame: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@main/public/decorations/bf_soldier_helmet.png',
    accent: '#ffd059',
    slug: 'nick-grissom'
  }
];

export function getUserBySlug(slug) {
  return users.find(u => u.slug === slug);
}
