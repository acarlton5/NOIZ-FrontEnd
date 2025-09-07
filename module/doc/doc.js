const sectionTpl = (section, i) => `
  <section id="section-${i}" class="doc-section">
    <h3>${section.heading}</h3>
    <p class="post-open-paragraph">${section.content}</p>
    ${(section.blurbs || []).map(b => `
      <div class="doc-blurb">
        <strong>${b.label}</strong>
        <p class="post-open-paragraph">${b.text}</p>
      </div>
    `).join('')}
  </section>
`;

const navTpl = (doc) => `
  <nav class="doc-nav">
    <div class="doc-nav-header">
      <span>${doc.sections.length} Chapters</span>
      <span>${doc.sections.length} Total</span>
    </div>
    <ol class="doc-nav-list">
      ${doc.sections.map((s, i) => `<li><a href="#section-${i}">${s.heading}</a></li>`).join('')}
    </ol>
  </nav>
`;

const tpl = (doc) => `
  <div class="container doc-container">
    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <article class="post-open doc-module">
          <figure class="post-open-cover" style="${doc.cover ? `background-image: url('${doc.cover}')` : ''}">
            ${doc.cover ? `<img src="${doc.cover}" alt="${doc.title || ''} cover" style="display:none;">` : ''}
          </figure>
          <div class="post-open-body">
            <div class="post-open-heading">
              <p class="post-open-timestamp">${doc.created_at ? new Date(doc.created_at).toLocaleDateString() : doc.date || ''}</p>
              <h2 class="post-open-title">${doc.title}</h2>
              ${doc.author ? `<p class="post-open-author">By ${doc.author}</p>` : ''}
            </div>
            <div class="post-open-content">
              <div class="post-open-content-sidebar">
                <p class="post-open-sidebar-title">Share!</p>
                <div class="social-links vertical">
                  <a class="social-link void facebook" href="#">
                    <svg class="icon-facebook"><use xlink:href="#svg-facebook"></use></svg>
                  </a>
                  <a class="social-link void twitter" href="#">
                    <svg class="icon-twitter"><use xlink:href="#svg-twitter"></use></svg>
                  </a>
                </div>
              </div>
              <div class="post-open-content-body">
                ${Array.isArray(doc.sections)
                  ? doc.sections.map(sectionTpl).join('')
                  : (doc.content ? `<p class="post-open-paragraph">${doc.content}</p>` : '')}
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="col-12 col-lg-4">
        ${Array.isArray(doc.sections) ? navTpl(doc) : ''}
      </div>
    </div>
  </div>
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
    const navLinks = root.querySelectorAll('.doc-nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  } catch (err) {
    root.innerHTML = '<p class="text-center p-4">Document not found.</p>';
  }
}
