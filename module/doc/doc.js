const sectionTpl = (section) => `
  <section class="doc-section">
    <h3>${section.heading}</h3>
    <p>${section.content}</p>
    ${(section.blurbs || []).map(b => `
      <div class="doc-blurb">
        <strong>${b.label}</strong>
        <p>${b.text}</p>
      </div>
    `).join('')}
  </section>
`;

const tpl = (doc) => `
  <article class="post-open">
    <div class="post-open-body container py-4">
      <div class="post-open-heading">
        <p class="post-open-timestamp">${doc.created_at ? new Date(doc.created_at).toLocaleDateString() : doc.date || ''}</p>
        <h2 class="post-open-title">${doc.title}</h2>
        ${doc.author ? `<p class="post-open-author">By ${doc.author}</p>` : ''}
      </div>
      <div class="post-open-content">
        <div class="post-open-content-inner">
          ${Array.isArray(doc.sections) ? doc.sections.map(sectionTpl).join('') : (doc.content || '')}
        </div>
      </div>
    </div>
  </article>
`;

export default async function init({ root, props }) {
  const slug = props?.slug;
  if (!slug) {
    root.innerHTML = '<p class="text-center p-4">No document specified.</p>';
    return;
  }
  try {
    const doc = await fetch(`/data/doc/${slug}.json`).then(r => r.json());
    root.innerHTML = tpl(doc);
  } catch (err) {
    root.innerHTML = '<p class="text-center p-4">Document not found.</p>';
  }
}
