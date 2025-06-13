/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the cards
  const track = element.querySelector('ul.react-multi-carousel-track');
  if (!track) return;

  // Get all card items (li elements)
  const cards = Array.from(track.querySelectorAll('li'));

  // Start the table with the block header
  const rows = [['Cards (cards2)']];

  cards.forEach(card => {
    // Each card has an <a> for the whole card
    const link = card.querySelector('a');
    if (!link) return;
    // Image for the card
    const img = link.querySelector('img');
    // Text container for title/desc
    const textDiv = link.querySelector('div.Home_popular_amongst_traveller_container_img_text__04dnh');
    let title = '', desc = '';
    if (textDiv) {
      const p = textDiv.querySelector('p');
      const span = textDiv.querySelector('span');
      if (p) title = p.textContent;
      if (span) desc = span.textContent;
    }
    // Build text cell: <strong>Title</strong><br>Description
    const frag = document.createDocumentFragment();
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      frag.appendChild(strong);
    }
    if (desc) {
      if (title) frag.appendChild(document.createElement('br'));
      frag.appendChild(document.createTextNode(desc));
    }
    // Optionally wrap text in a link if card was a link
    const linkHref = link.getAttribute('href');
    let textCell;
    if (linkHref) {
      const a = document.createElement('a');
      a.href = linkHref;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.appendChild(frag);
      textCell = a;
    } else {
      textCell = frag;
    }
    // Add the row: [image, text cell]
    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
  return table;
}
