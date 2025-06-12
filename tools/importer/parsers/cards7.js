/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, matches the example exactly
  const headerRow = ['Cards (cards7)'];

  // Find carousel <ul> containing the cards
  const track = element.querySelector('ul.react-multi-carousel-track');
  const cards = track ? Array.from(track.children) : [];

  // Build the rows for each card
  const rows = cards.map((li) => {
    // Get the image element (reference directly)
    const img = li.querySelector('img');

    // Get the title (from .Home_from-our-blogs-heading__OIPFD)
    const titleDiv = li.querySelector('.Home_from-our-blogs-heading__OIPFD');
    let textCellContent = [];
    if (titleDiv && titleDiv.textContent.trim()) {
      // Use a <strong> for the title, as seen in the example (heading style)
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textCellContent.push(strong);
    }
    // No additional description or CTA in this source HTML
    return [img, textCellContent];
  });

  // Compose final table data
  const tableData = [headerRow, ...rows];

  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
