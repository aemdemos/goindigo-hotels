/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const rows = [['Cards (cards6)']];

  // Find the carousel track with the items
  const carouselTrack = element.querySelector('ul.react-multi-carousel-track');
  if (carouselTrack) {
    const cards = carouselTrack.querySelectorAll('li');
    cards.forEach((card) => {
      // Get the image element (first img inside the card)
      const img = card.querySelector('img');
      // Get the title (city/destination)
      let titleText = '';
      const titleP = card.querySelector('div.Home_Top_monsoon_container_img_text__T72dQ p');
      if (titleP) {
        titleText = titleP.textContent.trim();
      }
      // Get the link (anchor wraps the card)
      const link = card.querySelector('a');
      let contentCell;
      if (titleText && link) {
        // Create a <strong> for the title
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        // Wrap strong in anchor with correct href
        const anchor = document.createElement('a');
        anchor.href = link.getAttribute('href');
        if (link.hasAttribute('target')) {
          anchor.setAttribute('target', link.getAttribute('target'));
        }
        anchor.appendChild(strong);
        contentCell = anchor;
      } else if (titleText) {
        // Only title, no link
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        contentCell = strong;
      } else {
        contentCell = '';
      }
      rows.push([
        img,
        contentCell
      ]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
