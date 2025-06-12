/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main SEO content card container
  const mainContainer = element.querySelector('.ig_Seo_homepage_content');
  if (!mainContainer) return;

  // Get all top-level children of the mainContainer
  const children = Array.from(mainContainer.children);

  // Find the index of the FAQ block if present
  const faqIdx = children.findIndex(
    c => c.classList && c.classList.contains('hotel_faq')
  );
  // Find the index of the seo_read_more block if present
  const readMoreIdx = children.findIndex(
    c => c.classList && c.classList.contains('seo_read_more')
  );

  // We'll look for all <h2> and group their content by everything until the next <h2>, FAQ, or 'Read More'
  const cards = [];
  let i = 0;
  while (i < children.length) {
    const child = children[i];
    // If this is FAQ block, treat as its own card, then break (FAQ is always at the bottom)
    if (child.classList && child.classList.contains('hotel_faq')) {
      cards.push([child]);
      i++;
      continue;
    }
    // If this is the read more block, do not include it and stop (should be at the end)
    if (child.classList && child.classList.contains('seo_read_more')) {
      break;
    }
    // Each card starts with <h2>
    if (child.tagName === 'H2') {
      const cardEls = [child];
      i++;
      // Collect all following siblings until next <h2>, FAQ, or seo_read_more
      while (
        i < children.length &&
        !(children[i].tagName === 'H2' || (children[i].classList && children[i].classList.contains('hotel_faq')) || (children[i].classList && children[i].classList.contains('seo_read_more')))
      ) {
        cardEls.push(children[i]);
        i++;
      }
      // Wrap in a div to preserve structure
      const cardDiv = document.createElement('div');
      cardEls.forEach(el => cardDiv.appendChild(el));
      cards.push([cardDiv]);
    } else {
      // If not <h2>, FAQ, or seo_read_more, just skip
      i++;
    }
  }
  // Header row from block spec
  const headerRow = ['Cards (cardsNoImages8)'];
  const cells = [headerRow, ...cards];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
