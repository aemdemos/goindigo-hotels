/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: exactly as in the example
  const headerRow = ['Cards (cards3)'];

  // Find the main carousel track containing the cards
  const ul = element.querySelector('ul.react-multi-carousel-track');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.nodeType === 1);

  // Build the data rows for each card: [img, strong-title]
  const rows = lis.map(li => {
    // Image: use the same img element reference
    const img = li.querySelector('img');
    // Title: get the <p> inside the overlay and wrap in <strong>
    let textCell = '';
    const titleDiv = li.querySelector('div.Home_Top_monsoon_container_img_text__T72dQ');
    if (titleDiv) {
      const p = titleDiv.querySelector('p');
      if (p && p.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = p.textContent.trim();
        textCell = strong;
      }
    }
    return [img, textCell];
  });

  // Only output a table if there is at least one card
  if (rows.length === 0) return;

  // Assemble cells and create table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original block element with the new table
  element.replaceWith(table);
}
