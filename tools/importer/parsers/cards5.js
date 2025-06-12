/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list of cards
  const carousel = element.querySelector('ul.react-multi-carousel-track');
  if (!carousel) return;
  const cards = Array.from(carousel.children);

  const headerRow = ['Cards (cards5)'];
  const rows = cards.map((li) => {
    // Card anchor
    const link = li.querySelector('a');
    if (!link) return null;

    // Image
    const img = link.querySelector('img');

    // Text content
    const textDiv = link.querySelector('div > div');
    let contentNodes = [];
    if (textDiv) {
      // Title in <p>
      const titleEl = textDiv.querySelector('p');
      if (titleEl) {
        // Use <strong> to match "heading" in card
        const strong = document.createElement('strong');
        strong.textContent = titleEl.textContent.trim();
        contentNodes.push(strong);
      }
      // Description in <span>
      const descEl = textDiv.querySelector('span');
      if (descEl) {
        if (contentNodes.length) contentNodes.push(document.createElement('br'));
        contentNodes.push(descEl);
      }
    }
    return [img, contentNodes];
  }).filter(Boolean);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
