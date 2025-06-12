/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing slides
  const track = element.querySelector('ul.react-multi-carousel-track');
  let backgroundImg = null;

  if (track) {
    // Prefer to find the 'active' carousel item
    const activeItem = track.querySelector('li.react-multi-carousel-item--active');
    let imgEl = null;
    if (activeItem) {
      imgEl = activeItem.querySelector('img');
    }
    // Fallback: if none active, just take the first image in the carousel
    if (!imgEl) {
      const firstImg = track.querySelector('img');
      if (firstImg) {
        imgEl = firstImg;
      }
    }
    if (imgEl) {
      // Always clone the image so the DOM structure is not disturbed
      backgroundImg = imgEl.cloneNode(true);
    }
  }

  // Per spec: 1 column, 3 rows: header ("Hero"), background image, content (empty)
  const tableRows = [
    ['Hero'],
    [backgroundImg ? backgroundImg : ''],
    [''],
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
