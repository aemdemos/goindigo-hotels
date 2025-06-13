/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row, exactly as required
  const headerRow = ['Cards (cards4)'];

  // Find the carousel track containing the cards
  const track = element.querySelector('ul.react-multi-carousel-track');
  if (!track) return;

  // For each card, extract the image and the title as per block spec
  const cards = Array.from(track.querySelectorAll('li'));
  const rows = cards.map(li => {
    // Each li contains an <a> with the card
    const a = li.querySelector('a');
    let img = a && a.querySelector('img');
    // Title div
    let titleDiv = a && a.querySelector('.Home_from-our-blogs-heading__OIPFD');
    // Compose title as <strong>
    let titleEl = null;
    if (titleDiv && titleDiv.textContent.trim()) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleDiv.textContent.trim();
    }
    // Compose text cell: only the title (no description in this source)
    const textCell = titleEl ? [titleEl] : [];
    // Return [image, text cell] for this card
    return [img, textCell];
  });

  // Compose table structure
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
