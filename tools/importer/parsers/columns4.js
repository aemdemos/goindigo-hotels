/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example exactly
  const headerRow = ['Columns (columns4)'];

  // The search section is laid out in four main columns:
  // 1. Destination or Property Name
  // 2. Check-in Date
  // 3. Check-out Date
  // 4. No. of Guests & Rooms / Search button

  // We'll extract and reference the top-level column fields in order as they occur.
  // These are the direct children of .SearchWidget_search-widget-fields__wz80n
  const fieldsContainer = element.querySelector('.SearchWidget_search-widget-fields__wz80n');
  if (!fieldsContainer) {
    // Fallback: if structure changes, just replace with an empty columns block
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ['', '', '', '']
    ], document);
    element.replaceWith(table);
    return;
  }

  // Get all direct children divs (each is a column)
  const columnDivs = Array.from(fieldsContainer.querySelectorAll(':scope > div'));
  // There should be 4: [input field, calender, pax, search button]
  // Defensive: pad or trim to 4 columns
  while (columnDivs.length < 4) columnDivs.push(document.createElement('div'));
  if (columnDivs.length > 4) columnDivs.length = 4;

  // Build the table rows
  const cells = [
    headerRow,
    columnDivs
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
