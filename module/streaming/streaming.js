const tpl = (user) => `
  <section class="streaming">
    <h1>${user.name} is Live</h1>
    <div class="streaming-player">
      <p>Streaming content for ${user.name}...</p>
    </div>
  </section>
`;

export default async function init({ root, props }) {
  const user = props?.user || { name: 'Unknown' };
  root.innerHTML = tpl(user);
  return {};
}
