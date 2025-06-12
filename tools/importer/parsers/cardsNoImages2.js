/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the block name
  const headerRow = ['Cards (cardsNoImages2)'];
  const rows = [headerRow];

  // Get all direct child elements
  const children = Array.from(element.children);

  // Optionally skip a section heading if present
  let startIdx = 0;
  if (
    children[0] &&
    children[0].classList.contains('headerv2__menu__column__section-heading')
  ) {
    startIdx = 1;
  }

  // Now process all section items (cards)
  for (let i = startIdx; i < children.length; i++) {
    const child = children[i];
    // If this child is a link (a), the card is the a element itself
    if (
      child.tagName === 'A' &&
      child.firstElementChild &&
      child.firstElementChild.classList.contains('headerv2__menu__column__section-item')
    ) {
      rows.push([child]);
    } else if (child.classList.contains('headerv2__menu__column__section-item')) {
      // It's a direct div card (not wrapped in a link)
      rows.push([child]);
    }
    // Any other elements are omitted (semantic intent: only menu cards)
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
