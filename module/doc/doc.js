export default async function init({ root, props }) {
  const slug = props.slug;
  if (!slug) {
    root.innerHTML = '<p class="text-danger">Document slug missing.</p>';
    return;
  }

  let data;
  try {
    const res = await fetch(`/data/doc/${slug}.json`);
    if (!res.ok) throw new Error('not found');
    data = await res.json();
  } catch (err) {
    root.innerHTML = '<p class="text-danger">Unable to load document.</p>';
    return;
  }

  const doc = data.document;
  if (!doc) {
    root.innerHTML = '<p class="text-danger">Invalid document format.</p>';
    return;
  }

  root.innerHTML = renderDoc(doc);
}

function renderDoc(doc) {
  return `
    <article class="post-open">
      <div class="post-open-body">
        <div class="post-open-heading">
          <p class="post-open-timestamp">${formatDate(doc.created_at)}</p>
          <h2 class="post-open-title">${doc.title}</h2>
          <p class="post-open-paragraph">${doc.author}</p>
        </div>
        <div class="post-open-content">
          <div class="post-open-content-body">
            ${doc.sections.map(renderSection).join('')}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderSection(section) {
  return `
    <section class="doc-section">
      <h3>${section.heading}</h3>
      <p class="post-open-paragraph">${section.content}</p>
      ${(section.blurbs || []).map(renderBlurb).join('')}
    </section>
  `;
}

function renderBlurb(blurb) {
  return `
    <div class="doc-blurb">
      <span class="doc-blurb-label">${blurb.label}</span>
      <p class="post-open-paragraph">${blurb.text}</p>
    </div>
  `;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return '';
  }
}
