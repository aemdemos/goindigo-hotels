/* global WebImporter */
export default function parse(element, { document }) {
  // The Columns (columns6) block expects at least two columns in the content row.
  // We'll put the logo in the first column and an empty string in the second column to maintain structure.

  // Header row exactly as in the example
  const headerRow = ['Columns (columns6)'];

  // Try to get the actual logo link content
  const logoLink = element.querySelector('a') || element;

  // Per the example, maintain at least a two-column structure
  const contentRow = [logoLink, ''];

  const cells = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
